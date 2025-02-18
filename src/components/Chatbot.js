import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-help-btn" onClick={toggleChat}>
        Chatbot Help
      </button>

      {isOpen && (
        <div className="chatbox">
          <div className="chat-header">
            <span>AI Chatbot</span>
            <button className="close-btn" onClick={toggleChat}>✖</button>
          </div>
          <div className="chat-body">
            <input
              type="text"
              className="chat-input"
              placeholder="Ask something..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;