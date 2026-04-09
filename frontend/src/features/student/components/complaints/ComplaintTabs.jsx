import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";

export default function ComplaintTabs({ active, setActive }) {
  const tabs = ["all", "pending", "progress", "resolved"];

  return (
    <Card className="flex gap-4 p-3">
      {tabs.map((tab) => (
        <Button
          key={tab}
          variant={active === tab ? "primary" : "ghost"}
          onClick={() => setActive(tab)}
          className="capitalize"
        >
          {tab}
        </Button>
      ))}
    </Card>
  );
}
