import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Ensure this path matches your logo file
import logo from "../assets/MTBLogo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Using the Vite proxy to talk to the backend securely
      const response = await axios.post("/api/login", {
        email: email,
        password: password
      });

      if (response.status === 200) {
        localStorage.setItem('email', email);
        navigate("/profile");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Checking for standard error formats
        setErrorMsg(error.response.data.error || error.response.data.detail || "Invalid login credentials.");
      } else {
        setErrorMsg("Could not connect to the server. Is the backend running?");
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
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Log in to access your translation guides</p>

        <div style={styles.formGroup}>
          {errorMsg && <p style={styles.errorText}>{errorMsg}</p>}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errorMsg) setErrorMsg("");
            }}
            style={styles.input}
          />

          <div style={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              style={styles.passwordInput}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>

          <button onClick={handleLogin} style={styles.primaryButton}>
            Login
          </button>

          <button onClick={() => navigate("/register")} style={styles.secondaryButton}>
            Don't have an account? Sign Up
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
    boxSizing: "border-box",
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
    minHeight: "calc(100vh - 4rem)",
    textAlign: "center",
    maxWidth: "400px",
    margin: "0 auto",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "800",
    background: "linear-gradient(90deg, #3a7bd5, #00d2ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "0.5rem",
    fontFamily: "'Poppins', sans-serif",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#6c757d",
    marginBottom: "2rem",
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
    boxSizing: "border-box", // Prevents input from overflowing
    transition: "border-color 0.2s",
  },
  passwordContainer: {
    position: "relative",
    width: "100%", // Fixed from 107%
    display: "flex",
    alignItems: "center",
  },
  passwordInput: {
    width: "100%",
    padding: "1rem",
    paddingRight: "40px", // Leaves space for the eye icon
    borderRadius: "8px",
    border: "1px solid #ced4da",
    fontSize: "1rem",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
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
    backgroundColor: "#3a7bd5", // Matched blue theme
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    marginTop: "0.5rem",
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
    fontSize: "0.95rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  errorText: {
    color: "#dc3545",
    backgroundColor: "rgba(220, 53, 69, 0.1)",
    padding: "0.8rem",
    borderRadius: "8px",
    fontSize: "0.9rem",
    textAlign: "center",
    margin: "0",
  },
};

export default Login;