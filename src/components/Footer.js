
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{ background: "black", color: "white", textAlign: "center", padding: "20px", marginTop: "20px" }}>
      <div style={{ marginBottom: "10px", display: "flex", justifyContent: "center", gap: "30px" }}>
        <Link to="/policies" style={{ color: "white", textDecoration: "none" }}>Policies</Link>
        <Link to="/faq" style={{ color: "white", textDecoration: "none" }}>FAQ</Link>
        <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</Link>
        <Link to="/feedback" style={{ color: "white", textDecoration: "none" }}>Feedback</Link>
      </div>
      <p>© 2025 Carleton Health Clinic. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;