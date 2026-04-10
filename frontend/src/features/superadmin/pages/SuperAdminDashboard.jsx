import {
  Building2,
  Users,
  ShieldCheck,
  Activity,
  TrendingUp,
  Eye,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Server,
  Globe,
} from "lucide-react";
import { useMemo } from "react";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";

/* ── Seed data ─────────────────────────────────────────────── */
const institutes = [
  {
    id: 1,
    initials: "ST",
    color: "bg-emerald-100 text-emerald-700",
    name: "Stanford Technology Inst.",
    location: "Palo Alto, CA",
    hostels: 12,
    admin: "Dr. Helena Vance",
    status: "active",
  },
  {
    id: 2,
    initials: "MU",
    color: "bg-sky-100 text-sky-700",
    name: "Metropolitan University",
    location: "London, UK",
    hostels: 8,
    admin: "Marcus Aurelius",
    status: "pending",
  },
  {
    id: 3,
    initials: "AI",
    color: "bg-violet-100 text-violet-700",
    name: "Asiatic Institute of Arts",
    location: "Singapore",
    hostels: 24,
    admin: "Chen Wei",
    status: "active",
  },
  {
    id: 4,
    initials: "GU",
    color: "bg-amber-100 text-amber-700",
    name: "Global University Hub",
    location: "Dubai, UAE",
    hostels: 6,
    admin: "Amara Ndidi",
    status: "active",
  },
  {
    id: 5,
    initials: "NI",
    color: "bg-rose-100 text-rose-700",
    name: "Nordic Innovation School",
    location: "Oslo, Norway",
    hostels: 3,
    admin: "Erik Larsson",
    status: "inactive",
  },
];

const hostels = [
  {
    id: 1,
    name: "Stanford West Wing",
    institute: "Stanford Technology Inst.",
    totalRooms: 450,
    occupancy: 92,
    available: 38,
    tag: "TOP RATED",
    tagColor: "bg-green-600",
    gradient: "from-emerald-600 to-teal-700",
  },
  {
    id: 2,
    name: "Metro Central Hub",
    institute: "Metropolitan University",
    totalRooms: 320,
    occupancy: 45,
    available: 176,
    tag: "NEW PROPERTY",
    tagColor: "bg-sky-500",
    gradient: "from-sky-600 to-blue-700",
  },
  {
    id: 3,
    name: "Asiatic Grand Plaza",
    institute: "Asiatic Institute of Arts",
    totalRooms: 780,
    occupancy: 88,
    available: 15,
    tag: null,
    gradient: "from-violet-600 to-purple-700",
  },
];

/* ── Helpers ────────────────────────────────────────────────── */
function StatusBadge({ status }) {
  if (status === "active")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-green-700 ring-1 ring-green-200">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> ACTIVE
      </span>
    );
  if (status === "pending")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700 ring-1 ring-amber-200">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> PENDING
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-red-600 ring-1 ring-red-200">
      <span className="h-1.5 w-1.5 rounded-full bg-red-400" /> INACTIVE
    </span>
  );
}

function StatCard({ icon, label, value, sub, subColor = "text-green-600", trend }) {
  return (
    <Card className="relative overflow-hidden p-6 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold uppercase tracking-widest text-gray-500">{label}</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-gray-900">{value}</h2>
          <p className={`mt-2 truncate text-xs font-semibold ${subColor}`}>{sub}</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-600">
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
          <TrendingUp size={12} className="shrink-0 text-green-500" />
          <span className="truncate">{trend}</span>
        </div>
      )}
    </Card>
  );
}

