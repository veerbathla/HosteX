export default function Input({ placeholder, type = "text", className = "", ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 ${className}`}
      {...props}
    />
  );
}
