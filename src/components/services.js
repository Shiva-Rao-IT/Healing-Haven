import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./services.css";

const Services = () => {
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      Modal.setAppElement(root);
    }
  }, []);

  const servicesData = [
    { title: "Individual Therapy", description: "One-on-one sessions to help you navigate personal challenges and improve mental well-being.", icon: "🧠" },
    { title: "Couples Therapy", description: "Sessions designed to enhance communication and resolve conflicts in relationships.", icon: "❤️" },
    { title: "Group Therapy", description: "Join a supportive group setting to share experiences and gain insights.", icon: "👥" },
    { title: "Child and Adolescent Therapy", description: "Specialized therapy for young individuals dealing with various emotional challenges.", icon: "👶" },
    { title: "Online Therapy", description: "Access professional support from the comfort of your home through secure online sessions.", icon: "💻" },
    { title: "Career & Life Coaching", description: "Guidance and support to help you achieve personal and professional goals.", icon: "🎯" },
    { title: "Self Assessment", description: "Take self-assessment tests to gain insight into your mental health.", icon: "📝" },
  ];

  const therapyServices = {
    "Individual Therapy": ["Stress Management", "Depression Counseling", "Anxiety Therapy", "Self-Improvement"],
    "Couples Therapy": ["Relationship Counseling", "Marriage Therapy", "Conflict Resolution", "Pre-Marital Counseling"],
    "Group Therapy": ["Ex-Defence Personnel", "Widows", "Divorcees", "LGBTQ+ Support", "Substance Recovery Groups"],
    "Child and Adolescent Therapy": ["Behavioral Therapy", "Academic Stress Management", "Bullying Support", "Parental Guidance"],
    "Online Therapy": ["Virtual Individual Sessions", "Video Counseling", "Text-Based Therapy", "Phone Consultations"],
    "Career & Life Coaching": ["Career Counseling", "Goal Setting", "Work-Life Balance", "Entrepreneurship Guidance"],
  };

  const selfAssessmentSubServices = ["ADHD", "OCD", "Anxiety", "Depression", "PTSD"];

  const selfAssessmentQuestionBank = {
    ADHD: [
      { id: 1, question: "Do you often struggle to pay attention to details?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
      { id: 2, question: "How often do you find it hard to focus on tasks?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
      { id: 3, question: "Do you frequently lose things needed for tasks?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
      { id: 4, question: "Are you often forgetful in daily activities?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    ],
    OCD: [
      { id: 5, question: "Do you feel the urge to check things repeatedly?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
      { id: 6, question: "Do unwanted thoughts disturb your daily life?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
      { id: 7, question: "Do you wash your hands excessively?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
      { id: 8, question: "Do you perform rituals to reduce anxiety?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    ],
    Anxiety: [
      { id: 9, question: "How often do you feel nervous or on edge?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
      { id: 10, question: "Do you find it hard to control worrying?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
      { id: 11, question: "Do you avoid situations because of anxiety?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
      { id: 12, question: "Do you experience panic attacks?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    ],
    Depression: [
      { id: 13, question: "Do you often feel sad or hopeless?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
      { id: 14, question: "Have you lost interest in activities you used to enjoy?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
      { id: 15, question: "Do you have trouble sleeping or oversleeping?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
      { id: 16, question: "Do you feel worthless or guilty often?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    ],
    PTSD: [
      { id: 17, question: "Do you experience flashbacks or disturbing memories?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
      { id: 18, question: "Do you avoid things that remind you of a traumatic event?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
      { id: 19, question: "Do you feel hyper-alert or easily startled?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
      { id: 20, question: "Do you have nightmares related to past trauma?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    ],
  };



  const [showForm, setShowForm] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showLoginWarning, setShowLoginWarning] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    spouseName: "",
    childName: "",
    mobile: "",
    email: "",
    date: "",
    time: "",
    service: "",
  });

  const [isSelfAssessmentOpen, setIsSelfAssessmentOpen] = useState(false);
  const [selectedSubTest, setSelectedSubTest] = useState("");
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [assessmentReport, setAssessmentReport] = useState(null);


  const today = new Date();
  today.setDate(today.getDate() + 1);
  const minDate = today.toISOString().split("T")[0];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextToPayment = (e) => {
    e.preventDefault();
    setShowPaymentPopup(true);
  };

  const handleFinalSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowPaymentPopup(false);
      setShowLoginWarning(true);
      return;
    }

    const appointmentData = {
      name: formData.name,
      spouseName: formData.spouseName,
      childName: formData.childName,
      mobile: formData.mobile,
      email: formData.email,
      date: formData.date,
      time: formData.time,
      mainService: selectedService,
      subService: formData.service,
    };

    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccessPopup(true);
        setShowForm(false);
        setShowPaymentPopup(false);
        setFormData({
          name: "",
          spouseName: "",
          childName: "",
          mobile: "",
          email: "",
          date: "",
          time: "",
          service: "",
        });
      } else {
        setShowLoginWarning(true);
      }
    } catch (err) {
      console.error(err);
      setShowLoginWarning(true);
    }
  };

  const handleAssessmentChange = (questionId, value) => {
    setAssessmentAnswers({ ...assessmentAnswers, [questionId]: value });
  };

  const submitAssessment = () => {
    const questions = selfAssessmentQuestionBank[selectedSubTest] || [];
    const score = questions.reduce((acc, q) => {
      const answer = assessmentAnswers[q.id];
      const index = q.options.indexOf(answer);
      return acc + index;
    }, 0);

    let result = "";
    if (score <= 1) result = "You show minimal signs of " + selectedSubTest + ".";
    else if (score <= 3) result = "Mild signs of " + selectedSubTest + " detected.";
    else if (score <= 5) result = "Moderate signs of " + selectedSubTest + ". Consider professional help.";
    else result = "High risk of " + selectedSubTest + ". We strongly recommend seeking professional support.";

    setAssessmentReport(result);
  };

  return (
    <div className="services-container">
      <h1 className="services-title">Our Services</h1>
      <p className="services-description">Explore the range of therapy services we offer to support your mental health journey.</p>
      <div className="services-grid">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="service-card"
            onClick={() => {
              if (service.title === "Self Assessment") {
                setIsSelfAssessmentOpen(true);
                // You can handle self-assessment here
              } else {
                setSelectedService(service.title);
                setFormData({
                  name: "",
                  spouseName: "",
                  childName: "",
                  mobile: "",
                  email: "",
                  date: "",
                  time: "",
                  service: therapyServices[service.title]?.[0] || "",
                });
                setShowForm(true);
              }
            }}
          >
            <div className="service-icon">{service.icon}</div>
            <h2 className="service-title">{service.title}</h2>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Appointment Modal */}
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-form">
            <h2>Book an Appointment for {selectedService}</h2>
            <form onSubmit={handleNextToPayment}>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
              {selectedService === "Couples Therapy" && (
                <>
                  <label>Spouse Name:</label>
                  <input type="text" name="spouseName" value={formData.spouseName} onChange={handleInputChange} required />
                </>
              )}
              {selectedService === "Child and Adolescent Therapy" && (
                <>
                  <label>Child's Name:</label>
                  <input type="text" name="childName" value={formData.childName} onChange={handleInputChange} required />
                </>
              )}
              <label>Mobile Number:</label>
              <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} required />
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              <label>Date:</label>
              <input type="date" name="date" value={formData.date} min={minDate} onChange={handleInputChange} required />
              <label>Preferred Time Slot:</label>
              <select name="time" value={formData.time} onChange={handleInputChange} required>
                <option value="">Select Time</option>
                {["10:00 AM - 12:00 PM", "12:00 PM - 2:00 PM", "2:00 PM - 4:00 PM", "4:00 PM - 6:00 PM", "6:00 PM - 8:00 PM"].map((slot, index) => (
                  <option key={index} value={slot}>{slot}</option>
                ))}
              </select>
              <label>Service:</label>
              <select name="service" value={formData.service} onChange={handleInputChange} required>
                {therapyServices[selectedService]?.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              <button type="submit" className="submit-appointment">Next</button>
              <button type="button" className="close-btn" onClick={() => setShowForm(false)}>Close</button>
            </form>
          </div>
        </div>
      )}

      {/* Self Assessment Modal */}
      <Modal
        isOpen={isSelfAssessmentOpen}
        onRequestClose={() => {
          setIsSelfAssessmentOpen(false);
          setSelectedSubTest("");
          setAssessmentReport(null);
          setAssessmentAnswers({});
        }}
        contentLabel="Self Assessment"
        className="popup-form"
        overlayClassName="popup-overlay"
      >
        <h2>📝 Self Assessment</h2>
        {!selectedSubTest ? (
          <>
            <p>Please select a test category:</p>
            <select value={selectedSubTest} onChange={(e) => setSelectedSubTest(e.target.value)}>
              <option value="">-- Select a Test --</option>
              {selfAssessmentSubServices.map((type, i) => (
                <option key={i} value={type}>{type}</option>
              ))}
            </select>
            <button className="close-btn" onClick={() => {
              setIsSelfAssessmentOpen(false);
              setSelectedSubTest("");
              setAssessmentReport(null);
              setAssessmentAnswers({});
            }}>Close</button>
          </>
        ) : assessmentReport ? (
          <>
            <p>{assessmentReport}</p>
            <button className="submit-appointment" onClick={() => {
              setIsSelfAssessmentOpen(false);
              setSelectedSubTest("");
              setAssessmentReport(null);
              setAssessmentAnswers({});
            }}>Close</button>
          </>
        ) : (
          <>
            {selfAssessmentQuestionBank[selectedSubTest].map((q) => (
              <div key={q.id} style={{ marginBottom: "20px" }}>
                <p><strong>{q.question}</strong></p>
                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                  {q.options.map((opt, i) => (
                    <label key={i} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <input
                        type="radio"
                        name={`q${q.id}`}
                        value={opt}
                        checked={assessmentAnswers[q.id] === opt}
                        onChange={() => handleAssessmentChange(q.id, opt)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button className="submit-appointment" onClick={submitAssessment}>Submit</button>
            <button className="close-btn" onClick={() => {
              setIsSelfAssessmentOpen(false);
              setSelectedSubTest("");
              setAssessmentReport(null);
              setAssessmentAnswers({});
            }}>Close</button>
          </>
        )}
      </Modal>

      {/* Payment Modal */}
      <Modal
        isOpen={showPaymentPopup}
        onRequestClose={() => setShowPaymentPopup(false)}
        contentLabel="Payment Modal"
        className="popup-form"
        overlayClassName="popup-overlay"
      >
        <h2>💳 Select Payment Plan</h2>
        <p>Please choose a plan and fill in your payment details.</p>
        <label>Choose Plan:</label>
        <select required>
          <option value="">-- Select a Payment Plan --</option>
          <option value="one-time">One-Time Fee – ₹299</option>
          <option value="monthly">Monthly Fee – ₹999/month</option>
          <option value="yearly">Yearly Fee – ₹9999/year</option>
        </select>
        <div className="payment-card-box">
          <label>Cardholder Name</label>
          <input type="text" placeholder="John Doe" required />
          <label>Card Number</label>
          <input type="text" placeholder="1234 5678 9012 3456" maxLength="19" required />
          <label>Expiry Date</label>
          <input type="text" placeholder="MM/YY" maxLength="5" required />
          <label>CVV</label>
          <input type="password" placeholder="123" maxLength="4" required />
        </div>
        <button className="submit-appointment" onClick={handleFinalSubmit}>Next</button>
        <button className="close-btn" onClick={() => setShowPaymentPopup(false)}>Cancel</button>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessPopup}
        onRequestClose={() => setShowSuccessPopup(false)}
        contentLabel="Success Modal"
        className="popup-form"
        overlayClassName="popup-overlay"
      >
        <h2 style={{ color: "#4CAF50", textAlign: "center" }}>Appointment Confirmed!</h2>
        <p style={{ textAlign: "center", marginTop: "10px", color: "#333" }}>
          Your appointment for <strong>{selectedService}</strong> has been booked successfully.
        </p>
        <button className="submit-appointment" style={{ marginTop: "20px" }} onClick={() => setShowSuccessPopup(false)}>Close</button>
      </Modal>


      {/* Login Required Warning Modal */}
      <Modal
        isOpen={showLoginWarning}
        onRequestClose={() => setShowLoginWarning(false)}
        contentLabel="Login Required"
        className="popup-form"
        overlayClassName="popup-overlay"
      >
        <h2 style={{ color: "#e74c3c", textAlign: "center" }}>⚠ Login Required</h2>
        <p style={{ textAlign: "center", marginTop: "10px", color: "#555" }}>
          You must be logged in to book an appointment.
        </p>
        <button className="submit-appointment" onClick={() => setShowLoginWarning(false)}>Okay</button>
      </Modal>
    </div>
  );
};

export default Services;
