import React, { useState } from "react";
import "../Pages/Auth.css";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      alert("⚠️ Please enter both username and password.");
      return;
    }

    // Dummy authentication logic (replace with real API logic)
    if (username === "admin" && password === "password") {
      alert("✅ Successfully logged in!");
    } else {
      alert("❌ Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="page-container" style={{ textAlign: "center", maxWidth: "300px", margin: "auto", padding: "20px" }}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ margin: "10px 0", padding: "8px", width: "90%" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "10px 0", padding: "8px", width: "90%" }}
      />
      <button onClick={handleLogin} style={{ padding: "10px", width: "95%", cursor: "pointer" }}>
        Login
      </button>
    </div>
  );
}

export default Auth;