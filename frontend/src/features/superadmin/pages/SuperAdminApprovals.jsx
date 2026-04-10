import {
  CheckCircle2,
  XCircle,
  Clock,
  Bell,
  Download,
  ChevronLeft,
  ChevronRight,
  Building2,
  X,
  TrendingUp,
  BadgeCheck,
  UserCheck,
} from "lucide-react";
import { useState, useMemo, useCallback } from "react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

/* ── Seed data ─────────────────────────────────────────────── */
const SEED_REQUESTS = [
  {
    id: 1,
    name: "Arjan Sharma",
    email: "a.sharma@royalacademy.edu",
    initials: "AS",
    color: "bg-emerald-100 text-emerald-700",
    institute: "Royal Academy of Excellence",
    location: "Mumbai, IN",
    role: "Admin",
    requestedAt: "2 hrs ago",
    status: "pending",
    avatar: null,
  },
  {
    id: 2,
    name: "Meera Kapoor",
    email: "m.kapoor@ststephens.ac.uk",
    initials: "MK",
    color: "bg-sky-100 text-sky-700",
    institute: "St. Stephens University",
    location: "London, UK",
    role: "Admin",
    requestedAt: "5 hrs ago",
    status: "pending",
    avatar: null,
  },
  {
    id: 3,
    name: "David Miller",
    email: "david.miller@citytech.edu",
    initials: "DM",
    color: "bg-violet-100 text-violet-700",
    institute: "City Institute of Tech",
    location: "Chicago, US",
    role: "Admin",
    requestedAt: "8 hrs ago",
    status: "pending",
    avatar: null,
  },
  {
    id: 4,
    name: "Sarah Chen",
    email: "s.chen@greenvalley.med",
    initials: "SC",
    color: "bg-rose-100 text-rose-700",
    institute: "Green Valley Medical",
    location: "Toronto, CA",
    role: "Admin",
    requestedAt: "Just now",
    status: "pending",
    avatar: null,
  },
  {
    id: 5,
    name: "Lucas Fernandez",
    email: "l.fernandez@euro.ac",
    initials: "LF",
    color: "bg-amber-100 text-amber-700",
    institute: "Euro Sciences Academy",
    location: "Madrid, ES",
    role: "Admin",
    requestedAt: "1 day ago",
    status: "pending",
    avatar: null,
  },
  {
    id: 6,
    name: "Yuki Tanaka",
    email: "y.tanaka@tokyotech.jp",
    initials: "YT",
    color: "bg-teal-100 text-teal-700",
    institute: "Tokyo Tech Institute",
    location: "Tokyo, JP",
    role: "Admin",
    requestedAt: "1 day ago",
    status: "pending",
    avatar: null,
  },
];

const PAGE_SIZE = 4;

