export default function Badge({ text, type = "success" }) {
  const styles = {
    success: "bg-green-100 text-green-600",
    error: "bg-red-100 text-red-600",
    neutral: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded-full font-medium ${styles[type]}`}
    >
      {text}
    </span>
  );
}