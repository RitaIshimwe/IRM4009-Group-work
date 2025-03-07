import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import MedicalAppointmentABI from "../components/MedicalAppointmentABI.json";  // Your contract ABI
import "../Styles/Appointment.css"; // Your CSS styles

const MetaMaskConnection = () => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [doctorName, setDoctorName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace with your contract address

  // Check if MetaMask is installed
  const checkMetaMaskInstallation = () => {
    if (window.ethereum) {
      return true;
    } else {
      alert("MetaMask is not installed. Please install MetaMask to use this feature.");
      return false;
    }
  };

  // Handle connection to MetaMask
  const handleConnectMetaMask = async () => {
    if (checkMetaMaskInstallation()) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        const _signer = _provider.getSigner();
        const _account = await _signer.getAddress();

        setProvider(_provider);
        setSigner(_signer);
        setAccount(_account);
        console.log("Connected to MetaMask with account:", _account);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
        alert("Error connecting to MetaMask.");
      }
    }
  };

  // Handle disconnection from MetaMask
  const handleDisconnectMetaMask = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    console.log("Disconnected from MetaMask");
  };

  // Handle account change
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
        console.log("Account changed to:", accounts[0]);
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, []);

  // Handle booking the appointment with the smart contract
  const handleBookAppointment = async () => {
    if (!doctorName || !appointmentDate) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      if (!signer || !account) {
        alert("Please connect your MetaMask wallet first.");
        return;
      }

      const timestamp = Math.floor(new Date(appointmentDate).getTime() / 1000);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, MedicalAppointmentABI, signer);
      const tx = await contract.bookAppointment(doctorName, timestamp);
      await tx.wait();  // Wait for the transaction to be mined

      setMessage(`✅ Your appointment with Dr. ${doctorName} has been scheduled!`);
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Error booking appointment.");
    }
  };

  return (
    <div className="metaMask-container">
      <h1>MetaMask Appointment Booking</h1>
      
      {/* Display Connect/Disconnect MetaMask button */}
      {!account ? (
        <button onClick={handleConnectMetaMask}>Connect MetaMask</button>
      ) : (
        <div>
          <p>Connected Account: {account}</p>
          <button onClick={handleDisconnectMetaMask}>Disconnect</button>
        </div>
      )}

      {/* If account is connected, show appointment booking form */}
      {account && (
        <div>
          <h3>Book an Appointment</h3>
          <input
            type="text"
            placeholder="Doctor Name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
          <input
            type="date"
            value={appointmentDate.toISOString().split("T")[0]} // Format the date for input
            onChange={(e) => setAppointmentDate(new Date(e.target.value))}
          />
          <button onClick={handleBookAppointment}>Confirm Appointment</button>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default MetaMaskConnection;