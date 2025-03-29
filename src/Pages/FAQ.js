import React, { useState } from "react";
import "../styles/FAQ.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";  // Arrow icons

function FAQ() {
  console.log("FAQ Component Loaded!");

  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>

      {/* FAQ Items */}
      <div className={`faq-item ${openIndex === 0 ? "open" : ""}`}>
        <div className="faq-question" onClick={() => toggleQuestion(0)}>
          <h3>Do I need an appointment, or do you accept walk-ins?</h3>
          <div className="faq-arrow">
            {openIndex === 0 ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
        {openIndex === 0 && (
          <div className="faq-answer">
            <p>We recommend making an appointment, but we do accept walk-ins when available. However, appointments take priority.</p>
          </div>
        )}
      </div>

      <div className={`faq-item ${openIndex === 1 ? "open" : ""}`}>
        <div className="faq-question" onClick={() => toggleQuestion(1)}>
          <h3>What services and treatments do you offer?</h3>
          <div className="faq-arrow">
            {openIndex === 1 ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
        {openIndex === 1 && (
          <div className="faq-answer">
            <p>We offer a wide range of services, including general medical care, mental health support, lab testing, and specialized treatments. Please contact us for more details.</p>
          </div>
        )}
      </div>

      <div className={`faq-item ${openIndex === 2 ? "open" : ""}`}>
        <div className="faq-question" onClick={() => toggleQuestion(2)}>
          <h3>Do you provide specialized care, such as pediatric, dermatology, or physiotherapy services?</h3>
        </div>
        {openIndex === 2 && (
          <div className="faq-answer">
            <p>We provide basic services, but we can refer you to specialists for pediatric, dermatology, or physiotherapy needs.</p>
          </div>
        )}
      </div>

      <div className={`faq-item ${openIndex === 3 ? "open" : ""}`}>
        <div className="faq-question" onClick={() => toggleQuestion(3)}>
          <h3>Do you accept my insurance plan? What is covered?</h3>
        </div>
        {openIndex === 3 && (
          <div className="faq-answer">
            <p>We accept most major insurance plans. Coverage details can be provided during your appointment or consultation.</p>
          </div>
        )}
      </div>

      <div className={`faq-item ${openIndex === 4 ? "open" : ""}`}>
        <div className="faq-question" onClick={() => toggleQuestion(4)}>
          <h3>How do I access my medical records or test results?</h3>
        </div>
        {openIndex === 4 && (
          <div className="faq-answer">
            <p>You can access your medical records and test results through our online patient portal. Login details will be provided at your appointment.</p>
          </div>
        )}
      </div>

      <div className={`faq-item ${openIndex === 5 ? "open" : ""}`}>
        <div className="faq-question" onClick={() => toggleQuestion(5)}>
          <h3>Do you handle emergency cases, or should I visit a hospital for emergencies?</h3>
        </div>
        {openIndex === 5 && (
          <div className="faq-answer">
            <p>We handle non-life-threatening emergencies. For severe cases, we recommend visiting a hospital.</p>
          </div>
        )}
      </div>

      <div className={`faq-item ${openIndex === 6 ? "open" : ""}`}>
        <div className="faq-question" onClick={() => toggleQuestion(6)}>
          <h3>I have been called in for a meeting with Student Affairs, what can I do to be prepared?</h3>
        </div>
        {openIndex === 6 && (
          <div className="faq-answer">
            <p>Review the meeting notice, familiarize yourself with the Student Rights and Responsibilities Policy, and prepare any statements or resolutions for the meeting.</p>
          </div>
        )}
      </div>

      <div className={`faq-item ${openIndex === 7 ? "open" : ""}`}>
        <div className="faq-question" onClick={() => toggleQuestion(7)}>
          <h3>Can I book an appointment online or by phone?</h3>
        </div>
        {openIndex === 7 && (
          <div className="faq-answer">
            <p>Yes, appointments can be booked online via the CHR Connect App or Website, or by phone from 8:30 AM to 4:30 PM, Monday through Friday.</p>
          </div>
        )}
      </div>

      <div className={`faq-item ${openIndex === 8 ? "open" : ""}`}>
        <div className="faq-question" onClick={() => toggleQuestion(8)}>
          <h3>What should I do if I can't attend my meeting on the date provided? What happens if I don't attend?</h3>
        </div>
        {openIndex === 8 && (
          <div className="faq-answer">
            <p>If you can't attend, notify us at least two working days in advance. Failure to attend without proper notice may result in a decision in absentia.</p>
          </div>
        )}
      </div>

      <div className={`faq-item ${openIndex === 9 ? "open" : ""}`}>
        <div className="faq-question" onClick={() => toggleQuestion(9)}>
          <h3>Can I be penalized for things that happened off-campus?</h3>
        </div>
        {openIndex === 9 && (
          <div className="faq-answer">
            <p>Yes, Carleton University can take action for conduct occurring off-campus, such as at university events or through social media.</p>
          </div>
        )}
      </div>

      <div className={`faq-item ${openIndex === 10 ? "open" : ""}`}>
        <div className="faq-question" onClick={() => toggleQuestion(10)}>
          <h3>Who has access to my conduct history?</h3>
        </div>
        {openIndex === 10 && (
          <div className="faq-answer">
            <p>Only authorized staff have access to your conduct history unless consent is provided. In certain cases, information may be shared with emergency contacts or other professionals if there is a risk of harm.</p>
          </div>
        )}
      </div>

      <div className={`faq-item ${openIndex === 11 ? "open" : ""}`}>
        <div className="faq-question" onClick={() => toggleQuestion(11)}>
          <h3>Can I appeal a decision rendered by the Office of Student Affairs?</h3>
        </div>
        {openIndex === 11 && (
          <div className="faq-answer">
            <p>Yes, you can appeal a decision within 10 working days. Details on the appeal process will be provided in your outcome letter.</p>
          </div>
        )}
      </div>

      <div className={`faq-item ${openIndex === 12 ? "open" : ""}`}>
        <div className="faq-question" onClick={() => toggleQuestion(12)}>
          <h3>Privacy and Confidentiality Information</h3>
        </div>
        {openIndex === 12 && (
          <div className="faq-answer">
            <p>Carleton University Health Services follows privacy laws like FIPPA and PHIPA. Your information is protected and only shared under specific legal circumstances.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FAQ;
