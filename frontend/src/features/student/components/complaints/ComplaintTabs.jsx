import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";

export default function ComplaintTabs({ active, setActive }) {
  const tabs = ["all", "new", "in-progress", "resolved"];

  return (
    <Card className="flex flex-wrap gap-3 p-3">
      {tabs.map((tab) => (
        <Button
          key={tab}
          variant={active === tab ? "primary" : "ghost"}
          onClick={() => setActive(tab)}
          className="capitalize"
        >
          {tab.replace("-", " ")}
        </Button>
      ))}
    </Card>
  );
}
