import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to ${email}`);
    setShowModal(false);
  };

  return (
    <>
      <p className="forgot-link" onClick={() => setShowModal(true)}>
        Forgot password?
      </p>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Reset Password</h2>
            <p>Enter your email to receive a password reset link.</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Send Link</button>
            </form>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
