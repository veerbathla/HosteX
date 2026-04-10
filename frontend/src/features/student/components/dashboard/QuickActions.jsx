import { CreditCard, HelpCircle, Key, Utensils } from "lucide-react";
import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";

export default function QuickActions() {
  const actions = [
    { name: "Fees", icon: <CreditCard size={18} /> },
    { name: "Mess", icon: <Utensils size={18} /> },
    { name: "E-Key", icon: <Key size={18} /> },
    { name: "Help", icon: <HelpCircle size={18} /> },
  ];

  return (
    <Card className="p-5">
      <p className="mb-4 text-xs text-gray-400">QUICK UTILITIES</p>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((item) => (
          <Button
            key={item.name}
            variant="secondary"
            className="flex-col gap-2 rounded-xl bg-gray-100 p-4 hover:scale-[1.05] hover:bg-green-50 hover:text-green-600"
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
}
