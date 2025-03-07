
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MedicalAppointment {
    struct Appointment {
        uint id;
        address patient;
        string doctorName;
        uint date;
        bool confirmed;
    }

    struct MedicalRecord {
        uint id;
        address patient;
        string recordHash; 
    }

    uint private appointmentCounter = 1;
    uint private recordCounter = 1;

    mapping(uint => Appointment) public appointments;
    mapping(address => uint[]) public patientAppointments;
    mapping(address => MedicalRecord[]) public medicalRecords;

    event AppointmentBooked(uint id, address indexed patient, string doctorName, uint date);
    event RecordAdded(uint id, address indexed patient, string recordHash);

    function bookAppointment(string memory _doctorName, uint _date) public returns (uint) {
        appointments[appointmentCounter] = Appointment(appointmentCounter, msg.sender, _doctorName, _date, false);
        patientAppointments[msg.sender].push(appointmentCounter);
        
        emit AppointmentBooked(appointmentCounter, msg.sender, _doctorName, _date);
        appointmentCounter++;
        return appointmentCounter - 1;
    }

    function confirmAppointment(uint _id) public {
        require(appointments[_id].id == _id, "Invalid Appointment");
        require(appointments[_id].patient == msg.sender, "Not your appointment");
        
        appointments[_id].confirmed = true;
    }

    function addMedicalRecord(string memory _recordHash) public {
        medicalRecords[msg.sender].push(MedicalRecord(recordCounter, msg.sender, _recordHash));
        
        emit RecordAdded(recordCounter, msg.sender, _recordHash);
        recordCounter++;
    }

    function getMyAppointments() public view returns (uint[] memory) {
        return patientAppointments[msg.sender];
    }

    function getMyMedicalRecords() public view returns (MedicalRecord[] memory) {
        return medicalRecords[msg.sender];
    }
}