import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import backgroundImage from "../assets/background1.jpg";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username.trim() === "" || password.trim() === "") {
      setError("⚠️ Please enter both username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch('http://localhost/api/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        }),
        credentials: 'include' // Important for session cookies
      });

      const data = await response.json();

      if (data.success) {
        // Store user data in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', data.username);
        
        // Redirect to dashboard or home page
        navigate('/dashboard');
      } else {
        setError(data.error || '❌ Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('❌ Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleForgotPasswordModal = () => {
    setShowForgotPassword(!showForgotPassword);
    setEmail("");
    setError("");
  };

  const handleResetPassword = () => {
    if (email.trim() === "") {
      setError("⚠️ Please enter your email.");
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
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        <button 
          className="auth-button" 
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        
        <div className="forgot-password" onClick={toggleForgotPasswordModal}>
          Forgot your password?
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <>
          <div className="modal-overlay" onClick={toggleForgotPasswordModal}></div>
          <motion.div 
            className="forgot-password-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <h2>Forgot Password</h2>
            <p>Enter your email below to reset your password.</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <div className="error-message">{error}</div>}
            <button className="reset-button" onClick={handleResetPassword}>
              Reset Password
            </button>
            <button className="close-modal" onClick={toggleForgotPasswordModal}>
              Close
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
}

export default Auth;