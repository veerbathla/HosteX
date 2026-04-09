export default function Input({ placeholder, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
    />
  );
}