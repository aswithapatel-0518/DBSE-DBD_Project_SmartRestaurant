import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const API_URL = "http://localhost:5000/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================================================
  // LOGIN
  // =========================================================
  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid email or password");
      }

      const user = data.user;

      // =====================================================
      // ADMIN MUST USE ADMIN LOGIN
      // =====================================================
      if (user.role === "admin") {
        setError("Admin accounts must use Admin Access.");
        return;
      }

      // =====================================================
      // CHECK SELECTED ROLE
      // =====================================================
      if (user.role !== role) {
        setError(
          `This account is registered as ${user.role}. Please select the correct role.`
        );
        return;
      }

      // =====================================================
      // STORE ONLY SAFE USER INFORMATION
      // Password is NOT stored.
      // =====================================================
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // =====================================================
      // IMPORTANT:
      // Tell Navbar that login has happened.
      // This makes the username appear immediately
      // without refreshing the page.
      // =====================================================
      window.dispatchEvent(new Event("loginUpdated"));

      // =====================================================
      // REDIRECT
      // =====================================================
      if (user.role === "kitchen") {
        navigate("/kitchen");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* =====================================================
          LEFT SIDE
      ===================================================== */}
      <div className="login-left">

        <div className="login-overlay"></div>

        <div className="restaurant-content">

          {/* LOGO */}
          <div className="restaurant-logo">
            🍽️
          </div>

          {/* SMALL TITLE */}
          <div className="restaurant-small-title">
            SMART RESTAURANT
          </div>

          {/* MAIN HEADING */}
          <h1>
            Welcome Back <span>👋</span>
          </h1>

          {/* SUBTITLE */}
          <p className="restaurant-subtitle">
            Sign in to continue your restaurant experience.
          </p>

          {/* FEATURES */}
          <div className="restaurant-features">

            {/* FEATURE 1 */}
            <div className="feature-item">

              <div className="feature-icon">
                🍴
              </div>

              <div>
                <h3>Fresh Food</h3>
                <p>Prepared with care</p>
              </div>

            </div>

            {/* FEATURE 2 */}
            <div className="feature-item">

              <div className="feature-icon">
                ⚡
              </div>

              <div>
                <h3>Quick Service</h3>
                <p>Fast and easy ordering</p>
              </div>

            </div>

            {/* FEATURE 3 */}
            <div className="feature-item">

              <div className="feature-icon">
                ⭐
              </div>

              <div>
                <h3>Premium Experience</h3>
                <p>Designed for you</p>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}
      <div className="login-right">

        <div className="login-form-container">

          {/* HEADING */}
          <div className="login-heading">

            <h2>Sign In</h2>

            <p>
              Enter your details to access your account
            </p>

          </div>

          {/* =================================================
              ROLE SELECTION
          ================================================= */}
          <div className="role-section">

            <label className="section-label">
              Select your role
            </label>

            <div className="role-options">

              {/* CUSTOMER */}
              <button
                type="button"
                className={`role-card ${
                  role === "customer" ? "active" : ""
                }`}
                onClick={() => {
                  setRole("customer");
                  setError("");
                }}
              >

                <div className="role-icon">
                  👤
                </div>

                <div className="role-text">

                  <strong>
                    Customer
                  </strong>

                  <span>
                    Order food & track orders
                  </span>

                </div>

                {role === "customer" && (
                  <div className="role-check">
                    ✓
                  </div>
                )}

              </button>

              {/* KITCHEN */}
              <button
                type="button"
                className={`role-card ${
                  role === "kitchen" ? "active" : ""
                }`}
                onClick={() => {
                  setRole("kitchen");
                  setError("");
                }}
              >

                <div className="role-icon">
                  👨‍🍳
                </div>

                <div className="role-text">

                  <strong>
                    Kitchen
                  </strong>

                  <span>
                    Manage restaurant orders
                  </span>

                </div>

                {role === "kitchen" && (
                  <div className="role-check">
                    ✓
                  </div>
                )}

              </button>

            </div>
          </div>

          {/* =================================================
              LOGIN FORM
          ================================================= */}
          <form onSubmit={handleLogin}>

            {/* EMAIL */}
            <div className="input-group">

              <label>
                Email
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉️
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div className="input-group">

              <label>
                Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

              </div>

            </div>

            {/* ERROR */}
            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            {/* SIGN IN BUTTON */}
            <button
              type="submit"
              className="sign-in-button"
              disabled={loading}
            >
              {loading
                ? "Signing In..."
                : "Sign In →"}
            </button>

          </form>

          {/* =================================================
              CREATE ACCOUNT
          ================================================= */}
          <div className="create-account">

            Don't have an account?{" "}

            <Link to="/register">
              Create Account
            </Link>

          </div>

          {/* =================================================
              ADMIN ACCESS
          ================================================= */}
          <div className="admin-section">

            <div className="admin-line">

              <span></span>

              <p>
                ADMIN ACCESS
              </p>

              <span></span>

            </div>

            <Link
              to="/admin-login"
              className="admin-link"
            >
              🔐 Admin Login
            </Link>

          </div>

        </div>
      </div>

    </div>
  );
};

export default Login;