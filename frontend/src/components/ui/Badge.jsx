export default function Badge({ text, children, type = "success", className = "" }) {
  const styles = {
    success: "bg-green-100 text-green-600",
    error: "bg-red-100 text-red-600",
    neutral: "bg-gray-100 text-gray-600",
    warning: "bg-amber-100 text-amber-700",
    info: "bg-blue-100 text-blue-700",
    dark: "bg-emerald-800 text-white",
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded-full font-medium ${
        styles[type] || styles.neutral
      } ${className}`}
    >
      {children || text}
    </span>
  );
}
