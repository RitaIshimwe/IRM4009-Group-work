
import './App.css';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Contact from "./Pages/Contact";
import Services from "./Pages/Services";
import Policies from "./Pages/Policies";
import FAQ from "./Pages/FAQ";
import Feedback from "./Pages/Feedback";
import Appointment from "./Pages/Appointment";
import Auth from "./Pages/Auth";
import Chatbot from "./components/Chatbot"; 
import Footer from "./components/Footer";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Chatbot/>
        <main>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/auth" element={<Auth />} />  
         </Routes>
        </main>
        <Footer/>
      </Router>
      
    </div>
    
  );
}

export default App;
