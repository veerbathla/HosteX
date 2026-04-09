import { BedDouble, Building2, Fan, Table, Wifi } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";

export default function MyRoom() {
  const navigate = useNavigate();

  const facilities = [
    { icon: <Wifi size={20} />, title: "High-Speed WiFi", status: "ACTIVE" },
    { icon: <BedDouble size={20} />, title: "Standard Bed", status: "SINGLE" },
    { icon: <Fan size={20} />, title: "Ceiling Fan", status: "FUNCTIONAL" },
    { icon: <Table size={20} />, title: "Study Table", status: "WOOD FINISH" },
    { icon: <Building2 size={20} />, title: "Private Balcony", status: "GARDEN VIEW" },
  ];

  return (
    <div className="min-h-screen space-y-6 bg-[#f5f7f6] p-8">
      <div>
        <p className="text-xs font-medium tracking-wide text-green-600">
          PERSONAL SANCTUARY
        </p>
        <h1 className="mt-1 text-3xl font-semibold">My Room</h1>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2 flex gap-6 p-6">
          <div className="flex h-48 w-1/2 items-end rounded-2xl bg-gray-200 p-3">
            <Badge type="success">Occupied</Badge>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs text-gray-400">ASSIGNED UNIT</p>
              <h2 className="mt-1 text-3xl font-bold">204-B</h2>

              <div className="mt-4 flex gap-10 text-sm">
                <div>
                  <p className="text-xs text-gray-400">BUILDING BLOCK</p>
                  <p className="font-medium">Main Wing</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">FLOOR LEVEL</p>
                  <p className="font-medium">2nd Floor</p>
                </div>
              </div>
            </div>

            <Button onClick={() => navigate("/student/application")}>
              Request Room Change
            </Button>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Roommates</h3>
            <Badge type="neutral">2 Slots Filled</Badge>
          </div>

          <div className="mt-4 space-y-4">
            {[
              { name: "John Doe", course: "Computer Science - Year 2" },
              { name: "Alex Smith", course: "Mechanical Eng - Year 2" },
            ].map((mate) => (
              <div key={mate.name} className="rounded-xl bg-gray-50 p-3">
                <p className="font-medium">{mate.name}</p>
                <p className="text-xs text-gray-500">{mate.course}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-gray-400">
            "Living together is the first step toward lifelong friendship."
          </p>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Room Facilities</h2>
            <p className="text-sm text-gray-500">
              Included amenities for your comfort
            </p>
          </div>

          <Button
            variant="ghost"
            onClick={() => navigate("/student/complaints")}
            className="text-green-600"
          >
            Report Issue
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-5 gap-6">
          {facilities.map((item) => (
            <Card
              key={item.title}
              className="p-5 text-center transition hover:scale-[1.03]"
            >
              <div className="inline-block rounded-full bg-green-50 p-3 text-green-600">
                {item.icon}
              </div>
              <p className="mt-3 font-medium">{item.title}</p>
              <p className="mt-1 text-xs text-green-600">{item.status}</p>
            </Card>
          ))}
        </div>
      </div>

      <Card className="flex items-center justify-between p-6">
        <div>
          <p className="font-medium">Something not working?</p>
          <p className="text-sm text-gray-500">
            Open a quick ticket for repairs or cleaning.
          </p>
        </div>

        <Button onClick={() => navigate("/student/application")}>Create Ticket</Button>
      </Card>
    </div>
  );
}
