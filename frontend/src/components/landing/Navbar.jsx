export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-12 py-4 bg-[#e6efe9] sticky top-0 z-50">
      
      {/* LEFT */}
      <div className="flex items-center gap-2 cursor-pointer">
        {/* <div className="w-6 h-6 bg-gradient-to-r from-[#22c55e] to-[#15803d] rounded-sm"></div> */}
        <span className="text-lg font-semibold text-gray-800">
          <a href="#">HosteX</a>
        </span>
      </div>

      {/* CENTER */}
      <div className="flex items-center gap-8 text-sm font-medium">
        
        <a
          href="#features"
          className="text-green-600"
        >
          Features
        </a>

        <a
          href="#process"
          className="text-gray-500 hover:text-gray-700 transition"
        >
          About Us
        </a>

        <a
          href="#cta"
          className="text-gray-500 hover:text-gray-700 transition"
        >
          Pricing
        </a>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        
        <button className="text-gray-600 text-sm font-medium hover:text-gray-800 transition">
          Login
        </button>

        <button className="bg-gradient-to-r from-[#22c55e] to-[#15803d] text-white text-sm font-medium px-5 py-2 rounded-lg shadow hover:opacity-90 transition">
          Get Started
        </button>

      </div>

    </div>
  );
}
