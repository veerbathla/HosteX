import { CreditCard, Utensils, Key, HelpCircle } from "lucide-react";

export default function QuickActions() {
  const actions = [
    { name: "Fees", icon: <CreditCard size={18} /> },
    { name: "Mess", icon: <Utensils size={18} /> },
    { name: "E-Key", icon: <Key size={18} /> },
    { name: "Help", icon: <HelpCircle size={18} /> },
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <p className="text-xs text-gray-400 mb-4">QUICK UTILITIES</p>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((item, i) => (
          <button
            key={i}
            className="flex flex-col items-center justify-center gap-2 bg-gray-100 p-4 rounded-xl hover:bg-green-50 hover:text-green-600 hover:scale-[1.05] transition-all"
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}