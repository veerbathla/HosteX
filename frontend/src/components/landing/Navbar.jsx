export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-12 py-4 bg-[#e6efe9]">
      
      {/* LEFT: Logo */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-green-600 rounded-sm"></div>
        <span className="font-semibold text-gray-800 text-lg">
          Digital Campus
        </span>
      </div>

      {/* CENTER: Links */}
      <div className="flex items-center gap-8 text-sm font-medium">
        <span className="text-green-600 cursor-pointer">Features</span>
        <span className="text-gray-500 hover:text-gray-700 cursor-pointer">
          Pricing
        </span>
        <span className="text-gray-500 hover:text-gray-700 cursor-pointer">
          About Us
        </span>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-6">
        
        <button className="text-gray-600 text-sm font-medium hover:text-gray-800">
          Login
        </button>

        <button className="bg-green-600 text-white text-sm font-medium px-5 py-2 rounded-lg shadow hover:bg-green-700 transition">
          Get Started
        </button>

      </div>
    </div>
  );
}