import {
  CartesianGrid,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "../../../../components/ui/Card";

const defaultData = [
    { day: "Mon", complaints: 0 },
    { day: "Tue", complaints: 0 },
    { day: "Wed", complaints: 0 },
    { day: "Thu", complaints: 0 },
    { day: "Fri", complaints: 0 },
    { day: "Sat", complaints: 0 },
    { day: "Sun", complaints: 0 },
  ];

export default function ComplaintChart({ data = defaultData }) {
  return (
    <Card className="h-full overflow-hidden border-green-100 bg-gradient-to-br from-green-50 via-white to-white p-0">
      <div className="flex items-start justify-between border-b border-green-100 px-6 py-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-700">
            Resolution Analytics
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
            Complaint Trends
          </h2>
          <p className="mt-2 text-sm font-medium text-gray-600">
            Weekly analysis of incoming and resolved hostel issues.
          </p>
        </div>
        <span className="rounded-xl border border-green-200 bg-green-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-green-700 shadow-sm">
          Live
        </span>
      </div>

      <div className="h-[270px] px-4 py-5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 12, right: 18, left: -12, bottom: 0 }}>
            <CartesianGrid stroke="#dcfce7" strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#4b5563", fontSize: 12, fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#4b5563", fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip
              cursor={{ stroke: "#86efac", strokeWidth: 1 }}
              contentStyle={{
                border: "1px solid #bbf7d0",
                borderRadius: "12px",
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
                fontSize: "12px",
                fontWeight: "600",
                color: "#111827",
              }}
            />
            <Line
              type="monotone"
              dataKey="complaints"
              stroke="#16a34a"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: "#ffffff", stroke: "#16a34a" }}
              activeDot={{ r: 6, fill: "#16a34a", stroke: "#ffffff", strokeWidth: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
