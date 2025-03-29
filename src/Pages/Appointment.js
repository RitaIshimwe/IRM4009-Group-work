import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // Enables date selection
import "../styles/Appointment.css";
import { Card, CardContent, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const AppointmentBooking = () => {
  const [step, setStep] = useState(1);
  const [appointmentType, setAppointmentType] = useState("");
  const [reason, setReason] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: "",
    idType: "",
    idNumber: "",
    versionCode: "",
  });

  // Handle next/previous step
  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  // Handle selecting a date
  const handleDateSelect = (selectInfo) => {
    setSelectedDate(selectInfo.startStr);
  };

  return (
    <div className="appointment-page">
      <Card className="appointment-card">
        <CardContent>
          {step === 1 && (
            <div>
              <h2 className="heading">Book Appointment</h2>

              <TextField
                select
                label="Appointment Type"
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                <MenuItem value="Group">Group</MenuItem>
                <MenuItem value="Virtual">Virtual (Video/Phone)</MenuItem>
                <MenuItem value="In-Person">In-Person</MenuItem>
                </TextField>


              {/* FullCalendar for selecting date and time */}
              <div className="calendar-container">
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="timeGridWeek"
                  selectable={true}
                  select={handleDateSelect}
                  events={[
                    { title: "Unavailable", start: "2025-03-27T12:00:00", end: "2025-03-27T14:00:00", color: "red" },
                    { title: "Meeting", start: "2025-03-28T10:00:00", end: "2025-03-28T11:30:00", color: "blue" }
                  ]}
                  slotMinTime="08:30:00"
                  slotMaxTime="16:30:00"
                  allDaySlot={false}
                  height="auto" // Ensures calendar is responsive
                  contentHeight="auto"
                />
              </div>

              {selectedDate && <p className="selected-date">Selected Date: {selectedDate}</p>}

              <TextField
                label="Reason for Appointment"
                type="text"
                placeholder="Describe your symptoms"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                fullWidth
                margin="normal"
                className="input-box"
              />

              <Button onClick={handleNext} variant="contained" fullWidth>
                Next
              </Button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="heading">Enter Appointment Details</h2>

              <TextField
                label="First Name"
                type="text"
                fullWidth
                margin="normal"
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />

              <TextField
                label="Last Name"
                type="text"
                fullWidth
                margin="normal"
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />

              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <TextField
                label="Date of Birth"
                type="date"
                fullWidth
                margin="normal"
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              />

              <FormControl fullWidth margin="normal">
                <TextField
                select
                label="Gender"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                fullWidth
                variant="outlined"
                >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <TextField
                  select 
                  label="ID Type"
                  value={formData.idType}
                  onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                  fullWidth
                  variant="outlined"
                >
                  <MenuItem value="Student ID">Student ID</MenuItem>
                  <MenuItem value="OHIP">OHIP</MenuItem>
                  <MenuItem value="Other Provincial">Other Provincial Health Card</MenuItem>
                  <MenuItem value="UHIP">UHIP</MenuItem>
                  <MenuItem value="Private ID">Private ID</MenuItem>
                  <MenuItem value="IFHP">IFHP</MenuItem>
                </TextField>
              </FormControl>

              {formData.idType && (
                <TextField
                  label="ID Number"
                  type="text"
                  fullWidth
                  margin="normal"
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                />
              )}

              {(formData.idType === "OHIP" || formData.idType === "Other Provincial") && (
                <TextField
                  label="Version Code"
                  type="text"
                  fullWidth
                  margin="normal"
                  onChange={(e) => setFormData({ ...formData, versionCode: e.target.value })}
                />
              )}

              <div className="button-group">
                <Button onClick={handlePrev} variant="outlined">
                  Back
                </Button>
                <Button
                  onClick={() => alert("Appointment Booked Successfully!")}
                  variant="contained"
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentBooking;
