import React, { useState } from "react";
// Import the Calendar component
import Calendar from "react-calendar"; 
// Import calendar styling
import "react-calendar/dist/Calendar.css"; 
// Blockchain contract interaction
import { getEthereumContract } from "../components/web3";
// Import CSS file 
import "../Styles/Appointment.css"; 

const BookAppointment = () => {
  const [doctorName, setDoctorName] = useState("");
  // Default to today's date
  const [date, setDate] = useState(new Date()); 
  const [message, setMessage] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSchedule = () => { 
    // Show calendar when scheduling
    setShowCalendar(true); 
  };
  // Update selected date
  const handleDateChange = (newDate) => {
    setDate(newDate); 
  };

  const handleConfirmAppointment = async () => {
    if (!doctorName || !doctorName.trim()) {
      alert("Please enter a valid doctor name.");
      return;
    }

    try {
      const contract = getEthereumContract();
      const timestamp = parseInt(new Date(date).getTime() / 1000);
      const tx = await contract.bookAppointment(doctorName, timestamp);
      await tx.wait(); // Wait for the transaction to be confirmed

      setMessage(`✅ Your appointment with Dr. ${doctorName} for ${date.toDateString()} has been successfully scheduled and confirmed!`);
      setShowCalendar(false); // Hide calendar after confirmation
    } catch (error) {
      console.error(error);
      alert(`Error booking appointment: ${error.message}`);
    }
  };

  return (
    <div className="page-container">
      <h1>Schedule an Appointment</h1>
      <input
        type="text"
        placeholder="Doctor Name"
        value={doctorName}
        onChange={(e) => setDoctorName(e.target.value)}
      />
      {!showCalendar ? (
        <button className="schedule-btn" onClick={handleSchedule}>Schedule Now</button>
      ) : (
        <div>
          <h3>Select a date for your appointment:</h3>
          <Calendar
            onChange={handleDateChange}
            value={date}
            minDate={new Date()} // Disable past dates
          />
          <p>Selected date: {date.toDateString()}</p>
          <button onClick={handleConfirmAppointment}>Confirm Appointment</button>
        </div>
      )}
      {message && <p className="confirmation-message">{message}</p>}
    </div>
  );
};

export default BookAppointment;