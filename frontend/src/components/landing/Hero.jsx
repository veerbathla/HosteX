export default function Hero() {
  return (
    <div className="flex justify-between items-center px-16 py-20">
      
      {/* LEFT */}
      <div className="max-w-xl">
        
        <h1 className="text-5xl font-bold leading-tight text-gray-900">
          Smart Hostel <br />
          <span className="text-green-600">Management</span> <br />
          Made Simple
        </h1>

        <p className="mt-6 text-gray-600 text-lg">
          Manage rooms, complaints, and campus communication
          with a modern all-in-one system.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700">
            Get Started
          </button>

          <button className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300">
            Login
          </button>
        </div>
      </div>

      {/* RIGHT CARD */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[380px]">
        <h3 className="font-semibold text-gray-700 mb-4">
          Campus Occupancy
        </h3>

        <div className="flex items-end gap-3 h-32">
          <div className="bg-green-300 w-6 h-16 rounded"></div>
          <div className="bg-green-500 w-6 h-24 rounded"></div>
          <div className="bg-green-600 w-6 h-20 rounded"></div>
          <div className="bg-green-700 w-6 h-28 rounded"></div>
        </div>

        <div className="mt-4 flex justify-between text-sm">
          <span>Total Rooms</span>
          <span className="font-bold text-green-600">128</span>
        </div>
      </div>

    </div>
  );
}