import Button from "../ui/Button";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function Hero() {
  return (
    <div className="bg-[#e6efe9] px-16 py-20 flex items-center justify-between">
      
      {/* LEFT */}
      <div className="max-w-xl">
        
        <h1 className="text-5xl font-bold leading-tight text-gray-900">
          Smart Hostel <br />
          <span className="text-green-600">Management</span> <br />
          Made Simple
        </h1>

        <p className="mt-6 text-gray-600 text-lg">
          Manage rooms, student complaints, and campus communications
          efficiently with our modern, all-in-one digital sanctuary.
        </p>

        <div className="mt-8 flex gap-4">
          <Button  >Get Started</Button>
          <Button variant="secondary">Login</Button>
        </div>

      </div>

      {/* RIGHT */}
      <Card className="p-6 rounded-2xl shadow-lg w-[420px]">
        
        {/* TOP SECTION */}
        <div className="flex gap-4">
          
          {/* CHART */}
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-4">
              Campus Occupancy
            </p>

            <div className="flex items-end gap-3 h-32">
              <div className="w-6 bg-green-300 h-20 rounded"></div>
              <div className="w-6 bg-green-500 h-28 rounded"></div>
              <div className="w-6 bg-green-400 h-24 rounded"></div>
              <div className="w-6 bg-green-700 h-32 rounded"></div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4 w-[140px]">
            
            {/* TOTAL ROOMS */}
            <div className="bg-green-600 text-white rounded-xl p-4">
              <p className="text-xs">TOTAL ROOMS</p>
              <h2 className="text-2xl font-bold">128</h2>
            </div>

            {/* STATUS */}
            <div className="bg-gray-100 rounded-xl p-4">
              <p className="text-xs text-gray-500">STATUS</p>
              <p className="text-sm font-medium text-green-600">
                ● 92% Filled
              </p>
            </div>

          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-6 bg-gray-50 rounded-xl p-4 flex justify-between items-center">
          
          <div>
            <p className="text-xs text-gray-500">
              ACTIVE COMPLAINTS
            </p>
            <h2 className="font-bold text-lg">
              12{" "}
              <span className="text-red-500 text-sm">
                (-4 this week)
              </span>
            </h2>
          </div>

          <div className="flex gap-2">
            <Badge text="JD" />
            <Badge text="AS" />
            <Badge text="+3" type="neutral" />
          </div>

        </div>

      </Card>

    </div>
  );
}