export default function ComplaintTabs({ active, setActive }) {
  const tabs = ["all", "pending", "progress", "resolved"];

  return (
    <div className="flex gap-4 bg-white p-3 rounded-xl shadow">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-4 py-2 rounded-lg text-sm capitalize transition ${
            active === tab
              ? "bg-green-600 text-white"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}