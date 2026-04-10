export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  type,
}) {
  const borderColor =
    type === "warning"
      ? "border-l-red-400"
      : type === "success"
      ? "border-l-green-500"
      : "border-l-gray-200";

  const textColor =
    type === "warning"
      ? "text-red-500"
      : type === "success"
      ? "text-green-600"
      : "text-gray-500";

  return (
    <div
      className={`rounded-xl border border-gray-100 border-l-4 ${borderColor} bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md`}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-600">
          {title}
        </p>
        <div className="text-gray-400">{icon}</div>
      </div>

      <h2 className="mt-4 text-2xl font-bold text-gray-900">{value}</h2>

      <p className={`mt-2 text-sm font-medium ${textColor}`}>{subtitle}</p>
    </div>
  );
}