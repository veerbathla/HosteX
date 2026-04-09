import { Wifi, BedDouble, Fan, Table, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyRoom() {
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-[#f5f7f6] min-h-screen space-y-6">

      {/* Header */}
      <div>
        <p className="text-xs text-green-600 font-medium tracking-wide">
          PERSONAL SANCTUARY
        </p>
        <h1 className="text-3xl font-semibold mt-1">My Room</h1>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-3 gap-6">

        {/* LEFT — Room Card */}
        <div className="col-span-2 bg-white p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex gap-6">

          {/* Image Placeholder */}
          <div className="w-1/2 h-48 bg-gray-200 rounded-2xl flex items-end p-3">
            <span className="text-xs text-green-600 flex items-center gap-1">
              ● OCCUPIED
            </span>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs text-gray-400">ASSIGNED UNIT</p>
              <h2 className="text-3xl font-bold mt-1">204-B</h2>

              <div className="flex gap-10 mt-4 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">BUILDING BLOCK</p>
                  <p className="font-medium">Main Wing</p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs">FLOOR LEVEL</p>
                  <p className="font-medium">2nd Floor</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/student/application")}
              className="mt-4 bg-green-600 text-white px-5 py-2.5 rounded-xl hover:scale-105 transition"
            >
              Request Room Change
            </button>
          </div>
        </div>

        {/* RIGHT — Roommates */}
        <div className="bg-white p-5 rounded-3xl shadow">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Roommates</h3>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
              2 Slots Filled
            </span>
          </div>

          <div className="mt-4 space-y-4">
            {[
              { name: "John Doe", course: "Computer Science • Year 2" },
              { name: "Alex Smith", course: "Mechanical Eng • Year 2" },
            ].map((mate, i) => (
              <div
                key={i}
                className="bg-gray-50 p-3 rounded-xl"
              >
                <p className="font-medium">{mate.name}</p>
                <p className="text-xs text-gray-500">
                  {mate.course}
                </p>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-4">
            "Living together is the first step toward lifelong friendship."
          </p>
        </div>
      </div>

      {/* Facilities */}
      <div>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Room Facilities</h2>
            <p className="text-sm text-gray-500">
              Included amenities for your comfort
            </p>
          </div>

          <button
            onClick={() => navigate("/student/complaints")}
            className="text-green-600 text-sm font-medium"
          >
            Report Issue
          </button>
        </div>

        <div className="grid grid-cols-5 gap-6 mt-4">

          {[
            {
              icon: <Wifi size={20} />,
              title: "High-Speed WiFi",
              status: "ACTIVE",
            },
            {
              icon: <BedDouble size={20} />,
              title: "Standard Bed",
              status: "SINGLE",
            },
            {
              icon: <Fan size={20} />,
              title: "Ceiling Fan",
              status: "FUNCTIONAL",
            },
            {
              icon: <Table size={20} />,
              title: "Study Table",
              status: "WOOD FINISH",
            },
            {
              icon: <Building2 size={20} />,
              title: "Private Balcony",
              status: "GARDEN VIEW",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl text-center shadow hover:scale-[1.03] transition"
            >
              <div className="bg-green-50 p-3 inline-block rounded-full text-green-600">
                {item.icon}
              </div>

              <p className="font-medium mt-3">{item.title}</p>
              <p className="text-xs text-green-600 mt-1">
                {item.status}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-white p-6 rounded-2xl flex justify-between items-center shadow">
        <div>
          <p className="font-medium">Something not working?</p>
          <p className="text-sm text-gray-500">
            Open a quick ticket for repairs or cleaning.
          </p>
        </div>

        <button
          onClick={() => navigate("/student/application")}
          className="bg-green-600 text-white px-5 py-2.5 rounded-xl hover:scale-105 transition"
        >
          Create Ticket
        </button>
      </div>

    </div>
  );
}