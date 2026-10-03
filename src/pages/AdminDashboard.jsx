import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const API_URL = "http://localhost:5000/api";

function AdminDashboard() {
  const [summary, setSummary] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeOrders: 0,
    totalCustomers: 0,
  });

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // =================================
  // LOAD DASHBOARD DATA
  // =================================

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [summaryResponse, ordersResponse] =
        await Promise.all([
          fetch(`${API_URL}/admin/dashboard`),
          fetch(`${API_URL}/admin/orders`),
        ]);

      const summaryData = await summaryResponse.json();
      const ordersData = await ordersResponse.json();

      // =================================
      // DASHBOARD SUMMARY
      // =================================

      if (summaryData.success) {
        const dashboard = summaryData.dashboard || {};

        setSummary({
          totalOrders: dashboard.orders || 0,

          totalRevenue: dashboard.revenue || 0,

          activeOrders: dashboard.activeOrders || 0,

          totalCustomers: dashboard.users || 0,
        });
      }

      // =================================
      // RECENT ORDERS
      // =================================

      if (ordersData.success) {
        setOrders(ordersData.orders || []);
      }
    } catch (error) {
      console.error(
        "Dashboard loading error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // =================================
  // INITIAL LOAD + AUTO REFRESH
  // =================================

  useEffect(() => {
    loadDashboard();

    const interval = setInterval(
      loadDashboard,
      10000
    );

    return () => clearInterval(interval);
  }, []);

  // =================================
  // STATUS CLASS
  // =================================

  const getStatusClass = (status) => {
    switch (status) {
      case "New":
        return "status-new";

      case "Accepted":
        return "status-accepted";

      case "Preparing":
        return "status-preparing";

      case "Ready":
        return "status-ready";

      case "Served":
        return "status-served";

      default:
        return "";
    }
  };

  // =================================
  // FORMAT DATE
  // =================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // =================================
  // UI
  // =================================

  return (
    <div className="admin-dashboard">

      {/* =================================
          HEADER
      ================================= */}

      <div className="admin-header">

        <div>
          <span className="admin-label">
            🛡️ ADMINISTRATION
          </span>

          <h1>
            Restaurant Dashboard
          </h1>

          <p>
            Monitor your restaurant,
            orders and daily operations.
          </p>
        </div>

        <button
          className="refresh-button"
          onClick={loadDashboard}
        >
          🔄 Refresh
        </button>

      </div>


      {/* =================================
          STATISTICS
      ================================= */}

      <div className="admin-stats">

        {/* TOTAL ORDERS */}

        <div className="admin-stat-card">

          <div className="stat-icon orders-icon">
            📋
          </div>

          <div>
            <span>Total Orders</span>

            <strong>
              {loading
                ? "..."
                : summary.totalOrders}
            </strong>

            <small>
              All restaurant orders
            </small>
          </div>

        </div>


        {/* TOTAL REVENUE */}

        <div className="admin-stat-card">

          <div className="stat-icon revenue-icon">
            ₹
          </div>

          <div>
            <span>Total Revenue</span>

            <strong>
              {loading
                ? "..."
                : `₹${Number(
                    summary.totalRevenue
                  ).toLocaleString("en-IN")}`}
            </strong>

            <small>
              From completed orders
            </small>
          </div>

        </div>


        {/* ACTIVE ORDERS */}

        <div className="admin-stat-card">

          <div className="stat-icon active-icon">
            🔥
          </div>

          <div>
            <span>Active Orders</span>

            <strong>
              {loading
                ? "..."
                : summary.activeOrders}
            </strong>

            <small>
              Currently in kitchen
            </small>
          </div>

        </div>


        {/* CUSTOMERS */}

        <div className="admin-stat-card">

          <div className="stat-icon customer-icon">
            👥
          </div>

          <div>
            <span>Customers</span>

            <strong>
              {loading
                ? "..."
                : summary.totalCustomers}
            </strong>

            <small>
              Registered customers
            </small>
          </div>

        </div>

      </div>


      {/* =================================
          QUICK ACTIONS
      ================================= */}

      <section className="admin-section">

        <div className="section-heading">

          <div>
            <h2>
              Quick Management
            </h2>

            <p>
              Manage important restaurant
              operations.
            </p>
          </div>

        </div>


        <div className="quick-actions">

          {/* MENU */}

          <Link
            to="/admin-menu"
            className="quick-card"
          >
            <div className="quick-icon">
              🍽️
            </div>

            <div>
              <h3>
                Menu Management
              </h3>

              <p>
                Add, edit or remove menu
                items.
              </p>
            </div>

            <span>→</span>
          </Link>


          {/* TABLES */}

          <Link
            to="/tables"
            className="quick-card"
          >
            <div className="quick-icon">
              🪑
            </div>

            <div>
              <h3>
                Table Management
              </h3>

              <p>
                View restaurant table
                availability.
              </p>
            </div>

            <span>→</span>
          </Link>


          {/* KITCHEN */}

          <Link
            to="/kitchen"
            className="quick-card"
          >
            <div className="quick-icon">
              👨‍🍳
            </div>

            <div>
              <h3>
                Kitchen Dashboard
              </h3>

              <p>
                Monitor active kitchen
                orders.
              </p>
            </div>

            <span>→</span>
          </Link>

        </div>

      </section>


      {/* =================================
          RECENT ORDERS
      ================================= */}

      <section className="admin-section">

        <div className="section-heading">

          <div>
            <h2>
              Recent Orders
            </h2>

            <p>
              Latest orders placed in
              the restaurant.
            </p>
          </div>

          <span className="live-indicator">
            <i></i>
            LIVE
          </span>

        </div>


        <div className="orders-table-wrapper">

          {loading ? (

            <div className="dashboard-loading">
              Loading orders...
            </div>

          ) : orders.length === 0 ? (

            <div className="empty-orders">

              <div>
                📋
              </div>

              <h3>
                No orders yet
              </h3>

              <p>
                Orders placed by customers
                will appear here.
              </p>

            </div>

          ) : (

            <table className="admin-orders-table">

              <thead>

                <tr>

                  <th>
                    Order
                  </th>

                  <th>
                    Customer
                  </th>

                  <th>
                    Table
                  </th>

                  <th>
                    Amount
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Time
                  </th>

                </tr>

              </thead>


              <tbody>

                {orders
                  .slice(0, 10)
                  .map((order) => (

                    <tr key={order.id}>

                      {/* ORDER */}

                      <td>
                        <strong className="order-number">
                          #{order.order_number}
                        </strong>
                      </td>


                      {/* CUSTOMER */}

                      <td>

                        <div className="customer-cell">

                          <div className="customer-avatar">
                            {order.customer_name
                              ?.charAt(0)
                              ?.toUpperCase() || "C"}
                          </div>

                          <span>
                            {order.customer_name}
                          </span>

                        </div>

                      </td>


                      {/* TABLE */}

                      <td>

                        <span className="table-badge">
                          {order.table_number ||
                            "Takeaway"}
                        </span>

                      </td>


                      {/* AMOUNT */}

                      <td>

                        <strong>
                          ₹
                          {Number(
                            order.total_amount
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={`order-status ${getStatusClass(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>

                      </td>


                      {/* TIME */}

                      <td>

                        <span className="order-time">
                          {formatDate(
                            order.created_at
                          )}
                        </span>

                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          )}

        </div>

      </section>


      {/* =================================
          FOOTER
      ================================= */}

      <div className="admin-footer">

        <span>
          🍽️ Smart Restaurant
        </span>

        <span>
          Restaurant Management System
        </span>

      </div>

    </div>
  );
}

export default AdminDashboard;