import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ComplaintChart() {

  // ✅ Dummy data (graph ke liye)
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
    <div className="bg-white p-5 rounded-2xl shadow-sm h-full">
      
      <h2 className="font-semibold text-gray-800 mb-4">
        Complaint Trends
      </h2>

      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="complaints"
              stroke="#16a34a"
              strokeWidth={2}
            />
          </LineChart>

        </ResponsiveContainer>
      </div>

    </div>
  );
}