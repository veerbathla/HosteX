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
      className={`bg-white p-5 rounded-xl border-l-4 ${borderColor}
      shadow-[0_4px_20px_rgba(0,0,0,0.05)]
      hover:shadow-[0_6px_25px_rgba(0,0,0,0.08)]
      hover:scale-[1.02] transition-all duration-300`}
    >
      {/* Top Row */}
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-400 tracking-wide">{title}</p>

        <div className="text-gray-400">{icon}</div>
      </div>

      {/* Value */}
      <h2 className="text-xl font-semibold mt-3 text-gray-800">
        {value}
      </h2>

      {/* Subtitle */}
      <p className={`text-sm mt-1 ${textColor}`}>
        {subtitle}
      </p>
    </div>
  );
}