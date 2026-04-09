export default function Card({ children, className = "" }) {
  return (
    <div
      className={`animate-fade-up rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-md ${className}`}
    >
      {children}
    </div>
  );
}
