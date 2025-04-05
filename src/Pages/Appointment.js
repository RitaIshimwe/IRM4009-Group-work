import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../styles/Appointment.css";
import { 
  Card, 
  CardContent, 
  Button, 
  TextField, 
  MenuItem, 
  FormControl,
  CircularProgress,
  Snackbar,
  Alert,
  Typography,
  Box
} from "@mui/material";
import { ethers } from "ethers";
import contractData from "../contracts/AppointmentContract.json";

const MetaMaskLogo = "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg";

const AppointmentBooking = () => {
  // Form state
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

  // Blockchain state
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [networkCorrect, setNetworkCorrect] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState(null);

  // Switch to Remix VM network
  const switchToRemixVM = async () => {
    try {
      setIsConnecting(true);
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x539' }]
      });
      await setupProviderAndContract();
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x539',
              chainName: 'Remix VM',
              nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18
              },
              rpcUrls: ['http://localhost:8545']
            }]
          });
          await setupProviderAndContract();
        } catch (addError) {
          setError("Failed to add Remix VM network");
        }
      } else {
        setError("Failed to switch to Remix VM network");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  // Initialize blockchain connection
  useEffect(() => {
    const init = async () => {
      if (!window.ethereum) {
        // MetaMask not detected - we'll still allow form filling
        return;
      }

      try {
        // Check initial connection
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          await setupProviderAndContract();
        }

        // Set up event listeners
        window.ethereum.on('accountsChanged', (newAccounts) => {
          if (newAccounts.length > 0) {
            setAccount(newAccounts[0]);
            setupProviderAndContract();
          } else {
            setAccount(null);
            setIsConnected(false);
          }
        });

        window.ethereum.on('chainChanged', () => window.location.reload());

      } catch (err) {
        console.error("Initial connection error:", err);
      }
    };

    init();

    return () => {
      window.ethereum?.removeAllListeners();
    };
  }, []);

  const setupProviderAndContract = async () => {
    try {
      setIsConnecting(true);
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const network = await web3Provider.getNetwork();
      const isRemixVM = network.chainId === 1337n;

      if (!isRemixVM) {
        setNetworkCorrect(false);
        return;
      }

      const signer = await web3Provider.getSigner();
      const contract = new ethers.Contract(
        contractData.address,
        contractData.abi,
        signer
      );

      setProvider(web3Provider);
      setContract(contract);
      setIsConnected(true);
      setNetworkCorrect(true);
      setError(null);
    } catch (err) {
      console.error("Setup failed:", err);
      setError("Failed to setup blockchain connection");
      setIsConnected(false);
      setNetworkCorrect(false);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      setAccount(accounts[0]);
      await setupProviderAndContract();
    } catch (err) {
      console.error("Connection error:", err);
      setError(err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleDateSelect = (selectInfo) => {
    setSelectedDate(selectInfo.startStr);
  };

  const handleSubmit = async () => {
    if (!isConnected || !networkCorrect) {
      // Instead of blocking submission, we'll just show a warning but allow the form to complete
      setError("Note: Your appointment is not being recorded on blockchain. Connect to the correct network for full functionality.");
      
      // Simulate success for non-blockchain submission
      setSuccess(true);
      
      // Reset form
      setStep(1);
      setAppointmentType("");
      setReason("");
      setSelectedDate(null);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        gender: "",
        idType: "",
        idNumber: "",
        versionCode: "",
      });
      
      setIsLoading(false);
      return;
    }

    // Original blockchain submission logic
    if (!selectedDate || !appointmentType || !reason) {
      setError("Please fill all required fields");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const tx = await contract.createBooking(
        `${formData.firstName} ${formData.lastName}`,
        selectedDate,
        reason,
        {
          gasLimit: 500000,
          value: 1
        }
      );

      setTxHash(tx.hash);
      const receipt = await tx.wait();
      setSuccess(true);
      
      // Reset form
      setStep(1);
      setAppointmentType("");
      setReason("");
      setSelectedDate(null);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        gender: "",
        idType: "",
        idNumber: "",
        versionCode: "",
      });

    } catch (err) {
      console.error("Booking failed:", err);
      let errorMessage = "Failed to book appointment";
      if (err.code === 'ACTION_REJECTED') {
        errorMessage = "Transaction was rejected by user";
      } else if (err.code === 'INSUFFICIENT_FUNDS') {
        errorMessage = "Insufficient funds for gas fee";
      } else if (err.info?.error) {
        errorMessage = err.info.error.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') return;
    setError(null);
    setSuccess(false);
  };

  // Connection status component
  const ConnectionStatus = () => {
    if (!window.ethereum) {
      return (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Note: MetaMask not detected. You can still book appointments, but they won't be recorded on blockchain.
        </Alert>
      );
    }

    if (!account) {
      return (
        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Alert severity="info">
            Connect your wallet to record appointments on blockchain (optional)
          </Alert>
          <Button
            variant="contained"
            onClick={handleConnectWallet}
            disabled={isConnecting}
            startIcon={
              <img 
                src={MetaMaskLogo} 
                alt="MetaMask" 
                style={{ width: 20, height: 20 }} 
              />
            }
            sx={{ alignSelf: 'flex-start' }}
          >
            {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
          </Button>
        </Box>
      );
    }

    if (!networkCorrect) {
      return (
        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Alert severity="info">
            Switch to Remix VM (ChainID: 1337) to record appointments on blockchain (optional)
          </Alert>
          <Button
            variant="contained"
            onClick={switchToRemixVM}
            disabled={isConnecting}
            sx={{ alignSelf: 'flex-start' }}
          >
            {isConnecting ? 'Switching...' : 'Switch to Remix VM'}
          </Button>
        </Box>
      );
    }

    return (
      <Alert severity="success" sx={{ mb: 2 }}>
        Connected to Remix VM: {`${account.substring(0, 6)}...${account.substring(38)}`}
      </Alert>
    );
  };

  return (
    <div className="appointment-page">
      <Card className="appointment-card">
        <CardContent>
          <ConnectionStatus />

          <Snackbar 
            open={!!error} 
            autoHideDuration={6000} 
            onClose={handleCloseAlert}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert severity={isConnected ? "error" : "warning"} onClose={handleCloseAlert}>
              {error}
            </Alert>
          </Snackbar>

          <Snackbar 
            open={success} 
            autoHideDuration={6000} 
            onClose={handleCloseAlert}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert severity="success" onClose={handleCloseAlert}>
              <Typography>Appointment booked successfully!</Typography>
              {txHash && (
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  TX Hash: {txHash}
                </Typography>
              )}
            </Alert>
          </Snackbar>

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
                required
              >
                <MenuItem value="Group">Group</MenuItem>
                <MenuItem value="Virtual">Virtual (Video/Phone)</MenuItem>
                <MenuItem value="In-Person">In-Person</MenuItem>
              </TextField>

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
                  height="auto"
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
                required
              />

              <Button 
                onClick={handleNext} 
                variant="contained" 
                fullWidth 
                disabled={!appointmentType || !selectedDate || !reason}
              >
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
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />

              <TextField
                label="Last Name"
                type="text"
                fullWidth
                margin="normal"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />

              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <TextField
                label="Date of Birth"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={formData.dob}
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
                  value={formData.idNumber}
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                />
              )}

              {(formData.idType === "OHIP" || formData.idType === "Other Provincial") && (
                <TextField
                  label="Version Code"
                  type="text"
                  fullWidth
                  margin="normal"
                  value={formData.versionCode}
                  onChange={(e) => setFormData({ ...formData, versionCode: e.target.value })}
                />
              )}

              <div className="button-group" style={{ marginTop: '20px' }}>
                <Button onClick={handlePrev} variant="outlined">
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  disabled={isLoading}
                  endIcon={isLoading ? <CircularProgress size={20} /> : null}
                >
                  {isLoading ? "Processing..." : "Submit"}
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