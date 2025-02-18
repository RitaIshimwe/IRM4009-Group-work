import React, { useState } from "react";
import Calendar from "react-calendar";  // Import the Calendar component
import "react-calendar/dist/Calendar.css"; // Import calendar styling
import "../Styles/Appointment.css"; // Import CSS file

function Appointment() {
  const [message, setMessage] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);  // To toggle calendar visibility
  const [date, setDate] = useState(new Date()); // Store selected date

  const handleSchedule = () => {
    setShowCalendar(true);  // Show the calendar when the button is clicked
  };

  const handleDateChange = (newDate) => {
    setDate(newDate); // Update the selected date
  };

  const handleConfirmAppointment = () => {
    setMessage(`✅ Your appointment for ${date.toDateString()} has been successfully scheduled!`);
    setShowCalendar(false);  // Hide the calendar after scheduling
  };

  return (
    <div className="page-container">
      <h1>Schedule an Appointment</h1>
      {!showCalendar ? (
        <button className="schedule-btn" onClick={handleSchedule}>Schedule Now</button>
      ) : (
        <div>
          <h3>Select a date for your appointment:</h3>
          <Calendar
            onChange={handleDateChange}
            value={date}
            minDate={new Date()}  // Disable past dates
          />
          <p>Selected date: {date.toDateString()}</p>
          <button onClick={handleConfirmAppointment}>Confirm Appointment</button>
        </div>
      )}
      {message && <p className="confirmation-message">{message}</p>}
    </div>
  );
}

export default Appointment;