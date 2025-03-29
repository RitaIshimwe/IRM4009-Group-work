import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; 

function Home() {
  //const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to Carleton Clinic</h1>
      <Link to="/login">
        <button className="appointment-btn">
          Get started
        </button>
      </Link>
    </div>
  );
}

export default Home;