import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";

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
        <Button
          variant="ghost"
          onClick={() => navigate("/login")}
          className="text-gray-600 hover:text-gray-800"
        >
          Login
        </Button>

        
        <Button
          onClick={() => navigate("/signup")}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
