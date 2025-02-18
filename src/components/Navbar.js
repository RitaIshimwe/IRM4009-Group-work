import React, { useState, useEffect } from 'react';
import Logo from '../assets/CarletonLogo.jpg';
import { Link } from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder';
import "../Styles/Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  // Close the navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".navbar")) {
        setOpenLinks(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="navbar">
      <div className="leftSide">
        <img src={Logo} alt="Carleton University Logo" />
      </div>

      <div className="rightSide">
        {/* Toggle Button */}
        <button className="menuButton" onClick={toggleNavbar}>
          <ReorderIcon />
        </button>

        {/* Mobile Menu */}
        <div className={`navLinks ${openLinks ? "show" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="https://students.carleton.ca/">Current Students</Link>
          <Link to="https://students.carleton.ca/academics/">Academics</Link>
          <Link to="/services">Services</Link>
          <Link to="/appointment">Appointment</Link>
          <Link to="/auth">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