/* ── Sub-components ────────────────────────────────────────── */
function RequestRow({ request, onApprove, onReject }) {
  return (
    <div className="grid items-center gap-4 border-b border-gray-50 px-6 py-4 transition duration-200 hover:bg-green-50/30 last:border-none sm:grid-cols-[2fr_1.6fr_0.9fr_1fr]">
      {/* Name & Email */}
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold shadow-sm ${request.color}`}
        >
          {request.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{request.name}</p>
          <p className="text-xs text-gray-400">{request.email}</p>
        </div>
      </div>

      {/* Institute */}
      <div>
        <p className="text-sm font-medium text-gray-700">{request.institute}</p>
        <p className="text-xs text-gray-400">{request.location}</p>
      </div>

      {/* Status */}
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700 ring-1 ring-amber-200">
        <Clock size={9} />
        Pending
      </span>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onApprove(request.id)}
          className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition duration-200 hover:bg-green-700 hover:shadow active:scale-95"
        >
          <CheckCircle2 size={12} />
          Approve
        </button>
        <button
          type="button"
          onClick={() => onReject(request.id)}
          className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition duration-200 hover:bg-red-100 hover:border-red-300 active:scale-95"
        >
          <XCircle size={12} />
          Reject
        </button>
      </div>
    </div>
  );
}

/* ── Real-time Alert Banner ─────────────────────────────────── */
function RealTimeAlert({ request, onApprove, onReject, onDismiss }) {
  if (!request) return null;
  return (
    <div className="animate-fade-up rounded-2xl border border-green-200 bg-white p-4 shadow-lg ring-1 ring-green-100">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-green-600">
            Real-Time Alert
          </span>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={14} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold shadow ${request.color}`}
        >
          {request.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-900 truncate">{request.name}</p>
          <p className="mt-0.5 text-xs text-gray-500 truncate">
            Applying to {request.role} for{" "}
            <span className="font-semibold text-gray-700">{request.institute}</span>
          </p>
          <p className="mt-0.5 text-[10px] text-gray-400">{request.requestedAt}</p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onApprove(request.id)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-green-600 py-2.5 text-xs font-bold text-white shadow transition hover:bg-green-700"
        >
          <CheckCircle2 size={13} />
          Approve
        </button>
        <button
          type="button"
          onClick={() => onReject(request.id)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-100"
        >
          <XCircle size={13} />
          Reject
        </button>
      </div>
    </div>
  );
}

/* ── Main Page ──────────────────────────────────────────────── */
export default function SuperAdminApprovals() {
  const [requests, setRequests] = useState(SEED_REQUESTS);
  const [page, setPage] = useState(1);
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [toast, setToast] = useState(null);

  const pending = useMemo(() => requests.filter((r) => r.status === "pending"), [requests]);
  const total = pending.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const paginated = pending.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Latest request for the real-time alert
  const alertRequest = useMemo(
    () => (!alertDismissed ? pending.find((r) => r.name === "Sarah Chen") || pending[0] : null),
    [pending, alertDismissed],
  );

  const showToastMsg = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleApprove = useCallback(
    (id) => {
      const req = requests.find((r) => r.id === id);
      setRequests((prev) => prev.filter((r) => r.id !== id));
      if (req?.name === alertRequest?.name) setAlertDismissed(true);
      showToastMsg(`✓ ${req?.name} approved as ${req?.role}`);
      if (page > 1 && paginated.length === 1) setPage((p) => p - 1);
    },
    [requests, alertRequest, page, paginated.length, showToastMsg],
  );

  const handleReject = useCallback(
    (id) => {
      const req = requests.find((r) => r.id === id);
      setRequests((prev) => prev.filter((r) => r.id !== id));
      if (req?.name === alertRequest?.name) setAlertDismissed(true);
      showToastMsg(`✗ ${req?.name} rejected`, "error");
      if (page > 1 && paginated.length === 1) setPage((p) => p - 1);
    },
    [requests, alertRequest, page, paginated.length, showToastMsg],
  );

  const handleExport = () => {
    const csv = [
      ["Name", "Email", "Institute", "Location", "Role", "Requested"],
      ...pending.map((r) => [r.name, r.email, r.institute, r.location, r.role, r.requestedAt]),
    ]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pending_approvals.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen bg-[#f5f7f6] p-6 sm:p-8">

      {/* ── Toast ── */}
      {toast && (
        <div
          className={`fixed right-6 top-6 z-50 animate-fade-up rounded-xl px-5 py-3.5 text-sm font-semibold text-white shadow-xl ${
            toast.type === "error" ? "bg-red-500" : "bg-green-600"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* ── Page Header ── */}
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-green-700">
          Approvals
        </p>
        <h1 className="mt-1 text-4xl font-black tracking-tight text-gray-900">
          Admin Requests
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {total > 0
            ? `${total} pending request${total !== 1 ? "s" : ""} require your immediate attention`
            : "All requests have been reviewed — you're all caught up!"}
        </p>
      </header>

      {/* ── Content Grid ── */}
      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_300px] lg:grid-cols-[260px_minmax(0,1fr)]">

        {/* ── Left: Stats ── */}
        <div className="flex min-w-0 flex-col gap-5">

          {/* Total Pending */}
          <Card className="p-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Total Pending
            </p>
            <h2 className="mt-3 text-5xl font-black tracking-tight text-gray-900">
              {String(total).padStart(2, "0")}
            </h2>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-green-600">
              <TrendingUp size={12} />
              +2 since yesterday
            </div>
          </Card>

          {/* Success Rate */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-green-600 to-emerald-700 p-6 border-none ring-0 shadow-lg">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
            <div className="absolute -bottom-6 -left-2 h-20 w-20 rounded-full bg-white/10" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-green-100">
              Success Rate
            </p>
            <div className="relative mt-4 flex items-end gap-3">
              <h2 className="text-5xl font-black tracking-tight text-white">92%</h2>
              <BadgeCheck size={28} className="mb-1 text-green-200" strokeWidth={1.5} />
            </div>
            <p className="mt-2 text-xs text-green-100">Approved this month</p>
          </Card>

          {/* Quick Stats */}
          <Card className="p-5">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
              Quick Stats
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Approved today</span>
                <span className="font-bold text-green-600">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rejected today</span>
                <span className="font-bold text-red-500">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg response</span>
                <span className="font-bold text-gray-800">1.4h</span>
              </div>
            </div>
          </Card>
        </div>

        {/* ── Center: Requests Table ── */}
        <Card className="min-w-0 overflow-hidden p-0">
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              {/* Table header row */}
              <div className="border-b border-gray-100 px-6 py-5">
                <div className="hidden grid-cols-[2fr_1.6fr_0.9fr_1fr] gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 sm:grid">
                  <span>Name &amp; Email</span>
                  <span>Institute</span>
                  <span>Status</span>
                  <span>Actions</span>
                </div>
              </div>

          {/* Rows */}
          {paginated.length > 0 ? (
            <div>
              {paginated.map((req) => (
                <RequestRow
                  key={req.id}
                  request={req}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                <UserCheck size={28} className="text-green-600" />
              </div>
              <p className="text-base font-bold text-gray-800">All caught up!</p>
              <p className="text-sm text-gray-400">No pending admin requests at this time.</p>
            </div>
          )}

              {/* Pagination */}
              {total > 0 && (
                <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
                  <p className="text-xs text-gray-400">
                    Showing{" "}
                    <span className="font-semibold text-gray-700">
                      {Math.min((page - 1) * PAGE_SIZE + 1, total)}–{Math.min(page * PAGE_SIZE, total)}
                    </span>{" "}
                    of <span className="font-semibold text-gray-700">{total}</span> entries
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        type="button"
                        onClick={() => setPage(i + 1)}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition ${
                          page === i + 1
                            ? "bg-green-600 text-white shadow-sm"
                            : "border border-gray-200 text-gray-500 hover:border-green-300 hover:bg-green-50 hover:text-green-700"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* ── Right: Real-time Alert ── */}
        <div className="flex min-w-0 flex-col gap-5 lg:col-span-2 xl:col-span-1">
          <RealTimeAlert
            request={alertRequest}
            onApprove={handleApprove}
            onReject={handleReject}
            onDismiss={() => setAlertDismissed(true)}
          />

          {!alertRequest && (
            <Card className="flex flex-col items-center justify-center gap-3 py-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                <Bell size={22} className="text-green-500" />
              </div>
              <p className="text-sm font-bold text-gray-700">No live alerts</p>
              <p className="text-xs text-gray-400">You'll be notified when new requests arrive.</p>
            </Card>
          )}

          {/* How it works info card */}
          <Card className="p-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
              How Approvals Work
            </p>
            <div className="space-y-3">
              {[
                { step: "1", text: "Institute applies for an admin account" },
                { step: "2", text: "System validates the institute credentials" },
                { step: "3", text: "Super admin reviews and approves or rejects" },
                { step: "4", text: "Admin receives access and onboarding email" },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-[10px] font-black text-green-700">
                    {step}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* ── Floating Export Button ── */}
      <button
        type="button"
        onClick={handleExport}
        className="fixed bottom-8 right-8 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white shadow-lg shadow-green-600/30 transition duration-200 hover:bg-green-700 hover:scale-105 active:scale-95"
        aria-label="Export pending approvals as CSV"
        title="Export as CSV"
      >
        <Download size={18} />
      </button>
    </div>
  );
}
