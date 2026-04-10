import {
  AlertOctagon,
  ArrowDownToLine,
  CheckCircle2,
  Filter,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import {
  GateCard,
  GatekeeperPage,
  GateStatCard,
  PageHeader,
  StatusBadge,
} from "../components/GatekeeperUI";

const initialLogs = [
  { id: 1, type: "entry", title: "Student entry verified", subject: "Rahul Sharma", location: "Alpha Gate", time: "09:12 AM", status: "resolved" },
  { id: 2, type: "parcel", title: "Parcel awaiting collection", subject: "Sneha Kapur", location: "Parcel Bay", time: "08:55 AM", status: "open" },
  { id: 3, type: "visitor", title: "Visitor pass closed", subject: "Vikram Adithya", location: "Main Gate", time: "08:40 AM", status: "resolved" },
  { id: 4, type: "incident", title: "Power spike reported", subject: "Transformer B", location: "Utility Block", time: "08:15 AM", status: "open" },
];

const typeOptions = [
  { value: "all", label: "All Logs" },
  { value: "entry", label: "Entry/Exit" },
  { value: "visitor", label: "Visitors" },
  { value: "parcel", label: "Parcels" },
  { value: "incident", label: "Incidents" },
];

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "open", label: "Open" },
  { value: "resolved", label: "Resolved" },
];

export default function Logs() {
  const [logs, setLogs] = useState(initialLogs);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [message, setMessage] = useState("");

  const filteredLogs = useMemo(() => {
    const term = query.trim().toLowerCase();
    return logs.filter((log) => {
      const matchesQuery = !term || log.title.toLowerCase().includes(term) || log.subject.toLowerCase().includes(term) || log.location.toLowerCase().includes(term);
      const matchesType = typeFilter === "all" || log.type === typeFilter;
      const matchesStatus = statusFilter === "all" || log.status === statusFilter;
      return matchesQuery && matchesType && matchesStatus;
    });
  }, [logs, query, statusFilter, typeFilter]);

  const stats = useMemo(
    () => ({
      total: logs.length,
      open: logs.filter((log) => log.status === "open").length,
      resolved: logs.filter((log) => log.status === "resolved").length,
    }),
    [logs],
  );

  const showMessage = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2200);
  };

  const resolveLog = (id) => {
    setLogs((prev) => prev.map((log) => (log.id === id ? { ...log, status: "resolved" } : log)));
    showMessage("Log marked as resolved.");
  };

  const addIncident = () => {
    setLogs((prev) => [
      { id: Date.now(), type: "incident", title: "Manual incident recorded", subject: "Gatekeeper Desk", location: "Alpha Gate", time: "Now", status: "open" },
      ...prev,
    ]);
    showMessage("Incident added to gate logs.");
  };

  return (
    <GatekeeperPage>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Security Archive"
          title="Gate Logs"
          description="Review campus movement, visitors, parcels, and incident records."
          actions={
            <>
              <Button variant="outline" className="bg-white" onClick={() => showMessage("Logs exported.")}><ArrowDownToLine size={16} />Export Logs</Button>
              <Button variant="warning" onClick={addIncident}><AlertOctagon size={16} />Add Incident</Button>
            </>
          }
        />

        {message && <div className="rounded-xl border border-green-200 bg-white px-5 py-4 text-sm font-medium text-green-800 shadow-sm">{message}</div>}

        <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <GateStatCard label="Total Logs" value={stats.total} helper="All records" icon={<ShieldCheck size={20} />} tone="gray" />
          <GateStatCard label="Open Items" value={stats.open} helper="Needs review" icon={<AlertOctagon size={20} />} tone="red" />
          <GateStatCard label="Resolved" value={stats.resolved} helper="Closed today" icon={<CheckCircle2 size={20} />} tone="green" />
        </section>

        <GateCard className="overflow-hidden p-0">
          <div className="grid gap-3 border-b border-gray-100 p-6 lg:grid-cols-[1fr_180px_180px_auto]">
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search logs..." className="h-12" />
            <Select value={typeFilter} onChange={setTypeFilter} options={typeOptions} ariaLabel="Filter logs by type" />
            <Select value={statusFilter} onChange={setStatusFilter} options={statusOptions} ariaLabel="Filter logs by status" />
            <Button variant="outline" className="h-12 bg-white" onClick={() => { setQuery(""); setTypeFilter("all"); setStatusFilter("all"); }}><Filter size={16} />Reset</Button>
          </div>

          <div className="hidden grid-cols-[1fr_0.8fr_0.75fr_0.55fr_0.75fr_0.9fr] bg-gray-50 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 lg:grid">
            <span>Log</span><span>Subject</span><span>Location</span><span>Time</span><span>Status</span><span className="text-right">Action</span>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredLogs.map((log, index) => (
              <div key={log.id} className={`grid gap-4 px-6 py-5 transition hover:bg-gray-50 lg:grid-cols-[1fr_0.8fr_0.75fr_0.55fr_0.75fr_0.9fr] lg:items-center ${index % 2 ? "bg-gray-50/40" : "bg-white"}`}>
                <div><p className="font-semibold text-gray-950">{log.title}</p><p className="text-xs font-semibold uppercase text-gray-400">{log.type}</p></div>
                <p className="text-sm font-medium text-gray-800">{log.subject}</p>
                <p className="text-sm text-gray-500">{log.location}</p>
                <p className="text-sm font-medium text-gray-500">{log.time}</p>
                <StatusBadge status={log.status} />
                <div className="flex justify-start lg:justify-end">
                  {log.status === "open" ? <Button size="sm" onClick={() => resolveLog(log.id)}><CheckCircle2 size={15} />Resolve</Button> : <Button size="sm" variant="outline" className="bg-white" onClick={() => showMessage(`${log.title} reviewed.`)}><ShieldCheck size={15} />Review</Button>}
                </div>
              </div>
            ))}
          </div>

          {filteredLogs.length === 0 && <div className="p-10 text-center text-sm text-gray-500">No logs match the current filters.</div>}
        </GateCard>
      </div>
    </GatekeeperPage>
  );
}
