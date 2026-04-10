import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AtSign, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, Shield } from "lucide-react";
import { useToast } from "../../../components/feedback/toastContext";
import "./SuperAdminLogin.css";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SuperAdminLogin() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");

  const validate = () => {
    const errors = {};
    if (!email.trim()) errors.email = "Email is required.";
    else if (!emailPattern.test(email)) errors.email = "Enter a valid email.";
    if (!password) errors.password = "Password is required.";
    else if (password.length < 6) errors.password = "Min 6 characters.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError("");

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email.trim().toLowerCase() === "admin@hostex.com" && password === "Hostex@Admin123") {
      localStorage.setItem("superadmin_auth", "true");
      showToast({
        title: "Welcome, Super Admin",
        message: "Secure session started successfully.",
        type: "success",
      });
      navigate("/superadmin/dashboard", { replace: true });
    } else {
      setError("Access denied. Invalid Super Admin credentials.");
      showToast({
        title: "Access Denied",
        message: "Invalid credentials.",
        type: "error",
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="sa-root">
      {/* Background blobs */}
      <div className="sa-blob sa-blob-1" />
      <div className="sa-blob sa-blob-2" />
      <div className="sa-blob sa-blob-3" />

      <main className="sa-card animate-fade-up" role="main">
        {/* Badge */}
        <div className="sa-badge">
          <ShieldCheck size={12} strokeWidth={2.5} />
          SUPER ADMIN ACCESS
        </div>

        {/* Heading */}
        <h1 className="sa-heading">Welcome Back</h1>
        <p className="sa-subheading">
          Enter your credentials to manage the sanctuary.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="sa-form">

          {/* Email field */}
          <div className="sa-field">
            <label className="sa-label" htmlFor="sa-email">
              EMAIL ADDRESS
            </label>
            <div className={`sa-input-wrap ${fieldErrors.email ? "sa-input-error" : ""}`}>
              <AtSign size={15} className="sa-icon-left" strokeWidth={1.8} />
              <input
                id="sa-email"
                type="email"
                placeholder="email@gmail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldErrors((p) => ({ ...p, email: "" }));
                }}
                className="sa-input"
                autoComplete="email"
                autoFocus
              />
            </div>
            {fieldErrors.email && (
              <p className="sa-field-err">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password field */}
          <div className="sa-field">
            <label className="sa-label" htmlFor="sa-password">
              PASSWORD
            </label>
            <div className={`sa-input-wrap ${fieldErrors.password ? "sa-input-error" : ""}`}>
              <Lock size={15} className="sa-icon-left" strokeWidth={1.8} />
              <input
                id="sa-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldErrors((p) => ({ ...p, password: "" }));
                }}
                className="sa-input sa-input-has-right"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="sa-eye-btn"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="sa-field-err">{fieldErrors.password}</p>
            )}
          </div>

          {/* Remember me + Forgot password */}
          <div className="sa-options-row">
            <label className="sa-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sa-checkbox"
              />
              <span>Remember Me</span>
            </label>
            <button type="button" className="sa-forgot">
              Forgot Password?
            </button>
          </div>

          {/* Error banner */}
          {error && <div className="sa-error-box">{error}</div>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="sa-submit"
            id="sa-submit-btn"
          >
            {loading ? (
              <>
                <span className="sa-spinner" />
                Authenticating...
              </>
            ) : (
              <>
                Secure Access
                <ArrowRight size={16} strokeWidth={2.5} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <footer className="sa-footer">
          <div className="sa-ssl">
            <Shield size={12} strokeWidth={2} />
            Encrypted SSL Session for HosteX
          </div>
          <div className="sa-footer-links">
            <button type="button" className="sa-footer-link">Security Policy</button>
            <span className="sa-dot">•</span>
            <button type="button" className="sa-footer-link">System Status</button>
            <span className="sa-dot">•</span>
            <button type="button" className="sa-footer-link">Help Center</button>
          </div>
        </footer>
      </main>
    </div>
  );
}
