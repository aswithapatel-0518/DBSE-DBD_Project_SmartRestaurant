import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  // =========================================================
  // LOAD USER FROM LOCAL STORAGE
  // =========================================================
  const loadUser = () => {
    try {
      const storedUser = localStorage.getItem("loggedInUser");

      if (storedUser) {
        setLoggedInUser(JSON.parse(storedUser));
      } else {
        setLoggedInUser(null);
      }
    } catch (error) {
      console.error("Failed to load logged-in user:", error);
      setLoggedInUser(null);
    }
  };

  // =========================================================
  // LOAD CART COUNT
  // =========================================================
  const loadCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const count = cart.reduce(
        (total, item) => total + (Number(item.quantity) || 1),
        0
      );

      setCartCount(count);
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCartCount(0);
    }
  };

  // =========================================================
  // INITIAL LOAD + LISTEN FOR LOGIN/LOGOUT
  // =========================================================
  useEffect(() => {
    loadUser();
    loadCartCount();

    // Custom event used inside the same browser tab
    const handleLoginUpdate = () => {
      loadUser();
    };

    const handleCartUpdate = () => {
      loadCartCount();
    };

    window.addEventListener("loginUpdated", handleLoginUpdate);
    window.addEventListener("cartUpdated", handleCartUpdate);

    // Also listen for localStorage changes
    window.addEventListener("storage", handleLoginUpdate);

    return () => {
      window.removeEventListener("loginUpdated", handleLoginUpdate);
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("storage", handleLoginUpdate);
    };
  }, []);

  // =========================================================
  // UPDATE USER WHEN ROUTE CHANGES
  // =========================================================
  useEffect(() => {
    loadUser();
    loadCartCount();
  }, [location.pathname]);

  // =========================================================
  // LOGOUT
  // =========================================================
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("user");

    setLoggedInUser(null);

    // Tell the rest of the application that login changed
    window.dispatchEvent(new Event("loginUpdated"));

    navigate("/");

    alert("Logged out successfully!");
  };

  // =========================================================
  // USER DISPLAY NAME
  // =========================================================
  const displayName =
    loggedInUser?.fullName ||
    loggedInUser?.name ||
    loggedInUser?.email ||
    "";

  return (
    <nav className="navbar">

      {/* =====================================================
          LOGO
      ===================================================== */}
      <div className="navbar-logo">
        <Link to="/">
          <div className="logo-icon">🍽️</div>

          <div className="logo-text">
            <strong>Smart Restaurant</strong>
            <span>Order • Eat • Enjoy</span>
          </div>
        </Link>
      </div>

      {/* =====================================================
          NAVIGATION LINKS
      ===================================================== */}
      <div className="navbar-links">

        <Link to="/" className="nav-link">
          Home
        </Link>

        <Link to="/menu" className="nav-link">
          Menu
        </Link>

        {/* Customer links */}
        {loggedInUser?.role === "customer" && (
          <Link to="/orders" className="nav-link">
            My Orders
          </Link>
        )}

        {/* Kitchen link */}
        {loggedInUser?.role === "kitchen" && (
          <Link to="/kitchen" className="nav-link">
            Kitchen
          </Link>
        )}

        {/* Admin links */}
        {loggedInUser?.role === "admin" && (
          <>
            <Link to="/admin" className="nav-link">
              Admin
            </Link>

            <Link to="/tables" className="nav-link">
              Tables
            </Link>
          </>
        )}
      </div>

      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}
      <div className="navbar-right">

        {/* CART */}
        {loggedInUser?.role === "customer" && (
          <Link to="/cart" className="cart-link">
            🛒 Cart

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </Link>
        )}

        {/* =================================================
            LOGGED IN USER
        ================================================= */}
        {loggedInUser ? (
          <div className="navbar-user">

            <div className="user-avatar">
              {displayName.charAt(0).toUpperCase()}
            </div>

            <div className="user-info">
              <span className="welcome-text">
                Welcome
              </span>

              <strong>
                {displayName}
              </strong>
            </div>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>
        ) : (
          /* =================================================
             NOT LOGGED IN
          ================================================= */
          <div className="navbar-auth">

            <Link
              to="/login"
              className="login-nav-button"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="signup-nav-button"
            >
              Sign Up
            </Link>

          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;