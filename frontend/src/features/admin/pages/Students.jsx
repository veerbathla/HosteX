import {
  AlertCircle,
  CheckCircle2,
  Download,
  Filter,
  Search,
  ShieldCheck,
  UserCheck,
  UserPlus,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { getAllStudents } from "../../../services/api/studentService";
import { getErrorMessage } from "../../../services/api/normalizers";

const statusMeta = {
  pending: {
    label: "Pending",
    badge: "warning",
  },
  approved: {
    label: "Approved",
    badge: "success",
  },
  rejected: {
    label: "Rejected",
    badge: "danger",
  },
};

function StatCard({ label, value, helper, icon, tone }) {
  const toneMap = {
    green: "from-green-50 to-white text-green-700",
    amber: "from-amber-50 to-white text-amber-700",
    red: "from-red-50 to-white text-red-700",
    slate: "from-slate-50 to-white text-slate-700",
  };

  return (
    <Card
      className={`bg-gradient-to-br ${toneMap[tone]} p-5 transition duration-200 hover:-translate-y-1 hover:shadow-lg`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-gray-600">
            {label}
          </p>
          <h3 className="mt-3 text-3xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/80 shadow-sm">
          {icon}
        </div>
      </div>
      <p className="mt-4 text-xs font-semibold">{helper}</p>
    </Card>
  );
}

export default function Students() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiNotice, setApiNotice] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [semesterFilter, setSemesterFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [checkInDraft, setCheckInDraft] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadStudents() {
      setLoading(true);
      setApiNotice("");

      try {
        const students = await getAllStudents();

        if (!active) return;

        if (students.length) {
          setApplications(
            students.map((student) => ({
              id: student.id,
              name: student.name,
              studentId: student.studentId,
              course: student.course,
              year: student.year,
              date: "From API",
              status: student.status,
            })),
          );
        }
      } catch (error) {
        if (active) {
          setApiNotice(getErrorMessage(error));
          setApplications([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadStudents();

    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(
    () => ({
      total: applications.length,
      pending: applications.filter((item) => item.status === "pending").length,
      approved: applications.filter((item) => item.status === "approved").length,
      rejected: applications.filter((item) => item.status === "rejected").length,
    }),
    [applications],
  );

  const filteredApplications = useMemo(() => {
    const term = query.trim().toLowerCase();

    return applications.filter((application) => {
      const matchesQuery =
        !term ||
        application.name.toLowerCase().includes(term) ||
        application.studentId.toLowerCase().includes(term) ||
        application.course.toLowerCase().includes(term);
      const matchesStatus =
        statusFilter === "all" || application.status === statusFilter;
      const matchesSemester =
        semesterFilter === "all" || application.year.includes(semesterFilter);

      return matchesQuery && matchesStatus && matchesSemester;
    });
  }, [applications, query, semesterFilter, statusFilter]);

  const pageSize = 4;
  const totalPages = Math.max(Math.ceil(filteredApplications.length / pageSize), 1);
  const visibleApplications = filteredApplications.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const showMessage = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2200);
  };

  const createRandomStudent = () => ({
    name: checkInNames[Math.floor(Math.random() * checkInNames.length)],
    studentId: `STU-${Math.floor(1000 + Math.random() * 8999)}`,
  });

  const updateStatus = (id, status) => {
    setApplications((prev) =>
      prev.map((application) =>
        application.id === id ? { ...application, status } : application,
      ),
    );
    showMessage(`Application ${statusMeta[status].label.toLowerCase()}.`);
  };

  const openCheckIn = () => {
    setCheckInDraft(createRandomStudent());
  };

  const confirmCheckIn = () => {
    if (!checkInDraft) return;

    setApplications((prev) => [
      {
        id: Date.now(),
        name: checkInDraft.name,
        studentId: checkInDraft.studentId,
        course: "Hostel Admission",
        year: "Year 1, Semester 1",
        date: "Today",
        status: "pending",
      },
      ...prev,
    ]);
    setCheckInDraft(null);
    setPage(1);
    showMessage(`${checkInDraft.name} check-in request added.`);
  };

  return (
    <div className="min-h-screen p-6 sm:p-8">
      <div className="space-y-6">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-green-700">
              Administrative Portal
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
              Student Requests
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600">
              Review and manage incoming hostel accommodation applications for
              the upcoming semester.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={openCheckIn} className="gap-2">
              <UserCheck size={16} />
              Check-in Student
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setStatusFilter("pending");
                setPage(1);
                showMessage("Pending request filter applied.");
              }}
              className="gap-2 bg-green-50 text-green-700 hover:bg-green-100"
            >
              <Filter size={16} />
              Filter
            </Button>
            <Button
              variant="ghost"
              onClick={() => showMessage("Student request report exported.")}
              className="gap-2 border border-gray-200 bg-white"
            >
              <Download size={16} />
              Export List
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

        <section className="grid gap-4 md:grid-cols-4">
          <StatCard
            label="Total Requests"
            value={stats.total}
            helper="up 12% from last week"
            icon={<UserPlus size={20} />}
            tone="slate"
          />
          <StatCard
            label="Pending Review"
            value={stats.pending}
            helper="Avg response: 14h"
            icon={<AlertCircle size={20} />}
            tone="amber"
          />
          <StatCard
            label="Approved"
            value={stats.approved}
            helper="High capacity hall"
            icon={<CheckCircle2 size={20} />}
            tone="green"
          />
          <StatCard
            label="Rejected"
            value={stats.rejected}
            helper="Incomplete docs"
            icon={<XCircle size={20} />}
            tone="red"
          />
        </section>

        <Card className="overflow-hidden p-0">
          <div className="flex flex-col gap-4 border-b bg-white p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Recent Applications
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Fast scan student profiles, course details, and review state.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-[220px_170px_170px]">
              <label className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <Input
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search applications..."
                  className="h-12 pl-10"
                />
              </label>
              <Select
                value={semesterFilter}
                onChange={(value) => {
                  setSemesterFilter(value);
                  setPage(1);
                }}
                options={[
                  { value: "all", label: "All Semesters" },
                  { value: "Semester 1", label: "Semester 1" },
                  { value: "Semester 3", label: "Semester 3" },
                  { value: "Semester 5", label: "Semester 5" },
                  { value: "Semester 7", label: "Semester 7" },
                ]}
                ariaLabel="Filter by semester"
              />
              <Select
                value={statusFilter}
                onChange={(value) => {
                  setStatusFilter(value);
                  setPage(1);
                }}
                options={[
                  { value: "all", label: "All Statuses" },
                  { value: "pending", label: "Pending" },
                  { value: "approved", label: "Approved" },
                  { value: "rejected", label: "Rejected" },
                ]}
                ariaLabel="Filter by request status"
              />
            </div>
          </div>

          <div className="hidden grid-cols-[1.2fr_1.1fr_0.8fr_0.6fr_1fr] bg-gray-50 px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-100 lg:grid">
            <span>Student Name</span>
            <span>Course & Year</span>
            <span>Date Applied</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>

          <div className="divide-y divide-gray-100">
            {loading ? (
              [1, 2, 3, 4].map((item) => (
                <div key={item} className="h-20 animate-pulse bg-gray-50" />
              ))
            ) : (
              visibleApplications.map((application) => {
                const meta = statusMeta[application.status] || statusMeta.pending;

                return (
                  <div
                    key={application.id}
                    className="grid gap-4 px-5 py-5 transition hover:bg-green-50/50 lg:grid-cols-[1.2fr_1.1fr_0.8fr_0.6fr_1fr] lg:items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-green-100 text-sm font-bold text-green-700">
                        {application.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {application.name}
                        </p>
                        <p className="text-xs font-medium text-gray-600">
                          ID: {application.studentId}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800">
                        {application.course}
                      </p>
                      <p className="text-xs text-gray-600">{application.year}</p>
                    </div>

                    <p className="text-sm font-medium text-gray-600">
                      {application.date}
                    </p>

                    <Badge type={meta.badge}>{meta.label}</Badge>

                    <div className="flex flex-wrap justify-start gap-2 lg:justify-end">
                      {application.status !== "approved" && (
                        <Button
                          size="sm"
                          onClick={() => updateStatus(application.id, "approved")}
                        >
                          Approve
                        </Button>
                      )}
                      {application.status !== "rejected" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(application.id, "rejected")}
                        >
                          Reject
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => showMessage(`Opened ${application.name}.`)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {visibleApplications.length === 0 && (
            <div className="p-10 text-center text-sm text-gray-500">
              No student requests match your filters.
            </div>
          )}

          <div className="flex flex-col gap-3 border-t px-5 py-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing {visibleApplications.length ? (page - 1) * pageSize + 1 : 0}{" "}
              to {Math.min(page * pageSize, filteredApplications.length)} of{" "}
              {filteredApplications.length} applications
            </span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                disabled={page === 1}
                onClick={() => setPage((current) => Math.max(current - 1, 1))}
              >
                Previous
              </Button>
              <Button
                size="sm"
                variant="secondary"
                disabled={page === totalPages}
                onClick={() =>
                  setPage((current) => Math.min(current + 1, totalPages))
                }
              >
                Next
              </Button>
            </div>
          </div>
        </Card>

        <section className="grid gap-4 lg:grid-cols-[1.6fr_0.9fr]">
          <Card className="overflow-hidden border-emerald-900 bg-emerald-950 p-5 text-white shadow-lg">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white">Weekly Bulk Approval</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-100">
                Approve all pending requests that meet the basic eligibility
                criteria with one click.
              </p>
              <Button
                className="mt-5 bg-green-500 hover:bg-green-400"
                onClick={() => {
                  setApplications((prev) =>
                    prev.map((application) =>
                      application.status === "pending"
                        ? { ...application, status: "approved" }
                        : application,
                    ),
                  );
                  showMessage("Eligible pending applications approved.");
                }}
              >
                Review Criteria
              </Button>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-white to-green-50">
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-green-100 text-green-700">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Admin Alert</h2>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Hall C is reaching{" "}
                  <span className="font-bold text-green-700">95% capacity</span>.
                  New student requests for this hall should be prioritized based
                  on residency distance.
                </p>
              </div>
            </div>
          </Card>
        </section>
      </div>

      {checkInDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <Card className="w-full max-w-md border-green-100 bg-gradient-to-br from-white to-green-50 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-700">
                  Quick Check-in
                </p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  Confirm Student Entry
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  A random student profile has been generated for the new hostel
                  check-in request.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCheckInDraft(null)}
                aria-label="Close check-in popup"
              >
                X
              </Button>
            </div>

            <div className="mt-6 rounded-2xl border border-green-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-green-100 text-lg font-bold text-green-700">
                  {checkInDraft.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {checkInDraft.name}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    ID: {checkInDraft.studentId}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs font-bold uppercase text-gray-400">
                    Course
                  </p>
                  <p className="mt-1 font-semibold text-gray-800">
                    Hostel Admission
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs font-bold uppercase text-gray-400">
                    Semester
                  </p>
                  <p className="mt-1 font-semibold text-gray-800">
                    Year 1, Semester 1
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_1fr]">
              <Button
                variant="outline"
                onClick={() => setCheckInDraft(createRandomStudent())}
              >
                Generate Again
              </Button>
              <Button onClick={confirmCheckIn}>Confirm Check-in</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
