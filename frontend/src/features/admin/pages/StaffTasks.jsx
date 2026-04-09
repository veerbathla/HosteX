import {
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Clock,
  MoreVertical,
  Plus,
  Search,
  UserCog,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

const initialStaff = [
  { id: 1, name: "James Wilson", role: "Plumbing", status: "active" },
  { id: 2, name: "Sarah Chen", role: "Cleaning", status: "active" },
  { id: 3, name: "Mark Rodriguez", role: "Electrical", status: "active" },
  { id: 4, name: "Emily Blunt", role: "Housekeeping", status: "off-duty" },
];

const initialTasks = [
  {
    id: 1,
    title: "Check Water Filtration Plant",
    location: "Utility Block",
    category: "maintenance",
    assignee: "Mark Rodriguez",
    due: "Yesterday",
    priority: "low",
    status: "completed",
  },
  {
    id: 2,
    title: "Deep clean common study lounge",
    location: "Floor 3",
    category: "cleaning",
    assignee: "Sarah Chen",
    due: "Today",
    priority: "medium",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Repair bathroom exhaust fan",
    location: "Room A-203",
    category: "maintenance",
    assignee: "James Wilson",
    due: "Today",
    priority: "high",
    status: "pending",
  },
  {
    id: 4,
    title: "Inspect corridor fire extinguishers",
    location: "Block B",
    category: "inspection",
    assignee: "Unassigned",
    due: "Tomorrow",
    priority: "medium",
    status: "pending",
  },
];

const priorityBadge = {
  low: "success",
  medium: "warning",
  high: "error",
};

const statusBadge = {
  pending: "neutral",
  "in-progress": "info",
  completed: "success",
};

export default function StaffTasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [staff, setStaff] = useState(initialStaff);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isRosterOpen, setIsRosterOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: "", role: "" });
  const [form, setForm] = useState({
    title: "",
    location: "",
    assignee: "Unassigned",
    priority: "medium",
    category: "maintenance",
  });

  const filteredTasks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesQuery =
        !normalizedQuery ||
        task.title.toLowerCase().includes(normalizedQuery) ||
        task.location.toLowerCase().includes(normalizedQuery) ||
        task.assignee.toLowerCase().includes(normalizedQuery);
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter, tasks]);

  const stats = useMemo(
    () => ({
      total: tasks.length,
      pending: tasks.filter((task) => task.status === "pending").length,
      active: tasks.filter((task) => task.status === "in-progress").length,
      completed: tasks.filter((task) => task.status === "completed").length,
    }),
    [tasks],
  );

  const showMessage = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2200);
  };

  const updateTaskStatus = (id, status) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task)),
    );
    showMessage(
      status === "completed"
        ? "Task marked completed."
        : "Task moved to in progress.",
    );
  };

  const assignTask = (id) => {
    const activeStaff = staff.find((member) => member.status === "active");

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, assignee: activeStaff?.name || "Unassigned" }
          : task,
      ),
    );
    showMessage("Task assigned to available staff.");
  };

  const rescheduleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, due: "Tomorrow" } : task,
      ),
    );
    showMessage("Task rescheduled for tomorrow.");
  };

  const toggleStaffStatus = (id) => {
    setStaff((prev) =>
      prev.map((member) =>
        member.id === id
          ? {
              ...member,
              status: member.status === "active" ? "off-duty" : "active",
            }
          : member,
      ),
    );
  };

  const addStaffMember = () => {
    if (!newStaff.name.trim() || !newStaff.role.trim()) {
      showMessage("Add staff name and role.");
      return;
    }

    setStaff((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newStaff.name.trim(),
        role: newStaff.role.trim(),
        status: "active",
      },
    ]);
    setNewStaff({ name: "", role: "" });
    showMessage("Staff member added.");
  };

  const addTask = () => {
    if (!form.title.trim() || !form.location.trim()) {
      showMessage("Add a task title and location.");
      return;
    }

    setTasks((prev) => [
      {
        id: Date.now(),
        title: form.title.trim(),
        location: form.location.trim(),
        category: form.category,
        assignee: form.assignee,
        due: "Today",
        priority: form.priority,
        status: "pending",
      },
      ...prev,
    ]);
    setForm({
      title: "",
      location: "",
      assignee: "Unassigned",
      priority: "medium",
      category: "maintenance",
    });
    setIsAdding(false);
    showMessage("New staff task created.");
  };

  return (
    <div className="min-h-screen bg-[#f5f7f6] p-6">
      <div className="space-y-6">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-green-600">
              Staff Operations
            </p>
            <h1 className="mt-1 text-3xl font-bold text-gray-800">
              Staff Task Management
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-gray-500">
              Assign, track, and complete hostel maintenance tasks with live
              staff availability.
            </p>
          </div>

          <Button onClick={() => setIsAdding(true)} className="gap-2">
            <Plus size={16} />
            New Task
          </Button>
        </header>

        {message && (
          <div className="rounded-lg bg-green-100 px-4 py-3 text-sm font-medium text-green-800">
            {message}
          </div>
        )}

        <section className="grid gap-4 md:grid-cols-4">
          <Card>
            <ClipboardList className="text-green-600" size={22} />
            <p className="mt-4 text-sm text-gray-500">Total Tasks</p>
            <h3 className="text-2xl font-semibold">{stats.total}</h3>
          </Card>
          <Card>
            <Clock className="text-amber-500" size={22} />
            <p className="mt-4 text-sm text-gray-500">Pending</p>
            <h3 className="text-2xl font-semibold">{stats.pending}</h3>
          </Card>
          <Card>
            <Wrench className="text-blue-600" size={22} />
            <p className="mt-4 text-sm text-gray-500">In Progress</p>
            <h3 className="text-2xl font-semibold">{stats.active}</h3>
          </Card>
          <Card>
            <CheckCircle2 className="text-green-600" size={22} />
            <p className="mt-4 text-sm text-gray-500">Completed</p>
            <h3 className="text-2xl font-semibold">{stats.completed}</h3>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <Card className="p-0 overflow-hidden">
            <div className="border-b p-5">
              <div className="grid gap-3 md:grid-cols-[1fr_180px]">
                <label className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500"
                    size={18}
                  />
                  <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search task, staff or location..."
                    className="pl-10"
                  />
                </label>

                <Select
                  value={statusFilter}
                  onChange={setStatusFilter}
                  options={[
                    { value: "all", label: "All Tasks" },
                    { value: "pending", label: "Pending" },
                    { value: "in-progress", label: "In Progress" },
                    { value: "completed", label: "Completed" },
                  ]}
                  ariaLabel="Filter staff tasks by status"
                />
              </div>
            </div>

            <div className="divide-y">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="grid gap-4 p-5 lg:grid-cols-[1fr_150px_120px_190px_24px] lg:items-center"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-gray-800">
                        {task.title}
                      </h3>
                      <Badge type={priorityBadge[task.priority]}>
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {task.location} - {task.category}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {task.assignee}
                    </p>
                    <p className="text-xs text-gray-400">Assigned staff</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {task.due}
                    </p>
                    <p className="text-xs text-gray-400">Due date</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge type={statusBadge[task.status]}>
                      {task.status.replace("-", " ")}
                    </Badge>
                    {task.status === "pending" && (
                      <Button size="sm" onClick={() => updateTaskStatus(task.id, "in-progress")}>
                        Start
                      </Button>
                    )}
                    {task.status !== "completed" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateTaskStatus(task.id, "completed")}
                      >
                        Done
                      </Button>
                    )}
                    {task.assignee === "Unassigned" && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => assignTask(task.id)}
                      >
                        Assign
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => rescheduleTask(task.id)}
                    >
                      <CalendarClock size={14} />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => showMessage(`Opened ${task.title}`)}
                    className="text-gray-400 hover:text-gray-700"
                    aria-label={`Open ${task.title} actions`}
                  >
                    <MoreVertical size={18} />
                  </Button>
                </div>
              ))}
            </div>

            {filteredTasks.length === 0 && (
              <div className="p-8 text-center text-sm text-gray-500">
                No tasks match your filters.
              </div>
            )}
          </Card>

          <div className="space-y-6">
            <Card>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-800">
                  Staff Availability
                </h2>
                <UserCog className="text-green-600" size={20} />
              </div>

              <div className="mt-5 space-y-4">
                {staff.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {member.name}
                      </p>
                      <p className="text-xs text-gray-400">{member.role}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStaffStatus(member.id)}
                    >
                      <Badge
                        type={member.status === "active" ? "success" : "neutral"}
                      >
                        {member.status}
                      </Badge>
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                fullWidth
                variant="outline"
                className="mt-6"
                onClick={() => setIsRosterOpen(true)}
              >
                Manage Staff Rosters
              </Button>
            </Card>

            <Card className="bg-emerald-900 text-white border-emerald-900">
              <h2 className="text-xl font-bold">System Performance Insight</h2>
              <p className="mt-2 text-sm text-emerald-100">
                Maintenance response time has improved by 24% this semester.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-white/10 p-4">
                  <p className="text-xs text-emerald-100">Avg. Resolution</p>
                  <h3 className="text-2xl font-bold">4.2 hrs</h3>
                </div>
                <div className="rounded-lg bg-white/10 p-4">
                  <p className="text-xs text-emerald-100">Satisfaction</p>
                  <h3 className="text-2xl font-bold">4.8/5</h3>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <Card className="w-full max-w-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">
                  Staff Operations
                </p>
                <h2 className="text-2xl font-bold text-gray-800">
                  Create New Task
                </h2>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>
                X
              </Button>
            </div>

            <div className="mt-6 space-y-4">
              <Input
                value={form.title}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                placeholder="Task title"
              />
              <Input
                value={form.location}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    location: event.target.value,
                  }))
                }
                placeholder="Location"
              />
              <div className="grid grid-cols-3 gap-3">
                <Select
                  value={form.assignee}
                  onChange={(assignee) =>
                    setForm((current) => ({
                      ...current,
                      assignee,
                    }))
                  }
                  options={[
                    { value: "Unassigned", label: "Unassigned" },
                    ...staff.map((member) => ({
                      value: member.name,
                      label: member.name,
                    })),
                  ]}
                  searchable
                  ariaLabel="Assign staff member"
                />
                <Select
                  value={form.priority}
                  onChange={(priority) =>
                    setForm((current) => ({
                      ...current,
                      priority,
                    }))
                  }
                  options={[
                    { value: "low", label: "Low" },
                    { value: "medium", label: "Medium" },
                    { value: "high", label: "High" },
                  ]}
                  ariaLabel="Task priority"
                />
                <Select
                  value={form.category}
                  onChange={(category) =>
                    setForm((current) => ({
                      ...current,
                      category,
                    }))
                  }
                  options={[
                    { value: "maintenance", label: "Maintenance" },
                    { value: "cleaning", label: "Cleaning" },
                    { value: "inspection", label: "Inspection" },
                  ]}
                  ariaLabel="Task category"
                />
              </div>
              <Button fullWidth size="lg" onClick={addTask}>
                Create Task
              </Button>
            </div>
          </Card>
        </div>
      )}

      {isRosterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <Card className="w-full max-w-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">
                  Staff Operations
                </p>
                <h2 className="text-2xl font-bold text-gray-800">
                  Manage Staff Roster
                </h2>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsRosterOpen(false)}>
                X
              </Button>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
              <Input
                value={newStaff.name}
                onChange={(event) =>
                  setNewStaff((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="Staff name"
              />
              <Input
                value={newStaff.role}
                onChange={(event) =>
                  setNewStaff((current) => ({
                    ...current,
                    role: event.target.value,
                  }))
                }
                placeholder="Role"
              />
              <Button onClick={addStaffMember} className="h-full">
                Add Staff
              </Button>
            </div>

            <div className="mt-6 divide-y rounded-xl border">
              {staff.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between gap-4 p-4"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      type={member.status === "active" ? "success" : "neutral"}
                    >
                      {member.status}
                    </Badge>
                    <Button
                      size="sm"
                      variant={member.status === "active" ? "secondary" : "primary"}
                      onClick={() => toggleStaffStatus(member.id)}
                    >
                      {member.status === "active" ? "Set Off Duty" : "Set Active"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
