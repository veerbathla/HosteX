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

import { useMemo, useState, useEffect } from "react";
import API from "@/services/apiClient";
import Card from "@/components/ui/Card";

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
export default function Dashboard() {

    // ✅ NEW STATE
    const [institutes, setInstitutes] = useState([]);
    const [hostels, setHostels] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ FETCH DATA
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API.get("/hostel"); // 🔥 backend route
                const data = res.data.data;

                // 👉 hostel data use as-is
                setHostels(data);

                // 👉 convert hostel → institute (temporary mapping to keep UI SAME)
                const mappedInstitutes = data.map((h, i) => ({
                    id: h._id,
                    initials: h.name?.slice(0, 2).toUpperCase(),
                    color: "bg-emerald-100 text-emerald-700",
                    name: h.name,
                    location: h.location,
                    hostels: h.totalRooms || 0,
                    admin: "Admin",
                    status: "active",
                }));

                setInstitutes(mappedInstitutes);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // ✅ LOADING (no UI change)


    const totals = useMemo(
        () => ({
            institutes: institutes.length,
            hostels: hostels.length * 37 + 12, // same logic
            admins: 512,
            activeAdmins: 489,
        }),
        [institutes, hostels]
    );
    if (loading) return <div className="p-5">Loading...</div>;
    return (
        <div className="min-h-screen bg-[#f5f7f6] p-5 sm:p-7">

            {/* SAME UI BELOW — NO CHANGE */}

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
                <StatCard icon={<Building2 size={22} />} label="Total Institutes" value={totals.institutes} sub="↑ +4 this month" trend="Growing network of academic partners" />
                <StatCard icon={<Globe size={22} />} label="Total Hostels" value={totals.hostels} sub="Global coverage" subColor="text-sky-600" trend="Across 24 countries" />
                <StatCard icon={<Users size={22} />} label="Total Admins" value="512" sub="↑ System wide" trend="Active management staff" />
                <StatCard icon={<Activity size={22} />} label="Active Admins" value="489" sub="● 95.5% Uptime" subColor="text-emerald-600" trend="Online now" />
            </section>

            {/* ⚠️ IMPORTANT CHANGE HERE */}
            <section className="mt-8">
                <Card className="overflow-hidden p-0">
                    <div className="divide-y divide-gray-50">
                        {institutes.map((inst) => (
                            <div key={inst.id} className="grid items-center gap-4 px-6 py-4">
                                <p>{inst.name}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </section>

            {/* ⚠️ IMPORTANT CHANGE HERE */}
            <section className="mt-8">
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {hostels.map((hostel) => (
                        <div key={hostel._id}>
                            <h3>{hostel.name}</h3>
                            <p>{hostel.totalRooms}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}