export default function LunchCard() {
  return (
    <div className="bg-white p-5 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <p className="text-xs text-gray-400">LUNCH MENU TODAY</p>

      <h3 className="font-semibold mt-2">Mediterranean Salad</h3>
      <p className="text-sm text-gray-500">Served from 12:30 PM</p>

      <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
        <div className="w-2/3 h-full bg-green-600 rounded-full"></div>
      </div>

      <p className="text-xs text-gray-500 mt-2">Serving ends in 45 mins</p>
    </div>
  );
}