import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";
import "../styles/Auth.css"; 
import backgroundImage from "../assets/background1.jpg"; // Import the image

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState(""); // State for forgot password input

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      alert("⚠️ Please enter both username and password.");
      return;
    }

    if (username === "admin" && password === "password") {
      alert("✅ Successfully logged in!");
    } else {
      alert("❌ Invalid credentials. Please try again.");
    }
  };

  const toggleForgotPasswordModal = () => {
    setShowForgotPassword(!showForgotPassword);
    setEmail(""); // Clear email input when closing modal
  };

  const handleResetPassword = () => {
    if (email.trim() === "") {
      alert("⚠️ Please enter your email.");
      return;
    }
    alert(`📩 Reset link sent to ${email}`);
    setShowForgotPassword(false);
  };

  return (
    <div 
      className="auth-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-box"
      >
        <h1 className="auth-title">Login</h1>
        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="auth-button" onClick={handleLogin}>Login</button>
        
        {/* Forgot password link */}
        <div className="forgot-password" onClick={toggleForgotPasswordModal}>
          Forgot your password?
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <>
          <div className="modal-overlay" onClick={toggleForgotPasswordModal}></div>
          <div className="forgot-password-modal">
            <h2>Forgot Password</h2>
            <p>Enter your email below to reset your password.</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="reset-button" onClick={handleResetPassword}>Reset Password</button>
            <button className="close-modal" onClick={toggleForgotPasswordModal}>Close</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Auth;
