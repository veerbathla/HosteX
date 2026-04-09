import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const mode = location.pathname === "/signup" ? "signup" : "login";

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Enter all fields");
      return;
    }

    // Fake auth (replace with backend later)
    const userData = {
      email,
      role,
      isLoggedIn: true,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    // Redirect based on role
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e9f0ec]">
      <Card className="flex h-[550px] w-[900px] overflow-hidden p-0">

        {/* Left Panel */}
        <div className="flex w-1/2 flex-col justify-center bg-gradient-to-br from-green-500 to-green-700 p-10 text-white">
          <h2 className="text-lg font-semibold">HosteX</h2>

          <h1 className="mt-6 text-3xl font-bold">
            {mode === "login" ? "Welcome Back" : "Create your account"}
          </h1>

          <p className="mt-4 text-sm">
            {mode === "login"
              ? "Login to continue managing your hostel"
              : "Join the smart hostel management system"}
          </p>
        </div>

        {/* Right Panel */}
        <div className="flex w-1/2 flex-col justify-center p-10">
          <h2 className="text-2xl font-bold">
            {mode === "login" ? "Login" : "Sign Up"}
          </h2>

          {/* Role Selector */}
          <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-lg bg-gray-100">
            <Button
              variant={role === "student" ? "secondary" : "ghost"}
              onClick={() => setRole("student")}
              className="rounded-none py-2"
            >
              Student
            </Button>

            <Button
              variant={role === "admin" ? "secondary" : "ghost"}
              onClick={() => setRole("admin")}
              className="rounded-none py-2"
            >
              Admin
            </Button>

            <Button
              variant={role === "gatekeeper" ? "secondary" : "ghost"}
              onClick={() => setRole("gatekeeper")}
              className="rounded-none py-2"
            >
              Gatekeeper
            </Button>
          </div>

          {/* Inputs */}
          <div className="mt-6 space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2"
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2"
            />

            <Button onClick={handleSubmit} fullWidth>
              {mode === "login" ? "Login" : "Create Account"}
            </Button>
          </div>

          {/* Switch Mode */}
          <div className="mt-4 text-center text-sm">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/signup")}
                  className="inline-flex p-0 text-green-600 hover:bg-transparent"
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/login")}
                  className="inline-flex p-0 text-green-600 hover:bg-transparent"
                >
                  Login
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
