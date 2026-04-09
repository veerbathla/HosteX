import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { useToast } from "../components/feedback/toastContext";
import { login, register } from "../services/api/authService";

const dashboardByRole = {
  admin: "/admin/dashboard",
  student: "/student/dashboard",
  gatekeeper: "/gatekeeper/dashboard",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const { showToast } = useToast();
  const mode = location.pathname === "/signup" ? "signup" : "login";
  const from = location.state?.from?.pathname;

  const validate = () => {
    const nextErrors = {};

    if (mode === "signup" && !name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const session =
        mode === "login"
          ? await login({ email: email.trim(), password })
          : await register({ name: name.trim(), email: email.trim(), password, role: "student" });

      const resolvedRole = session?.data?.user?.role || session?.user?.role || session?.role || "student";
      showToast({
        title: mode === "login" ? "Welcome back" : "Account created",
        message: "You are signed in securely.",
        type: "success",
      });
      navigate(from || dashboardByRole[resolvedRole] || "/student/dashboard", {
        replace: true,
      });
    } catch (apiError) {
      const message = apiError.message || "Authentication failed. Please try again.";
      setError(message);
      showToast({ title: "Authentication failed", message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 sm:p-8">
      <Card className="flex w-full max-w-5xl flex-col overflow-hidden p-0 md:flex-row">

        {/* Left Panel */}
        <div className="flex min-h-56 flex-col justify-center bg-gradient-to-br from-green-500 to-green-700 p-8 text-white md:w-1/2 md:p-10">
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
        <form onSubmit={handleSubmit} className="flex flex-col justify-center p-8 md:w-1/2 md:p-10">
          <h2 className="text-2xl font-bold">
            {mode === "login" ? "Login" : "Sign Up"}
          </h2>

          {mode === "signup" && (
            <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
              Public signup creates student accounts. Staff accounts must be created by an administrator.
            </p>
          )}

          {/* Inputs */}
          <div className="mt-6 space-y-4">
            {mode === "signup" && (
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setFieldErrors((current) => ({ ...current, name: "" }));
                }}
                className="px-3 py-2"
              />
            )}
            {fieldErrors.name && (
              <p className="text-xs font-medium text-red-600">{fieldErrors.name}</p>
            )}

            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFieldErrors((current) => ({ ...current, email: "" }));
              }}
              className="px-3 py-2"
            />
            {fieldErrors.email && (
              <p className="text-xs font-medium text-red-600">{fieldErrors.email}</p>
            )}

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldErrors((current) => ({ ...current, password: "" }));
              }}
              className="px-3 py-2"
            />
            {fieldErrors.password && (
              <p className="text-xs font-medium text-red-600">
                {fieldErrors.password}
              </p>
            )}

            {error && (
              <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
                {error}
              </p>
            )}

            <Button type="submit" fullWidth disabled={loading}>
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Login"
                  : "Create Account"}
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
        </form>
      </Card>
    </div>
  );
}
