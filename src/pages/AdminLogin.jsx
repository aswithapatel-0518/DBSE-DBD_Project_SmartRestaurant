import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Invalid admin credentials."
        );
      }

      // Only admin can access this page
      if (data.user.role !== "admin") {
        setError(
          "Access denied. This account is not an admin account."
        );
        return;
      }

      // Store logged-in admin
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Tell Navbar that login happened
      window.dispatchEvent(
        new Event("loginUpdated")
      );

      // Go to Admin Dashboard
      navigate("/admin");

    } catch (error) {
      console.error("Admin login error:", error);

      setError(
        error.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">

      {/* =====================================================
          LEFT SIDE
      ===================================================== */}

      <div className="admin-login-left">

        <div className="admin-brand-content">

          <div className="admin-logo-icon">
            🍽️
          </div>

          <div className="admin-small-title">
            SMART RESTAURANT
          </div>

          <h1>
            Welcome,
            <br />
            Admin 👋
          </h1>

          <p>
            Manage your restaurant operations,
            monitor orders and keep everything
            running smoothly.
          </p>

          <div className="admin-features">

            <div className="admin-feature">

              <div className="admin-feature-icon">
                📊
              </div>

              <div className="admin-feature-text">
                <strong>
                  Restaurant Dashboard
                </strong>

                <span>
                  Monitor your restaurant activity
                </span>
              </div>

            </div>


            <div className="admin-feature">

              <div className="admin-feature-icon">
                🍴
              </div>

              <div className="admin-feature-text">
                <strong>
                  Manage Menu
                </strong>

                <span>
                  Add and manage food items
                </span>
              </div>

            </div>


            <div className="admin-feature">

              <div className="admin-feature-icon">
                🪑
              </div>

              <div className="admin-feature-text">
                <strong>
                  Manage Tables
                </strong>

                <span>
                  Track restaurant table status
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}

      <div className="admin-login-right">

        <div className="admin-login-container">

          {/* HEADER */}

          <div className="admin-login-heading">

            <div className="admin-badge">
              🔐 ADMIN ACCESS
            </div>

            <h2>
              Admin Login
            </h2>

            <p>
              Sign in to manage your restaurant
            </p>

          </div>


          {/* LOGIN FORM */}

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="admin-input-group">

              <label>
                Email
              </label>

              <div className="admin-input-wrapper">

                <span className="admin-input-icon">
                  ✉️
                </span>

                <input
                  type="email"
                  placeholder="Enter admin email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="email"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="admin-input-group">

              <label>
                Password
              </label>

              <div className="admin-input-wrapper">

                <span className="admin-input-icon">
                  🔒
                </span>

                <input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="current-password"
                />

              </div>

            </div>


            {/* ERROR */}

            {error && (
              <div className="admin-login-error">
                {error}
              </div>
            )}


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="admin-login-button"
              disabled={loading}
            >
              {loading
                ? "Signing In..."
                : "Admin Sign In →"}
            </button>

          </form>


          {/* BACK TO USER LOGIN */}

          <div className="back-to-login">

            <Link to="/login">
              ← Back to User Login
            </Link>

          </div>


          {/* SECURITY MESSAGE */}

          <div className="admin-security-note">
            🔒 Admin access is restricted to
            authorized restaurant administrators.
          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminLogin;