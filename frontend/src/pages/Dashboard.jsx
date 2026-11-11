import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadDashboard() {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/dashboard", { headers: { Authorization: `Bearer ${token}` } });
        setUser(response.data.user);
      } catch (err) {
        localStorage.removeItem("token");
        setError(err.response?.data?.message || "Session expired. Please sign in again.");
        setTimeout(() => navigate("/login", { replace: true }), 1200);
      }
    }
    loadDashboard();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  const initial = user?.username?.charAt(0)?.toUpperCase() || "U";

  return (
    <main className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand"><span className="brand-symbol">M</span><span>MERN <b>AUTH</b></span></div>
        <div className="sidebar-section">WORKSPACE</div>
        <div className="sidebar-link active"><span>▦</span> Overview</div>
        <div className="sidebar-bottom"><button className="sidebar-logout" onClick={handleLogout}><span>↪</span> LOGOUT</button></div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-header"><div><span className="header-caption">YOUR WORKSPACE</span><h1>Overview</h1></div><div className="header-user"><div className="header-avatar">{initial}</div><div><b>{user?.username || "Loading..."}</b><small>Personal account</small></div></div></header>
        <div className="dashboard-body">
          <div className="dashboard-welcome">
            <div className="welcome-copy"><span className="welcome-tag"><i /> ACCOUNT OVERVIEW</span><h2>{user ? `Welcome back, ${user.username}.` : "Preparing your dashboard..."}</h2><p>Your secure space is ready. You're signed in and everything is looking good.</p></div>
            <div className="welcome-graphic" aria-hidden="true"><div className="graphic-ring ring-a"></div><div className="graphic-ring ring-b"></div><div className="graphic-star">✦</div></div>
          </div>
          {error && <p className="notice error">{error}</p>}
          <div className="section-heading"><div><span className="header-caption">ACCOUNT DETAILS</span><h3>Your profile</h3></div><span className="live-status"><i /> ACTIVE SESSION</span></div>
          {user && <div className="account-grid">
            <article className="account-card profile-summary"><div className="large-avatar">{initial}</div><div><span className="card-label">SIGNED IN AS</span><h3>{user.username}</h3><p>{user.email}</p></div><span className="verified-mark">✓</span></article>
            <article className="account-card"><div className="card-icon">✉</div><span className="card-label">EMAIL ADDRESS</span><h3 className="detail-value">{user.email}</h3><p className="detail-note">Your registered email</p></article>
            <article className="account-card"><div className="card-icon">◇</div><span className="card-label">AUTHENTICATION</span><h3 className="detail-value">Protected</h3><p className="detail-note">JWT verified successfully</p></article>
          </div>}
          <div className="dashboard-footnote"><span>◇</span> You're viewing a protected page. Your session is verified by the server on each request.</div>
        </div>
      </section>
    </main>
  );
}
