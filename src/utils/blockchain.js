import { ethers } from 'ethers';

import contractData from 'C:/Users/ishim/OneDrive/Documents/School Work/IRM4900/clinic-app/src/contracts/AppointmentContract.json';

// Initialize contract
let contract;
const initializeContract = async () => {
  if (!window.ethereum) {
    throw new Error("Please install MetaMask!");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  contract = new ethers.Contract(
    contractData.address,
    contractData.abi,
    signer
  );
  return contract;
};

// Book appointment function
export const bookAppointment = async (patientData) => {
  if (!contract) await initializeContract();
  
  const tx = await contract.createBooking(
    `${patientData.firstName} ${patientData.lastName}`,
    patientData.date,
    patientData.reason
  );
  
  return tx.hash;
};

// Get appointment count (optional)
export const getAppointmentCount = async () => {
  if (!contract) await initializeContract();
  return await contract.getBookingCount();
};