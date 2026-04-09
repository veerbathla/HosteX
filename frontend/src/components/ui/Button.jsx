export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
}) {
  const base =
    "rounded-lg font-medium transition flex items-center justify-center";

  const variants = {
    primary: "bg-gradient-to-r from-[#22c55e] to-[#15803d] text-white hover:bg-green-700 shadow",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-5 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {children}
    </button>
  );
}