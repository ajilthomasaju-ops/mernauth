
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2><span>M</span> MERN AUTH</h2>
          <p>
            A secure and simple authentication
            experience built with the MERN stack.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>

        <div className="footer-security">
          <h3>Security</h3>
          <p>JWT Authentication</p>
          <p>Secure User Access</p>
          <p>Privacy Focused</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Mern Auth.
          All Rights Reserved.
        </p>
        <p>Built  using MERN Stack</p>
      </div>
    </footer>
  );
};

export default Footer;
