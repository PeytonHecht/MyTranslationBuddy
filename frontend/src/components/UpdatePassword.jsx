import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Ensure this path matches your logo file
import logo from "../assets/MTBLogo.png";

const UpdatePassword = () => {
  const [email, setEmail] = useState("");
  const [current_password, setCurrentPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new_password !== confirm_password) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!current_password) {
      setMessage("Please enter your current password.");
      return;
    }

    const payload = {
      email: email || localStorage.getItem("email"),
      current_password,
      new_password,
    };

    try {
      // Using the Vite proxy to route to your FastAPI backend
      const response = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password updated successfully! You can now log in with your new password.");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(data.error || data.detail || "Something went wrong.");
      }
    } catch (error) {
      console.error("Update password error:", error);
      setMessage("Could not connect to the server. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/profile");
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
        <div style={styles.card}>
          <h2 style={styles.title}>Update Password</h2>

          {message && (
            <p style={message.includes("successfully") ? styles.successMessage : styles.errorMessage}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Current Password</label>
              <div style={styles.passwordContainer}>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={current_password}
                  placeholder="Current password"
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  style={styles.passwordInput}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  style={styles.eyeButton}
                >
                  {showCurrentPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>New Password</label>
              <div style={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={new_password}
                  placeholder="New password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={styles.passwordInput}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Confirm New Password</label>
              <div style={styles.passwordContainer}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirm_password}
                  placeholder="Confirm new password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={styles.passwordInput}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeButton}
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <button type="submit" style={styles.primaryButton}>
                Reset Password
              </button>
              <button
                type="button"
                onClick={handleCancel}
                style={styles.secondaryButton}
              >
                Cancel
              </button>
            </div>
          </form>
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
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 4rem)",
  },
  card: {
    padding: "2.5rem",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
    width: "100%",
    maxWidth: "500px",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#212529",
    marginBottom: "1.5rem",
    textAlign: "center",
    background: "linear-gradient(90deg, #3a7bd5, #00d2ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontFamily: "'Poppins', sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#495057",
  },
  input: {
    padding: "0.9rem",
    borderRadius: "8px",
    border: "1px solid #ced4da",
    fontSize: "1rem",
    width: "100%",
    boxSizing: "border-box",
    transition: "all 0.2s ease",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  passwordInput: {
    padding: "0.9rem",
    paddingRight: "2.5rem", // Fixed typo and gave room for the eye icon
    borderRadius: "8px",
    border: "1px solid #ced4da",
    fontSize: "1rem",
    width: "100%",
    boxSizing: "border-box",
    transition: "all 0.2s ease",
  },
  eyeButton: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1.2rem",
    color: "#6c757d",
    padding: "0",
    margin: "0",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "1rem",
  },
  primaryButton: {
    padding: "0.9rem 1.5rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3a7bd5", // Matched theme color
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.2s ease",
  },
  secondaryButton: {
    padding: "0.9rem 1.5rem",
    borderRadius: "8px",
    border: "1px solid #ced4da",
    backgroundColor: "transparent",
    color: "#495057",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  successMessage: {
    color: "#28a745",
    backgroundColor: "#e8f5e9",
    padding: "0.75rem",
    borderRadius: "6px",
    marginBottom: "1rem",
    textAlign: "center",
  },
  errorMessage: {
    color: "#dc3545",
    backgroundColor: "#fce8e6",
    padding: "0.75rem",
    borderRadius: "6px",
    marginBottom: "1rem",
    textAlign: "center",
  },
};

export default UpdatePassword;