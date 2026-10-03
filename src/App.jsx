import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Kitchen from "./pages/Kitchen";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMenu from "./pages/AdminMenu";

import Tables from "./pages/Tables";

import "./App.css";


function App() {

  /*
   * Get currently logged-in user
   */
  const getLoggedInUser = () => {
    try {
      return JSON.parse(
        localStorage.getItem("loggedInUser")
      );
    } catch (error) {
      return null;
    }
  };


  /*
   * CUSTOMER PROTECTION
   *
   * Customer pages can be accessed only by
   * a logged-in customer.
   */
  const CustomerRoute = ({ children }) => {
    const user = getLoggedInUser();

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    if (user.role !== "customer") {
      if (user.role === "kitchen") {
        return (
          <Navigate
            to="/kitchen"
            replace
          />
        );
      }

      if (user.role === "admin") {
        return (
          <Navigate
            to="/admin"
            replace
          />
        );
      }

      return (
        <Navigate
          to="/login"
          replace
        />
      );
    }

    return children;
  };


  /*
   * KITCHEN PROTECTION
   *
   * Only Kitchen Department can
   * access Kitchen Dashboard.
   */
  const KitchenRoute = ({ children }) => {
    const user = getLoggedInUser();

    if (!user) {
      return (
        <Navigate
          to="/login"
          replace
        />
      );
    }

    if (user.role !== "kitchen") {
      if (user.role === "admin") {
        return (
          <Navigate
            to="/admin"
            replace
          />
        );
      }

      return (
        <Navigate
          to="/"
          replace
        />
      );
    }

    return children;
  };


  /*
   * ADMIN PROTECTION
   *
   * Only Admin can access Admin Dashboard.
   */
  const AdminRoute = ({ children }) => {
    const user = getLoggedInUser();

    if (!user) {
      return (
        <Navigate
          to="/admin-login"
          replace
        />
      );
    }

    if (user.role !== "admin") {
      if (user.role === "kitchen") {
        return (
          <Navigate
            to="/kitchen"
            replace
          />
        );
      }

      return (
        <Navigate
          to="/"
          replace
        />
      );
    }

    return children;
  };


  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* =========================================
            PUBLIC / CUSTOMER HOME
        ========================================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =========================================
            MENU
        ========================================= */}

        <Route
          path="/menu"
          element={<Menu />}
        />


        {/* =========================================
            LOGIN
        ========================================= */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* =========================================
            REGISTER
        ========================================= */}

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =========================================
            ADMIN LOGIN
            Completely separate login
        ========================================= */}

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />


        {/* =========================================
            CUSTOMER CART
        ========================================= */}

        <Route
          path="/cart"
          element={
            <CustomerRoute>
              <Cart />
            </CustomerRoute>
          }
        />


        {/* =========================================
            CUSTOMER CHECKOUT
        ========================================= */}

        <Route
          path="/checkout"
          element={
            <CustomerRoute>
              <Checkout />
            </CustomerRoute>
          }
        />


        {/* =========================================
            CUSTOMER ORDERS
        ========================================= */}

        <Route
          path="/orders"
          element={
            <CustomerRoute>
              <Orders />
            </CustomerRoute>
          }
        />


        {/* =========================================
            KITCHEN DASHBOARD
            ONLY kitchen role
        ========================================= */}

        <Route
          path="/kitchen"
          element={
            <KitchenRoute>
              <Kitchen />
            </KitchenRoute>
          }
        />


        {/* =========================================
            ADMIN DASHBOARD
            ONLY admin role
        ========================================= */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />


        {/* =========================================
            ADMIN MENU MANAGEMENT
            ONLY admin role
        ========================================= */}

        <Route
          path="/admin-menu"
          element={
            <AdminRoute>
              <AdminMenu />
            </AdminRoute>
          }
        />


        {/* =========================================
            TABLE MANAGEMENT
            Admin only
        ========================================= */}

        <Route
          path="/tables"
          element={
            <AdminRoute>
              <Tables />
            </AdminRoute>
          }
        />


        {/* =========================================
            UNKNOWN URL
        ========================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;