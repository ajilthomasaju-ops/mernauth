import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post("/login", form);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <div className="visual-top"><span className="brand-symbol">M</span><span>MERN <b>AUTH</b></span></div>
        <div className="visual-copy">
          <span className="visual-kicker"><i /> YOUR SPACE. YOUR SECURITY.</span>
          <h2>Everything you need.<br /><em>One secure place.</em></h2>
          <p>A simpler, smarter way to access your personal dashboard. Sign in and pick up right where you left off.</p>
          <div className="visual-art" aria-hidden="true">
            <div className="art-orbit orbit-one"></div><div className="art-orbit orbit-two"></div>
            <div className="art-core"><span>✦</span></div>
            <div className="art-chip chip-one">✧ &nbsp; Secure access</div>
            <div className="art-chip chip-two">◈ &nbsp; Your dashboard</div>
          </div>
        </div>
        <div className="visual-footer"><span>© 2026 Meridian Auth</span><span>BUILT FOR PEACE OF MIND</span></div>
      </section>

      <section className="auth-panel">
        <div className="mobile-brand"><span className="brand-symbol">M</span> MEREN AUTH</div>
        <div className="auth-content">
          <div className="form-heading">
            <span className="form-kicker">WELCOME BACK</span>
            <h1>Sign in to your<br />account<span>.</span></h1>
            <p>Enter your details below to continue.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email address</label>
            <div className="input-wrap"><span className="field-icon">✉</span><input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="name@example.com" autoComplete="email" required /></div>
            <div className="label-row"><label htmlFor="password">Password</label><span className="secure-note">● ENCRYPTED</span></div>
            <div className="input-wrap"><span className="field-icon">⌑</span><input id="password" name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} placeholder="Enter your password" autoComplete="current-password" required /><button className="password-toggle" type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button></div>
            {error && <p className="notice error" role="alert">{error}</p>}
            <button className="primary-button" disabled={loading}>{loading ? "Signing you in..." : <>Sign in <span>→</span></>}</button>
          </form>
          <p className="switch-link">New to Mern auth? <Link to="/register">Register <span>↗</span></Link></p>
          <div className="form-security"><span>◇</span> Your information is protected with secure authentication.</div>
        </div>
      </section>
    </main>
  );
}
