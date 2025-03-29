import React, { useState } from 'react';
import { motion } from 'framer-motion';
import "../styles/Policies.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const policyData = [
    {
        title: "Students Rights and Responsibilities Policy",
        content: "Students Rights and Responsibilities Policy. You can find more information about it on the official Carleton website: " +
          "<a href='https://carleton.ca/studentaffairs/student-rights-and-responsibilities/' target='_blank' rel='noopener noreferrer'>Students Rights Website</a>"
      },
      {
        title: "General Policy Page for Carleton University",
        content: "General policies applicable to students, faculty, and staff. Visit the page for more details: " +
          "<a href='https://www.carleton.ca/general-policy' target='_blank' rel='noopener noreferrer'>General Policy Page</a>"
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
        title: "Cancellation and No-Show Policy",
        content: "We understand that unforeseen circumstances occasionally arise. If you need to cancel and/or reschedule an appointment, please provide at least 24 hours and/or as much notice as possible. Health Services offers a high volume of appointments to Carleton students, staff and faculty each day. Cancelling an appointment when you are not able to make it means you are freeing up an appointment spot for others who are waiting and could benefit from an earlier appointment. We understand unforeseen circumstances occasionally arise. We are confident you are doing an amazing job at managing your busy schedule as a student, including your health and your appointments with us. If you need to cancel an appointment, please provide at least 24 hours and/or as much notice as possible. Appointments cancelled in less than 24 hours will incur a fee. Please NOTE: If you have an appointment on a Monday and you wish to cancel it, you must notify us by 4:30 p.m. on Friday if possible."
      },
      {
        title: "No-Show Information",
        content: "If you do not cancel your appointment 24 business hours before and you do not attend, a “no-show” charge will apply. This is to ensure that you are booking services that meet your needs. If for some reason the schedule or services available are not a good match for you, please reach out to us so that we can help generate solutions."
      },
      {
        title: "Communications Policy",
        content: "Clinic communications include emails, texts, and calls. Patients should ensure their contact information is up to date."
      },
      {
        title: "Privacy and Confidentiality",
        content: "Carleton University Health and Counselling Services collects, uses, discloses personal health information to serve our clients and to provide health care. All Carleton University Health and Counselling employees, contract staff, consultants, student peer mentors and volunteers are required to abide by the privacy laws, including Freedom of Information and Protection of Privacy Act (FIPPA) and the Personal Health Information Protection Act (PHIPA). Health Services currently uses an electronic record keeping system called Collaborative Health Record (CHR). Access to medical records in CHR is restricted to Health and Counselling employees and information is protected through the use of technical and administrative safeguards such as restricted access permissions, multi-factor authentication and use of other industry standard security controls."
      },
      {
        title: "Limits of Confidentiality",
        content: "Under exceptional circumstances Carleton University Health and Counselling Services, through personnel authorized to make such decisions, may disclose personal health information of a client if necessary to comply with legal and/or professional obligations with or without their consent if there are reasonable grounds to believe that a client is at significant risk for the serious harm to themselves or another person, or if there are reasonable grounds to believe that a child is at risk of being abused or neglected. The client’s personal health information has been subpoenaed by a court of law. The client’s disclosed that they have been sexually abused by a regulated health professional, as per the College of Physicians and Surgeons of Ontario’s policy on mandatory and permissive reporting."
      }
];

function Policies() {
  const [openIndex, setOpenIndex] = useState(null);

  const togglePolicy = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="policies-container">
      <div className="policies-content">
        <h1> Clinic Policies</h1>
        {policyData.map((policy, index) => (
          <div key={index} className={`policy-item ${openIndex === index ? "open" : ""}`}>
            <div className="policy-title" onClick={() => togglePolicy(index)}>
              <h2>{policy.title}</h2>
              <div className="policy-arrow">
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>
            {openIndex === index && (
              <motion.div 
                className="policy-content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div dangerouslySetInnerHTML={{ __html: policy.content }} />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Policies;
