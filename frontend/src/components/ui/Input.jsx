export default function Input({ placeholder, type = "text", className = "", ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full border border-gray-300 bg-white rounded-lg px-4 py-3 text-gray-900 outline-none transition duration-200 placeholder:text-gray-500 focus:border-green-600 focus:ring-2 focus:ring-green-600/20 ${className}`}
      {...props}
    />
  );
}
