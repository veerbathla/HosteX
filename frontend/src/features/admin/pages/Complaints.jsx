import {
  AlertTriangle,
  Clock3,
  Download,
  Plus,
  Search,
  Smile,
  TimerReset,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { complaints as initialComplaints } from "../../../data/dummyData";
import {
  createComplaint,
  getAllComplaints,
  updateComplaintStatus,
} from "../../../services/api/complaintService";
import { getErrorMessage } from "../../../services/api/normalizers";
import ComplaintsTable from "../components/complaints/ComplaintsTable";
import SmartCard from "../components/complaints/SmartCard";

const seedComplaints = initialComplaints.map((complaint, index) => ({
  room: ["Room 302", "Floor 4", "Laundry Block"][index] || "Admin Desk",
  ...complaint,
}));

function MetricCard({ icon, label, value, trend, tone }) {
  const toneMap = {
    amber: "from-amber-50 to-white text-amber-700",
    blue: "from-blue-50 to-white text-blue-700",
    red: "from-red-50 to-white text-red-700",
    green: "from-green-50 to-white text-green-700",
  };

  return (
    <Card
      className={`bg-gradient-to-br ${toneMap[tone]} p-5 transition duration-200 hover:-translate-y-1 hover:shadow-lg`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-600">{label}</p>
          <h3 className="mt-2 text-3xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/80 shadow-sm">
          {icon}
        </div>
      </div>
      <p className="mt-4 text-xs font-semibold">{trend}</p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
        <div className="h-full w-2/3 rounded-full bg-current transition-all duration-500" />
      </div>
    </Card>
  );
}

export default function Complaints() {
  const [complaints, setComplaints] = useState(seedComplaints);
  const [loading, setLoading] = useState(true);
  const [apiNotice, setApiNotice] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeMenu, setActiveMenu] = useState(null);
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState({ type: null, complaint: null });
  const [form, setForm] = useState({
    title: "",
    student: "",
    room: "",
    priority: "medium",
    status: "new",
  });

  useEffect(() => {
    let active = true;

    async function loadComplaints() {
      setLoading(true);
      setApiNotice("");

      try {
        const data = await getAllComplaints();
        if (active && data.length) {
          setComplaints(data);
        }
      } catch (error) {
        if (active) {
          setApiNotice(
            `${getErrorMessage(error)} Showing local complaint data.`,
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadComplaints();

    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(
    () => ({
      pending: complaints.filter((item) => item.status !== "resolved").length,
      highPriority: complaints.filter((item) => item.priority === "high").length,
      satisfaction: "94%",
      avgTime: "4.2h",
    }),
    [complaints],
  );

  const filteredComplaints = useMemo(() => {
    const term = query.trim().toLowerCase();

    return complaints.filter((complaint) => {
      const matchesSearch =
        !term ||
        complaint.title.toLowerCase().includes(term) ||
        complaint.student.toLowerCase().includes(term) ||
        complaint.room.toLowerCase().includes(term);
      const matchesStatus =
        statusFilter === "all" || complaint.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [complaints, query, statusFilter]);

  const showMessage = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2200);
  };

  const closeModal = () => {
    setModal({ type: null, complaint: null });
    setForm({
      title: "",
      student: "",
      room: "",
      priority: "medium",
      status: "new",
    });
  };

  const openEdit = (complaint) => {
    setForm({
      title: complaint.title,
      student: complaint.student,
      room: complaint.room,
      priority: complaint.priority,
      status: complaint.status,
    });
    setModal({ type: "edit", complaint });
    setActiveMenu(null);
  };

  const openCreate = () => {
    setModal({ type: "create", complaint: null });
    setActiveMenu(null);
  };

  const resolveComplaint = async (id) => {
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === id ? { ...complaint, status: "resolved" } : complaint,
      ),
    );
    setActiveMenu(null);

    try {
      await updateComplaintStatus(id, "resolved");
      showMessage("Complaint marked as resolved.");
    } catch {
      showMessage("Complaint resolved locally. API update is unavailable.");
    }
  };

  const escalateComplaint = (id) => {
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === id ? { ...complaint, priority: "high" } : complaint,
      ),
    );
    setActiveMenu(null);
    showMessage("Complaint escalated to high priority.");
  };

  const saveComplaint = async () => {
    if (!form.title.trim() || !form.student.trim() || !form.room.trim()) {
      showMessage("Please fill title, student, and room.");
      return;
    }

    if (modal.type === "create") {
      try {
        const created = await createComplaint({
          title: form.title.trim(),
          description: `${form.student.trim()} - ${form.room.trim()}`,
          priority: form.priority,
        });

        setComplaints((prev) => [
          {
            ...created,
            student: form.student.trim(),
            room: form.room.trim(),
            priority: form.priority,
            status: form.status,
            time: created.time || "Just now",
          },
          ...prev,
        ]);

        if (form.status !== "new") {
          const updated = await updateComplaintStatus(created.id, form.status);
          setComplaints((prev) =>
            prev.map((complaint) =>
              complaint.id === created.id
                ? { ...complaint, status: updated.status }
                : complaint,
            ),
          );
        }

        showMessage("New complaint created.");
      } catch (error) {
        showMessage(error.message || "Complaint could not be created.");
        return;
      }
    }

    if (modal.type === "edit") {
      try {
        if (form.status !== modal.complaint.status) {
          await updateComplaintStatus(modal.complaint.id, form.status);
        }
      } catch (error) {
        showMessage(error.message || "Complaint status could not be updated.");
        return;
      }

      setComplaints((prev) =>
        prev.map((complaint) =>
          complaint.id === modal.complaint.id
            ? {
                ...complaint,
                title: form.title.trim(),
                student: form.student.trim(),
                room: form.room.trim(),
                priority: form.priority,
                status: form.status,
              }
            : complaint,
        ),
      );
      showMessage("Complaint updated.");
    }

    closeModal();
  };

  return (
    <div className="min-h-screen space-y-6 p-6 sm:p-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Complaint Management
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Track hostel issues, identify urgent complaints, and resolve faster.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={() => showMessage("Report exported successfully.")}
            className="gap-2 border border-gray-200 bg-white"
          >
            <Download size={16} />
            Export Report
          </Button>
          <Button onClick={openCreate} className="gap-2">
            <Plus size={16} />
            New Complaint
          </Button>
        </div>
      </header>

      {message && (
        <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          {message}
        </div>
      )}

      {apiNotice && (
        <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          {apiNotice}
        </div>
      )}

      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <MetricCard
          icon={<Clock3 size={20} />}
          label="Total Pending"
          value={stats.pending}
          trend="up 12% from yesterday"
          tone="amber"
        />
        <MetricCard
          icon={<TimerReset size={20} />}
          label="Avg Resolve Time"
          value={stats.avgTime}
          trend="down 0.8h this week"
          tone="blue"
        />
        <MetricCard
          icon={<AlertTriangle size={20} />}
          label="High Priority"
          value={stats.highPriority}
          trend="needs review"
          tone="red"
        />
        <MetricCard
          icon={<Smile size={20} />}
          label="Satisfaction"
          value={stats.satisfaction}
          trend="up 4% this month"
          tone="green"
        />
      </section>

      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_190px]">
          <label className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by issue, resident, or room..."
              className="pl-10"
            />
          </label>

          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: "all", label: "All Statuses" },
              { value: "new", label: "New" },
              { value: "in-progress", label: "In Progress" },
              { value: "resolved", label: "Resolved" },
            ]}
            ariaLabel="Filter complaints by status"
          />
        </div>
      </Card>

      {loading ? (
        <Card className="space-y-3 p-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-20 animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </Card>
      ) : (
        <ComplaintsTable
          data={filteredComplaints}
          activeMenu={activeMenu}
          onToggleMenu={(id) =>
            setActiveMenu((current) => (current === id ? null : id))
          }
          onOpenDetails={(complaint) => {
            setModal({ type: "details", complaint });
            setActiveMenu(null);
          }}
          onResolve={resolveComplaint}
          onEdit={openEdit}
          onEscalate={escalateComplaint}
        />
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SmartCard type="smart" />
        <SmartCard type="alert" />
      </div>

      {modal.type && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <Card className="w-full max-w-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">
                  Complaint Desk
                </p>
                <h2 className="text-2xl font-bold text-gray-900">
                  {modal.type === "create"
                    ? "New Complaint"
                    : modal.type === "edit"
                      ? "Edit Complaint"
                      : "Complaint Details"}
                </h2>
              </div>
              <Button variant="ghost" size="sm" onClick={closeModal}>
                X
              </Button>
            </div>

            {modal.type === "details" && modal.complaint && (
              <div className="mt-6 space-y-4 text-sm text-gray-600">
                <p>
                  <strong className="text-gray-900">Issue:</strong>{" "}
                  {modal.complaint.title}
                </p>
                <p>
                  <strong className="text-gray-900">Resident:</strong>{" "}
                  {modal.complaint.student}
                </p>
                <p>
                  <strong className="text-gray-900">Room:</strong>{" "}
                  {modal.complaint.room}
                </p>
                <div className="flex gap-2">
                  <Badge type={modal.complaint.priority === "high" ? "error" : "warning"}>
                    {modal.complaint.priority}
                  </Badge>
                  <Badge type={modal.complaint.status === "resolved" ? "success" : "info"}>
                    {modal.complaint.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {modal.complaint.status !== "resolved" && (
                    <Button
                      fullWidth
                      onClick={() => {
                        resolveComplaint(modal.complaint.id);
                        closeModal();
                      }}
                    >
                      Resolve
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => openEdit(modal.complaint)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            )}

            {(modal.type === "create" || modal.type === "edit") && (
              <div className="mt-6 space-y-4">
                <Input
                  value={form.title}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, title: event.target.value }))
                  }
                  placeholder="Complaint title"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={form.student}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, student: event.target.value }))
                    }
                    placeholder="Resident name"
                  />
                  <Input
                    value={form.room}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, room: event.target.value }))
                    }
                    placeholder="Room"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Select
                    value={form.priority}
                    onChange={(priority) =>
                      setForm((current) => ({ ...current, priority }))
                    }
                    options={[
                      { value: "low", label: "Low priority" },
                      { value: "medium", label: "Medium priority" },
                      { value: "high", label: "High priority" },
                    ]}
                    ariaLabel="Complaint priority"
                  />
                  <Select
                    value={form.status}
                    onChange={(status) =>
                      setForm((current) => ({ ...current, status }))
                    }
                    options={[
                      { value: "new", label: "New" },
                      { value: "in-progress", label: "In Progress" },
                      { value: "resolved", label: "Resolved" },
                    ]}
                    ariaLabel="Complaint status"
                  />
                </div>
                <Button fullWidth size="lg" onClick={saveComplaint}>
                  {modal.type === "create" ? "Create Complaint" : "Save Changes"}
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
