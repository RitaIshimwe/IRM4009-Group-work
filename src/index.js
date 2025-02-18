
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import React, {useState,useEffect}from 'react';
import Logo from './assets/CarletonLogo.jpg';
import { Link } from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder';
import "./Styles/Navbar.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



function Navbar() {
    const [openLinks, setOpenLinks] = useState(false)

    const toggleNavbar = () =>{
       setOpenLinks(!openLinks);
    }
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
    <div className='navbar'>
      <div className='leftSide' id={openLinks? "open":"close"}>
          <img src={Logo} alt="Carleton University Logo" />
      </div>
      <div className='rightSide'>
          <Link to="/">Home</Link>
          <Link to="https://students.carleton.ca/">Current Students</Link>
          <Link to="https://students.carleton.ca/academics/">Academics</Link>
          <Link to="/services">Services</Link>
          <Link to="/policies">Policies</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/feedback">Feedback</Link>
          <Link to="/appointment">Appointment</Link>
          <Link to="/auth">Login</Link>
        <button onClick={toggleNavbar}>
            <ReorderIcon/>
        </button>
      </div>
    </div>
  );
}

export default Navbar;