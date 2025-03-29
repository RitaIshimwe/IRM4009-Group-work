import React from "react";
import { Link } from "react-router-dom";
import "../styles/Services.css"; 

// import paths
import Image1 from "../assets/Image1.webp";
import Image4 from "../assets/Image4.jpg";
import Image2 from "../assets/Image2.jpg";
import Image3 from "../assets/Image3.webp";

// Array of services with corresponding images
const servicesList = [
  { id: 1, name: "General Consultation", img: Image3 },
  { id: 2, name: "Health Checkups", img: Image4 },
  { id: 3, name: "Online Appointments", img: Image2, link: "/appointment" },
  { id: 4, name: "Specialist Consultation", img: Image1 },
];

function Services() {
  return (
    <div className="services-page-wrapper">  {/* Wrapper for Services page */}
      <div className="page-container">
        <h1>Our Services</h1>
        <ul className="services-list">
          {servicesList.map((service) => (
            <li key={service.id} className="service-item">
              {service.link ? (
                <Link to={service.link}>
                  <img src={service.img} alt={service.name} className="service-image" />
                  <p>{service.name}</p>
                </Link>
              ) : (
                <div>
                  <img src={service.img} alt={service.name} className="service-image" />
                  <p>{service.name}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Services;
