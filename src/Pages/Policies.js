import React, { useState } from "react";

function Policies() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="pageContainer">
      <h1>Clinic Policies</h1>
      <p>Read our privacy policy, terms of service, and patient data usage policies.</p>

      {/* Policy Sections */}
      <div className="policy-sections">
        {policyData.map(({ title, content }, index) => (
          <div key={index} className="policy-section">
            <h2 onClick={() => toggleSection(index)} className="policy-title">
              {title} {openSection === index ? "▲" : "▼"}
            </h2>
            {openSection === index && <p className="policy-content">{content}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// Policy Data
const policyData = [
  {
    title: "Students Rights and Responsibilities Policy",
    content: "Details about students' rights and responsibilities at Carleton University."
  },
  {
    title: "General Policy Page for Carleton University",
    content: "General policies applicable to students, faculty, and staff."
  },
  {
    title: "Clinic Privacy Policy",
    content: "Carleton University Health and Counselling Services collects, uses, and discloses personal health information to serve clients and provide health care. Employees and staff must follow privacy laws including FIPPA and PHIPA."
  },
  {
    title: "Patient Data Usage Policy",
    content: "Health Services uses the Collaborative Health Record (CHR) system for electronic medical records, secured with multi-factor authentication and restricted access permissions."
  },
  {
    title: "Terms of Service",
    content: "Terms of service outlining conditions for using clinic services."
  },
  {
    title: "Chargeable Fees",
    content: "List of applicable fees for services, including late cancellations and no-shows."
  },
  {
    title: "Cancellation and No-Show Policy",
    content: "Appointments must be canceled at least 24 hours in advance. Missed appointments without prior cancellation will incur a fee. Monday appointments must be canceled by Friday at 4:30 p.m."
  },
  {
    title: "No-Show Information",
    content: "Failure to cancel or attend an appointment will result in a no-show fee. Contact us if you need scheduling assistance."
  },
  {
    title: "Communications Policy",
    content: "Clinic communications include emails, texts, and calls. Patients should ensure their contact information is up to date."
  },
  {
    title: "Privacy and Confidentiality",
    content: "Carleton University Health and Counselling Services maintains strict confidentiality unless legal obligations require disclosure, such as risk of harm, child abuse, court subpoenas, or reports of sexual abuse by a regulated health professional."
  },
  {
    title: "Limits of Confidentiality",
    content: "Information may be disclosed without consent if there is risk of harm, child abuse concerns, legal requirements, or mandated reporting by the College of Physicians and Surgeons of Ontario."
  }
];

export default Policies;