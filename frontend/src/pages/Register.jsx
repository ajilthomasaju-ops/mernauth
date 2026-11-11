import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const response = await api.post("/register", form);
      setMessage(response.data.message || "Your account has been created. You can now sign in.");
      setTimeout(() => navigate("/login"), 1100);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <div className="visual-top"><span className="brand-symbol">M</span><span>MERIDIAN <b>AUTH</b></span></div>
        <div className="visual-copy">
          <span className="visual-kicker"><i /> A BETTER WAY TO BEGIN</span>
          <h2>Your next chapter<br /><em>starts right here.</em></h2>
          <p>Create your account in a moment and enjoy a clean, secure space made just for you.</p>
          <div className="visual-art" aria-hidden="true">
            <div className="art-orbit orbit-one"></div><div className="art-orbit orbit-two"></div>
            <div className="art-core"><span>✦</span></div>
            <div className="art-chip chip-one">✧ &nbsp; Quick setup</div>
            <div className="art-chip chip-two">◈ &nbsp; Private by design</div>
          </div>
        </div>
        <div className="visual-footer"><span>© 2026 Meridian Auth</span><span>BUILT FOR PEACE OF MIND</span></div>
      </section>

      <section className="auth-panel">
        <div className="mobile-brand"><span className="brand-symbol">M</span> MERIDIAN AUTH</div>
        <div className="auth-content">
          <div className="form-heading">
            <span className="form-kicker">GET STARTED</span>
            <h1>Create your<br />account<span>.</span></h1>
            <p>Just a few details and you're all set.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Your name</label>
            <div className="input-wrap"><span className="field-icon">♙</span><input id="username" name="username" value={form.username} onChange={handleChange} placeholder="How should we call you?" autoComplete="name" required /></div>
            <label htmlFor="email">Email address</label>
            <div className="input-wrap"><span className="field-icon">✉</span><input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="name@example.com" autoComplete="email" required /></div>
            <label htmlFor="password">Create password</label>
            <div className="input-wrap"><span className="field-icon">⌑</span><input id="password" name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} placeholder="At least 6 characters" minLength="6" autoComplete="new-password" required /><button className="password-toggle" type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button></div>
            {message && <p className="notice success" role="status">{message}</p>}
            {error && <p className="notice error" role="alert">{error}</p>}
            <button className="primary-button" disabled={loading}>{loading ? "Creating account..." : <>Create account <span>→</span></>}</button>
          </form>
          <p className="switch-link">Already have an account? <Link to="/login">Sign in <span>↗</span></Link></p>
          <div className="form-security"><span>◇</span> Your information is protected with secure authentication.</div>
        </div>
      </section>
    </main>
  );
}
