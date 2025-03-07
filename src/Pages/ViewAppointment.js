import React, { useState, useEffect } from "react";
import { getEthereumContract } from "../components/web3";
const ViewAppointments = () => {
 const [appointments, setAppointments] = useState([]);
 useEffect(() => {
   const fetchAppointments = async () => {
     try {
       const contract = getEthereumContract();
       const data = await contract.getMyAppointments();
       setAppointments(data);
     } catch (error) {
       console.error(error);
     }
   };
   fetchAppointments();
 }, []);
 return (
   <div>
     <h2>My Appointments</h2>
     {appointments.length === 0 ? <p>No appointments found</p> : (
       <ul>
         {appointments.map((id) => (
           <li key={id}>Appointment ID: {id}</li>
         ))}
       </ul>
     )}
   </div>
 );
};
export default ViewAppointments;