/* ── Main Dashboard ─────────────────────────────────────────── */
export default function SuperAdminDashboard() {
  const totals = useMemo(
    () => ({
      institutes: institutes.length,
      hostels: hostels.reduce((s) => s + 1, 0) * 37 + 12, // simulated
      admins: 512,
      activeAdmins: 489,
    }),
    [],
  );

  return (
    <div className="min-h-screen bg-[#f5f7f6] p-5 sm:p-7">

      {/* ── Header ── */}
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-green-700">
          System Control
        </p>
        <h1 className="mt-1 text-4xl font-black tracking-tight text-gray-900">
          Global Overview
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Real-time operational metrics across all institutes and hostels.
        </p>
      </header>

      {/* ── Stats Grid ── */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Building2 size={22} />}
          label="Total Institutes"
          value="42"
          sub="↑ +4 this month"
          trend="Growing network of academic partners"
        />
        <StatCard
          icon={<Globe size={22} />}
          label="Total Hostels"
          value="186"
          sub="Global coverage"
          subColor="text-sky-600"
          trend="Across 24 countries"
        />
        <StatCard
          icon={<Users size={22} />}
          label="Total Admins"
          value="512"
          sub="↑ System wide"
          trend="Active management staff"
        />
        <StatCard
          icon={<Activity size={22} />}
          label="Active Admins"
          value="489"
          sub="● 95.5% Uptime"
          subColor="text-emerald-600"
          trend="Online now"
        />
      </section>

      {/* ── Institute Usage Table ── */}
      <section className="mt-8">
        <Card className="overflow-hidden p-0">
          {/* Table header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Institute Usage</h2>
              <p className="mt-0.5 text-xs text-gray-500">
                Real-time status of academic partners
              </p>
            </div>
            <Button variant="ghost" size="sm" className="gap-1.5 text-green-700 hover:bg-green-50">
              View All Reports
              <ExternalLink size={13} />
            </Button>
          </div>

          {/* Column headers */}
          <div className="hidden grid-cols-[2fr_1.2fr_0.7fr_1.5fr_0.9fr_0.7fr] gap-4 border-b border-gray-50 bg-gray-50/60 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 lg:grid">
            <span>Institute Name</span>
            <span>Location</span>
            <span>Hostels</span>
            <span>Admin Assigned</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-50">
            {institutes.map((inst) => (
              <div
                key={inst.id}
                className="grid items-center gap-4 px-6 py-4 transition hover:bg-green-50/30 lg:grid-cols-[2fr_1.2fr_0.7fr_1.5fr_0.9fr_0.7fr]"
              >
                {/* Name */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${inst.color}`}
                  >
                    {inst.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{inst.name}</p>
                  </div>
                </div>

                {/* Location */}
                <p className="text-sm text-gray-600">{inst.location}</p>

                {/* Hostels count */}
                <p className="text-sm font-bold text-gray-900">{inst.hostels}</p>

                {/* Admin */}
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-600">
                    {inst.admin.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <p className="text-sm text-gray-700">{inst.admin}</p>
                </div>

                {/* Status */}
                <StatusBadge status={inst.status} />

                {/* Actions */}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700"
                    aria-label={`View ${inst.name}`}
                  >
                    <Eye size={14} />
                  </button>
                  {inst.status === "pending" ? (
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-amber-600 transition hover:bg-amber-100"
                      aria-label={`Approve ${inst.name}`}
                    >
                      <CheckCircle2 size={14} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                      aria-label={`Disable ${inst.name}`}
                    >
                      <XCircle size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* ── Hostel Overview Cards ── */}
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Hostel Overview</h2>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
                <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" />
                <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" />
                <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" />
              </svg>
            </button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="3" width="14" height="2" rx="1" fill="currentColor" />
                <rect x="1" y="7" width="14" height="2" rx="1" fill="currentColor" />
                <rect x="1" y="11" width="14" height="2" rx="1" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {hostels.map((hostel) => (
            <div
              key={hostel.id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Hero gradient banner */}
              <div className={`relative h-36 bg-gradient-to-br ${hostel.gradient}`}>
                {hostel.tag && (
                  <span className={`absolute left-3 top-3 rounded-lg ${hostel.tagColor} px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow`}>
                    {hostel.tag}
                  </span>
                )}
                <div className="absolute inset-0 flex items-end p-4">
                  <p className="text-xs font-medium text-white/70">{hostel.institute}</p>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <h3 className="text-base font-bold text-gray-900">{hostel.name}</h3>

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="font-semibold uppercase tracking-wider text-gray-400">
                      Total Rooms
                    </p>
                    <p className="mt-1 text-xl font-black text-gray-900">{hostel.totalRooms}</p>
                  </div>
                  <div>
                    <p className="font-semibold uppercase tracking-wider text-gray-400">
                      Occupancy
                    </p>
                    <p className="mt-1 text-xl font-black text-gray-900">{hostel.occupancy}%</p>
                  </div>
                </div>

                {/* Occupancy bar */}
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      hostel.occupancy > 80
                        ? "bg-green-500"
                        : hostel.occupancy > 50
                        ? "bg-amber-400"
                        : "bg-sky-400"
                    }`}
                    style={{ width: `${hostel.occupancy}%` }}
                  />
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    {hostel.available} Rooms Available
                  </span>
                  <button
                    type="button"
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700"
                    aria-label={`Open ${hostel.name}`}
                  >
                    <ExternalLink size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── System Status Strip ── */}
      <section className="mt-8">
        <Card className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-gray-900 to-gray-800 py-5 px-6 text-white border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500/20 text-green-400">
              <Server size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">System Status</p>
              <p className="text-xs text-gray-400">All services operational · Last checked just now</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {["API Gateway", "Auth Service", "DB Cluster", "CDN"].map((svc) => (
              <div key={svc} className="flex items-center gap-1.5 text-xs text-gray-300">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                {svc}
              </div>
            ))}
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="border border-gray-600 text-gray-300 hover:border-green-400 hover:bg-green-500/10 hover:text-green-400"
          >
            <ShieldCheck size={14} />
            Full Report
          </Button>
        </Card>
      </section>

    </div>
  );
}
