import './App.css';
import Home from './Pages/Home';
import Contact from './Pages/ContactUs';
import Policies from './Pages/Policies';
import FAQ from './Pages/FAQ';
import Feedback from './Pages/Feedback';
import Appointment from './Pages/Appointment';
import Navbar from './Components/Navbar';  
import Chatbot from './Components/Chatbot'; 
import Footer from './Components/Footer'; 
import Auth from "./Pages/Auth";  
import Services from './Pages/Services';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Chatbot />
        <main>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/services" element={<Services />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contactUs" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/appointment" element={<Appointment />} /> {/* All lowercase route */}
         </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;