import React, { useState, useEffect, useRef } from "react";
import "../styles/Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([
    { sender: "bot", text: "Hello! I'm your clinic assistant. Ask me about appointments, policies, or services.", typed: true }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const typingIntervalRef = useRef(null);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  const toggleChat = () => setIsOpen(!isOpen);

  const simulateTyping = (responseText) => {
    let i = 0;
    const tempConversation = [...conversation];
    const botResponseIndex = tempConversation.length;
    
    // Add empty bot message that we'll fill in
    tempConversation.push({
      sender: "bot",
      text: "",
      typed: false
    });
    setConversation(tempConversation);

    typingIntervalRef.current = setInterval(() => {
      if (i < responseText.length) {
        const updatedConversation = [...tempConversation];
        updatedConversation[botResponseIndex] = {
          ...updatedConversation[botResponseIndex],
          text: responseText.substring(0, i + 1),
          typed: i + 1 === responseText.length
        };
        setConversation(updatedConversation);
        i++;
      } else {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    }, 20); // Adjust typing speed here (lower = faster)
  };

  const handleMessage = () => {
    if (!message.trim() || isLoading) return;
  
    // Add user message
    const userMessage = { sender: "user", text: message, typed: true };
    setConversation((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);
  
    // Simulate a small delay for "processing"
    setTimeout(() => {
      const botResponse = getSimpleResponse(message);
      simulateTyping(botResponse);
      setIsLoading(false);
    }, 500); // Small delay to mimic thinking time
  };

  const getSimpleResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    const simpleResponses = {
      hello: "Hello! How can I assist you today?",
      hi: "Hi there! How can I help?",
      "book appointment": "You can book an appointment at our-website.com/booking or call (123) 456-7890",
      appointment: "For appointments, visit our-website.com/booking or call (123) 456-7890",
      "cancel appointment": "To cancel, please call us at (123) 456-7890",
      policies: "Our policies are available at our-website.com/policies or find it linked in the website footer ",
      hours: "We're open Monday-Friday, 9AM-5PM",
      contact: "Reach us at (123) 456-7890 or email clinic@camail.carleton.com",
      default: "I can help with appointments, policies, and general questions. Could you clarify?"
    };
    
    for (const [key, response] of Object.entries(simpleResponses)) {
      if (lowerCaseMessage.includes(key)) {
        return response;
      }
    }
    return simpleResponses.default;
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      <button className="chatbot-help-btn" onClick={toggleChat}>
        <span>AI Assistant</span>
        <span className="pulse-dot"></span>
      </button>

      {isOpen && (
        <div className="chatbox">
          <div className="chat-header">
            <div className="chat-title">
              <span className="ai-icon">🤖</span>
              <span>Clinic Assistant</span>
            </div>
            <button className="close-btn" onClick={toggleChat}>
              ✖
            </button>
          </div>

          <div className="chat-body">
            {conversation.map((msg, index) => (
              <div 
                key={index} 
                className={`message ${msg.sender === "user" ? "user-message" : "bot-message"} ${
                  !msg.typed ? 'typing' : ''
                }`}
              >
                {msg.text}
                {!msg.typed && <span className="typing-cursor">|</span>}
              </div>
            ))}
            {isLoading && (
              <div className="bot-message typing-indicator">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-footer">
            <input
              type="text"
              className="chat-input"
              placeholder="Ask about appointments, policies..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleMessage()}
              disabled={isLoading}
            />
            <button 
              className="send-btn" 
              onClick={handleMessage}
              disabled={isLoading || !message.trim()}
            >
              {isLoading ? (
                <span className="sending-spinner"></span>
              ) : (
                <span>Send</span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;