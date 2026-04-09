import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-12 py-4 bg-[#e6efe9] sticky top-0 z-50">
      {/* LEFT */}
      <Link to="/" className="text-lg font-semibold text-gray-800">
        HosteX
      </Link>

      {/* CENTER */}
      <div className="flex items-center gap-8 text-sm font-medium">
        <a href="#features" className="text-green-600">
          Features
        </a>
        <a href="#process" className="text-gray-500 hover:text-gray-700">
          About Us
        </a>
        <a href="#cta" className="text-gray-500 hover:text-gray-700">
          Pricing
        </a>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        {/* LOGIN */}
        <button
          onClick={() => navigate("/login")}
          className="text-gray-600 text-sm font-medium hover:text-gray-800"
        >
          Login
        </button>

        
        <button
          onClick={() => navigate("/signup")}
          className="bg-gradient-to-r from-[#22c55e] to-[#15803d] text-white text-sm font-medium px-5 py-2 rounded-lg shadow hover:opacity-90"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
