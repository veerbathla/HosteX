import {
  BellDot,
  Camera,
  Download,
  LogIn,
  QrCode,
  ShieldAlert,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import {
  getEntryLogs,
  markEntryExit,
} from "../../../services/api/studentService";
import { getErrorMessage } from "../../../services/api/normalizers";
import {
  GateCard,
  GatekeeperPage,
  PageHeader,
  StatusBadge,
} from "../components/GatekeeperUI";

const seedTransit = [
  { id: 1, name: "Arjun Sharma", course: "B.Tech CSE", room: "Block A - 402", studentId: "EC-2024-089", entryTime: "08:45 AM", exitTime: "--:--", status: "inside", flagged: false },
  { id: 2, name: "Priya Verma", course: "MBA Marketing", room: "Block C - 110", studentId: "EC-2024-342", entryTime: "09:12 AM", exitTime: "04:30 PM", status: "outside", flagged: false },
  { id: 3, name: "Rahul Singh", course: "B.Sc Data", room: "Block B - 205", studentId: "EC-2024-115", entryTime: "11:20 PM", exitTime: "07:15 PM", status: "inside", flagged: true },
  { id: 4, name: "Nisha Kapoor", course: "BBA", room: "Block A - 212", studentId: "EC-2024-221", entryTime: "10:20 AM", exitTime: "--:--", status: "inside", flagged: false },
];

const statusOptions = [
  { value: "all", label: "All" },
  { value: "inside", label: "Inside" },
  { value: "outside", label: "Outside" },
  { value: "late", label: "Late Entries" },
];

function ScannerPanel({ onMessage }) {
  return (
    <GateCard className="overflow-hidden border-green-100 bg-white p-0">
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-green-700">Fast Scan Active</p>
        <h2 className="mt-2 text-2xl font-semibold text-gray-950">Student ID Scanner</h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          Hold the student ID QR inside the frame to mark campus transit.
        </p>
      </div>
      <div className="relative mx-6 mb-6 grid h-72 place-items-center overflow-hidden rounded-2xl border border-green-200 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="absolute inset-8 rounded-xl border border-green-500/50 bg-white/60" />
        <div className="absolute left-10 right-10 top-1/2 h-0.5 animate-pulse bg-green-400 shadow-[0_0_18px_rgba(34,197,94,0.8)]" />
        <QrCode size={72} className="text-green-400/80" />
      </div>
      <div className="grid grid-cols-2 gap-3 border-t border-gray-100 p-6">
        <Button variant="secondary" className="bg-white text-gray-800 hover:bg-gray-50" onClick={() => onMessage("Flash toggled.")}>
          <Zap size={15} />
          Flash Off
        </Button>
        <Button variant="outline" className="bg-white text-gray-800" onClick={() => onMessage("Camera switched.")}>
          <Camera size={15} />
          Switch Cam
        </Button>
      </div>
    </GateCard>
  );
}

export default function EntryExit() {
  const [logs, setLogs] = useState(seedTransit);
  const [loading, setLoading] = useState(true);
  const [apiNotice, setApiNotice] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadLogs() {
      setLoading(true);
      setApiNotice("");

      try {
        const data = await getEntryLogs();
        if (active && data.length) {
          setLogs(data);
        }
      } catch (error) {
        if (active) {
          setApiNotice(`${getErrorMessage(error)} Showing local entry logs.`);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadLogs();

    return () => {
      active = false;
    };
  }, []);

  const filteredLogs = useMemo(() => {
    const term = query.trim().toLowerCase();
    return logs.filter((item) => {
      const matchesQuery = !term || item.name.toLowerCase().includes(term) || item.studentId.toLowerCase().includes(term) || item.room.toLowerCase().includes(term);
      if (statusFilter === "all") return matchesQuery;
      if (statusFilter === "late") return matchesQuery && item.flagged;
      return matchesQuery && item.status === statusFilter;
    });
  }, [logs, query, statusFilter]);

  const stats = useMemo(
    () => ({
      inside: logs.filter((item) => item.status === "inside").length + 1244,
      outside: logs.filter((item) => item.status === "outside").length + 138,
    }),
    [logs],
  );

  const showMessage = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2200);
  };

  const toggleTransit = async (id) => {
    const currentLog = logs.find((item) => item.id === id);

    setLogs((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const movingOut = item.status === "inside";
        return {
          ...item,
          status: movingOut ? "outside" : "inside",
          exitTime: movingOut ? "Now" : "--:--",
          entryTime: movingOut ? item.entryTime : "Now",
        };
      }),
    );

    try {
      if (currentLog?.raw?._id || currentLog?.raw?.studentId) {
        await markEntryExit({
          studentId: currentLog.raw?.studentId?._id || currentLog.raw?.studentId || id,
          hostelId: currentLog.raw?.hostelId,
          direction: currentLog.status === "inside" ? "exit" : "entry",
        });
      }
      showMessage("Student transit status updated.");
    } catch {
      showMessage("Transit status updated locally. API update is unavailable.");
    }
  };

  const addManualLog = () => {
    setLogs((prev) => [
      {
        id: Date.now(),
        name: "Manual Entry",
        course: "Verification Desk",
        room: "Block A - 101",
        studentId: `EC-2024-${Math.floor(100 + Math.random() * 899)}`,
        entryTime: "Now",
        exitTime: "--:--",
        status: "inside",
        flagged: false,
      },
      ...prev,
    ]);
    showMessage("Manual entry log added.");
  };

  return (
    <GatekeeperPage>
      <div className="space-y-8">
        <PageHeader
          title="Student Entry/Exit"
          description="Real-time campus transit monitoring and security verification."
          actions={
            <>
              <Button variant="outline" className="bg-white" onClick={() => showMessage("QR scanner activated.")}>
                <QrCode size={16} />
                Scan QR Code
              </Button>
              <Button onClick={addManualLog} className="shadow-md">
                <LogIn size={16} />
                Manual Entry Log
              </Button>
            </>
          }
        />

        {message && <div className="rounded-xl border border-green-200 bg-white px-5 py-4 text-sm font-medium text-green-800 shadow-sm">{message}</div>}
        {apiNotice && <div className="rounded-xl border border-amber-100 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-800 shadow-sm">{apiNotice}</div>}

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="space-y-6 xl:col-span-4">
            <ScannerPanel onMessage={showMessage} />
            <GateCard>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Live Occupancy</p>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                  <h3 className="text-4xl font-semibold text-green-700">{stats.inside.toLocaleString()}</h3>
                  <p className="mt-2 text-xs font-semibold uppercase text-green-700">Inside</p>
                </div>
                <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                  <h3 className="text-4xl font-semibold text-amber-700">{stats.outside}</h3>
                  <p className="mt-2 text-xs font-semibold uppercase text-amber-700">Outside</p>
                </div>
              </div>
            </GateCard>
          </div>

          <div className="xl:col-span-8">
            <GateCard className="overflow-hidden p-0">
              <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-950">Transit Ledger</h2>
                  <p className="mt-1 text-sm text-gray-500">Scan activity, manual overrides, and late-entry flags.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-[180px_240px_auto_auto]">
                  <Select value={statusFilter} onChange={setStatusFilter} options={statusOptions} ariaLabel="Transit status filter" />
                  <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search student..." className="h-12" />
                  <Button variant="outline" className="h-12 bg-white" onClick={() => showMessage("Transit report exported.")}><Download size={16} /></Button>
                  <Button variant="outline" className="h-12 bg-white" onClick={() => showMessage("Security alert sent.")}><BellDot size={16} /></Button>
                </div>
              </div>

              <div className="hidden grid-cols-[1.35fr_0.9fr_0.8fr_0.7fr_1fr] bg-gray-50 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 lg:grid">
                <span>Student</span><span>Room / ID</span><span>In / Out</span><span>Status</span><span className="text-right">Actions</span>
              </div>

              <div className="divide-y divide-gray-100">
                {loading ? (
                  [1, 2, 3, 4].map((item) => (
                    <div key={item} className="h-20 animate-pulse bg-gray-50" />
                  ))
                ) : (
                  filteredLogs.map((item, index) => (
                  <div key={item.id} className={`grid gap-4 px-6 py-5 transition hover:bg-gray-50 lg:grid-cols-[1.35fr_0.9fr_0.8fr_0.7fr_1fr] lg:items-center ${index % 2 ? "bg-gray-50/40" : "bg-white"}`}>
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-green-100 text-sm font-semibold text-green-700">
                        {item.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-950">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.course}</p>
                        {item.flagged && <p className="text-xs font-semibold text-red-600">Late entry flagged</p>}
                      </div>
                    </div>
                    <div><p className="font-medium text-gray-900">{item.room}</p><p className="text-xs text-gray-500">ID: {item.studentId}</p></div>
                    <div className="text-sm"><p className="font-medium text-green-700">{item.entryTime}</p><p className="font-medium text-amber-700">{item.exitTime}</p></div>
                    <StatusBadge status={item.status} />
                    <div className="flex justify-start gap-2 lg:justify-end">
                      <Button size="sm" onClick={() => toggleTransit(item.id)}>{item.status === "inside" ? "Mark Exit" : "Mark Entry"}</Button>
                      <Button size="sm" variant="outline" className="bg-white" onClick={() => showMessage(`${item.name} profile opened.`)}>View</Button>
                    </div>
                  </div>
                )))}
              </div>

              {filteredLogs.length === 0 && <div className="p-10 text-center text-sm text-gray-500">No students found for this search/filter.</div>}
            </GateCard>
          </div>
        </section>

        <Button variant="warning" className="w-full max-w-sm shadow-sm" onClick={() => showMessage("Emergency gate lockdown alert sent.")}>
          <ShieldAlert size={16} />
          Emergency Gate Lockdown
        </Button>
      </div>
    </GatekeeperPage>
  );
}
