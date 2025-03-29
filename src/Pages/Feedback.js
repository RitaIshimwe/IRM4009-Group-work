import React, { useState } from "react";
import { motion } from "framer-motion"; // To add animations
import "../styles/Feedback.css"; // Make sure to include the updated CSS

function Feedback() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your feedback!");
    setFeedback(""); // Clear the feedback text area after submission
  };

  return (
    <div className="feedback-container">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="feedback-title"
      >
        We value your feedback!
      </motion.h1>
      
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        onSubmit={handleSubmit}
        className="feedback-form"
      >
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback here..."
          rows="5"
          cols="40"
          className="feedback-textarea"
        ></textarea>

        <div className="feedback-buttons">
          <button type="submit" className="submit-btn">Submit</button>
          <button
            type="button"
            className="reset-btn"
            onClick={() => setFeedback("")}
          >
            Reset
          </button>
        </div>
      </motion.form>
    </div>
  );
}

export default Feedback;
