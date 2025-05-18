import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ForgotPassword from "../components/ForgotPassword";
import "./login.css";

function Login() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { email, password } = formData;

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Login successful!");
        localStorage.setItem("token", data.token);

        if (data.username) {
          localStorage.setItem("username", data.username); // optional: keep for persistent login
          sessionStorage.setItem("username", data.username); // short-term session storage
          sessionStorage.setItem("role", "user"); // role set
        } else {
          console.warn("Username not received from backend");
        }

        console.log("Login successful, token stored:", data.token);
        history.push("/user");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      setError("Error logging in. Try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="custom-login-page">
      <div className="custom-left-section">
        <h2>Welcome to Psychotherapy Consultancy</h2>
        <p>
          Providing professional psychotherapy services to help you navigate life’s
          challenges.
        </p>
      </div>
      <div className="custom-right-section">
        <div className="custom-login-box">
          <h3>User Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="custom-input-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="custom-input"
              />
            </div>
            <div className="custom-input-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="custom-input"
              />
            </div>
            {error && <p className="custom-error-message">{error}</p>}
            {success && <p className="custom-success-message">{success}</p>}
            <div className="custom-options">
              <label>
                <input type="checkbox" /> Remember Me
              </label>
              <ForgotPassword />
            </div>
            <button type="submit" className="custom-login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
