import React, { useState } from "react";
import "../styles/Chatbot.css";

// Predefined simple AI responses
const botResponses = {
  hello: "Hello! How can I assist you today?",
  "book appointment": "You can book an appointment on our website.",
  "policies": "You can find our policies under the 'Policies' section.",
  "contact": "You can contact us through the 'Contact Us' page.",
  "default": "Sorry, I didn't understand that. Can you please rephrase?",
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleMessage = () => {
    if (message.trim()) {
      // Add user message to conversation
      const userMessage = { sender: "user", text: message };
      setConversation((prev) => [...prev, userMessage]);

      // Bot response
      const botMessage = { sender: "bot", text: getBotResponse(message) };
      setConversation((prev) => [...prev, botMessage]);

      // Clear input field
      setMessage("");
    }
  };

  const getBotResponse = (userMessage) => {
    // Simple AI logic to match user message with predefined responses
    const lowerCaseMessage = userMessage.toLowerCase();
    return botResponses[lowerCaseMessage] || botResponses["default"];
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
            <button className="close-btn" onClick={toggleChat}>
              ✖
            </button>
          </div>

          <div className="chat-body">
            {conversation.map((msg, index) => (
              <div key={index} className={msg.sender === "user" ? "user-message" : "bot-message"}>
                <span>{msg.text}</span>
              </div>
            ))}
          </div>

          <div className="chat-footer">
            <input
              type="text"
              className="chat-input"
              placeholder="Ask something..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleMessage()}
            />
            <button className="send-btn" onClick={handleMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
