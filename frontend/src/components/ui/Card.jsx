export default function Card({ children, className = "" }) {
  return (
    <div
      className={`animate-fade-up rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:border-green-100 ${className}`}
    >

      {children}
    </div>
  );
}
