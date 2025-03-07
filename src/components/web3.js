
import { ethers } from "ethers";
import MedicalAppointmentABI from "../components/MedicalAppointmentABI.json";
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
export const getEthereumContract = () => {
 if (!window.ethereum) throw new Error("No crypto wallet found");
 
 const provider = new ethers.providers.Web3Provider(window.ethereum);
 const signer = provider.getSigner();
 return new ethers.Contract(CONTRACT_ADDRESS, MedicalAppointmentABI, signer);
};