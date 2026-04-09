export default function Badge({ text, children, type = "success", className = "" }) {
  const styles = {
    success: "bg-green-100/80 text-green-800",
    error: "bg-red-100/80 text-red-800",
    neutral: "bg-gray-100 text-gray-700",
    warning: "bg-amber-100/80 text-amber-800",
    info: "bg-blue-100/80 text-blue-800",
    dark: "bg-emerald-900 text-white",
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
