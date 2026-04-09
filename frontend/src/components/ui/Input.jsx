export default function Input({ placeholder, type = "text", className = "", ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full border border-gray-200 bg-white rounded-lg px-4 py-3 text-gray-800 outline-none transition duration-200 placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500 ${className}`}
      {...props}
    />
  );
}
