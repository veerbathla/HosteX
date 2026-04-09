import Card from "../../../../components/ui/Card";

const content = {
  smart: {
    className: "bg-emerald-950 text-white border-emerald-900 shadow-lg",
    title: "Smart Routing Active",
    text: "Complaints are automatically grouped by issue type and priority for faster resolution.",
  },
  alert: {
    className: "bg-red-50 text-red-900 border-red-100 shadow-sm",
    title: "Critical Awareness",
    text: "High-priority complaints are highlighted with a distinct red accent to ensure zero-miss response.",
  },
};

const SmartCard = ({ type }) => {
  const item = content[type] || content.smart;

  return (
    <Card className={`${item.className} p-6`}>
      <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
      <p className={`mt-3 text-sm leading-relaxed ${type === 'smart' ? 'text-emerald-100' : 'text-red-800'}`}>
        {item.text}
      </p>
    </Card>
  );
};

export default SmartCard;
