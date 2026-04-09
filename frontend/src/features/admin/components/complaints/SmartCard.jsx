import Card from "../../../../components/ui/Card";

const content = {
  smart: {
    className: "bg-emerald-900 text-white border-emerald-900",
    title: "Smart Routing Active",
    text: "Complaints are automatically grouped by issue type and priority.",
  },
  alert: {
    className: "bg-red-50 text-red-900 border-red-100",
    title: "Critical Overdue",
    text: "High-priority complaints are highlighted with a red accent.",
  },
};

const SmartCard = ({ type }) => {
  const item = content[type] || content.smart;

  return (
    <Card className={item.className}>
      <h3 className="text-lg font-semibold">{item.title}</h3>
      <p className="mt-2 text-sm opacity-80">{item.text}</p>
    </Card>
  );
};

export default SmartCard;
