import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Ensure this path matches your logo file
import logo from "../assets/MTBLogo.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8 || password.length > 24) {
      errors.push("8-24 characters");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("one lowercase letter");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("one number");
    }

    if (errors.length > 0) {
      return `Password must contain: ${errors.join(", ")}`;
    }
    return "";
  };

  const handleRegister = async () => {
    const passwordValidationError = validatePassword(password);

    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    // Basic email validation
    if (!email.includes("@") || !email.includes(".")) {
      setPasswordError("Please enter a valid email address.");
      return;
    }

    try {
      // Using the Vite proxy we set up earlier to talk to the FastAPI backend
      const response = await axios.post("/api/register", {
        email: email,
        password: password,
      });

      if (response.status === 200 || response.status === 201) {
        navigate("/login");
        setPasswordError("");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle specific errors sent back from your partner's Python code
        setPasswordError(error.response.data.detail || error.response.data.error || "Registration Error");
      } else {
        setPasswordError("Could not connect to the server. Is the backend running?");
      }
    }
  };

  return (
    <div style={styles.container}>
      <img
        src={logo}
        alt="MyTranslationBuddy Logo"
        style={styles.logo}
        onClick={() => navigate("/")}
      />

      <div style={styles.content}>
        <h1 style={styles.title}>Create Account</h1>

        <div style={styles.formGroup}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (passwordError) setPasswordError("");
            }}
            style={styles.input}
          />

          <div style={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError("");
              }}
              style={styles.input}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>

          <div style={styles.passwordContainer}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (passwordError) setPasswordError("");
              }}
              style={styles.input}
            />
            <button
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeButton}
            >
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>

          {passwordError && <p style={styles.errorText}>{passwordError}</p>}

          <div style={styles.passwordRequirements}>
            <p style={styles.requirementTitle}>Password must contain:</p>
            <ul style={styles.requirementList}>
              <li style={styles.requirementItem}>8-24 characters</li>
              <li style={styles.requirementItem}>At least one uppercase letter (A-Z)</li>
              <li style={styles.requirementItem}>At least one lowercase letter (a-z)</li>
              <li style={styles.requirementItem}>At least one number (0-9)</li>
            </ul>
          </div>

          <button onClick={handleRegister} style={styles.primaryButton}>
            Register
          </button>

          <button
            onClick={() => navigate("/login")}
            style={styles.secondaryButton}
          >
            Already Have an Account?
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: "2rem",
    position: "relative",
    boxSizing: "border-box", // Added to ensure padding doesn't affect total height
  },
  logo: {
    position: "absolute",
    top: "2rem",
    left: "2rem",
    height: "50px",
    cursor: "pointer",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 4rem)", // Adjusted for padding
    textAlign: "center",
    maxWidth: "400px", // Slimmed down the form width slightly for better aesthetics
    margin: "0 auto",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "800",
    background: "linear-gradient(90deg, #3a7bd5, #00d2ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "2rem",
    fontFamily: "'Poppins', sans-serif",
  },
  formGroup: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    width: "100%",
    padding: "1rem",
    borderRadius: "8px",
    border: "1px solid #ced4da",
    fontSize: "1rem",
    boxSizing: "border-box", // Prevents input from overflowing container
    transition: "border-color 0.2s",
  },
  passwordContainer: {
    position: "relative",
    width: "100%", // Fixed from 107%
    display: "flex",
    alignItems: "center",
  },
  eyeButton: {
    position: "absolute",
    right: "10px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1.2rem",
    color: "#6c757d",
    padding: "8px",
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    width: "100%", // Fixed from 107%
    padding: "1rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3a7bd5", // Changed to blue to match theme
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    marginTop: "1rem",
    transition: "all 0.2s ease",
  },
  secondaryButton: {
    width: "100%", // Fixed from 107%
    padding: "1rem",
    borderRadius: "8px",
    border: "1px solid #ced4da",
    backgroundColor: "transparent",
    color: "#495057",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  errorText: {
    color: "#dc3545",
    fontSize: "0.9rem",
    textAlign: "left",
    margin: "-0.5rem 0 0.5rem 0",
  },
  passwordRequirements: {
    width: "100%", // Fixed from 107%
    backgroundColor: "#e9ecef", // Slightly darker for better contrast
    borderRadius: "8px",
    padding: "1rem",
    boxSizing: "border-box",
    textAlign: "left",
  },
  requirementTitle: {
    fontWeight: "600",
    color: "#495057",
    marginBottom: "0.5rem",
    margin: 0, // Reset margin
  },
  requirementList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  requirementItem: {
    color: "#6c757d",
    fontSize: "0.9rem",
    marginTop: "0.25rem",
  },
};

export default Register;