import React, { useState, useEffect } from 'react';
import Logo from '../assets/CarletonLogo.jpg';  // First logo (Carleton)
import SecondLogo from '../assets/MedsecureLogo.png';  // Second logo
import { Link } from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder';
import "../styles/Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

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
    <div className={`navbar ${openLinks ? 'open' : ''}`}>
      <div className="leftSide">
        <img src={Logo} alt="Carleton University Logo" className="logo" />
      </div>

      <div className="centerLinks">
        <div className="navLinks">
          <Link to="/">Home</Link>
          <Link to="https://students.carleton.ca/">Current Students</Link>
          <Link to="https://students.carleton.ca/academics/">Academics</Link>
          <Link to="/appointment">Appointment</Link>
          <Link to="/services">Services</Link>
          <Link to="/Auth">Login</Link>
        </div>
      </div>

      <div className="rightSide">
        <img src={SecondLogo} alt="MedSecure Logo" className="second-logo" />
      </div>

      <button className="menuButton" onClick={toggleNavbar}>
        <ReorderIcon />
      </button>
    </div>
  );
}

export default Navbar;
