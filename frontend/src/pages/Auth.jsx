import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Auth() {
  const location = useLocation();

  const [mode, setMode] = useState(
    location.pathname === "/signup" ? "signup" : "login",
  );
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Enter all fields");
      return;
    }

    const user = {
      email,
      role,
      isLoggedIn: true,
    };

    localStorage.setItem("user", JSON.stringify(user));

    // Redirect to the dashboard for the selected role.
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e9f0ec]">
      <div className="w-[900px] h-[550px] bg-white rounded-2xl shadow-lg flex overflow-hidden">
        {/* LEFT */}
        <div className="w-1/2 bg-gradient-to-br from-green-500 to-green-700 text-white p-10 flex flex-col justify-center">
          <h2 className="text-lg font-semibold">HosteX</h2>

          <h1 className="text-3xl font-bold mt-6">
            {mode === "login" ? "Welcome Back" : "Create your account"}
          </h1>

          <p className="text-sm mt-4">
            {mode === "login"
              ? "Login to continue managing your hostel"
              : "Join the smart hostel management system"}
          </p>
        </div>

        {/* RIGHT */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold">
            {mode === "login" ? "Login" : "Sign Up"}
          </h2>

          {/* ROLE */}
          <div className="flex mt-4 bg-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => setRole("student")}
              className={`flex-1 py-2 ${
                role === "student" ? "bg-white shadow" : ""
              }`}
            >
              Student
            </button>

            <button
              onClick={() => setRole("admin")}
              className={`flex-1 py-2 ${
                role === "admin" ? "bg-white shadow" : ""
              }`}
            >
              Admin
            </button>
          </div>

          {/* FORM */}
          <div className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              {mode === "login" ? "Login" : "Create Account"}
            </button>
          </div>

          {/* SWITCH TEXT */}
          <div className="text-sm text-center mt-4">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <span
                  onClick={() => setMode("signup")}
                  className="text-green-600 cursor-pointer"
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setMode("login")}
                  className="text-green-600 cursor-pointer"
                >
                  Login
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

