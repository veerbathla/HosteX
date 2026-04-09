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

export default function ComplaintChart() {
  const data = [
    { day: "Mon", complaints: 4 },
    { day: "Tue", complaints: 7 },
    { day: "Wed", complaints: 5 },
    { day: "Thu", complaints: 9 },
    { day: "Fri", complaints: 6 },
    { day: "Sat", complaints: 3 },
    { day: "Sun", complaints: 4 },
  ];

  return (
    <Card className="h-full overflow-hidden border-green-100 bg-gradient-to-br from-green-50 via-white to-white p-0">
      <div className="flex items-start justify-between border-b border-green-100/70 px-6 py-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
            Resolution Analytics
          </p>
          <h2 className="mt-1 text-xl font-semibold text-gray-900">
            Complaint Trends
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Daily complaint volume for the current week.
          </p>
        </div>
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
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
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ stroke: "#86efac", strokeWidth: 1 }}
              contentStyle={{
                border: "1px solid #bbf7d0",
                borderRadius: "12px",
                boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
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
