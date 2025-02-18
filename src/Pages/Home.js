import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css"; 

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to Carleton Clinic</h1>
      <button className="appointment-btn" onClick={() => navigate("/Auth")}>
        Get started
      </button>
    </div>
  );
}

export default Home;