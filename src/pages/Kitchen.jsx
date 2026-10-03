import React, { useEffect, useState } from "react";
import "./Kitchen.css";

const API_URL = "http://localhost:5000/api";

const Kitchen = () => {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // FETCH KITCHEN ORDERS
  // =========================================================
  const fetchOrders = async () => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/kitchen`);

      if (!response.ok) {
        throw new Error("Failed to fetch kitchen orders");
      }

      const data = await response.json();

      const fetchedOrders =
        data.orders ||
        data.data ||
        [];

      setOrders(fetchedOrders);

      // =====================================================
      // FETCH ITEMS FOR EVERY ORDER
      // =====================================================
      const itemsMap = {};

      await Promise.all(
        fetchedOrders.map(async (order) => {
          try {
            const itemResponse = await fetch(
              `${API_URL}/kitchen/${order.id}/items`
            );

            if (!itemResponse.ok) {
              console.error(
                `Failed to fetch items for order ${order.id}`
              );

              itemsMap[order.id] = [];
              return;
            }

            const itemData =
              await itemResponse.json();

            /*
              Backend currently returns:

              {
                success: true,
                orderItems: [...]
              }

              Also support:
              {
                success: true,
                items: [...]
              }

              OR:
              {
                items: [...]
              }

              OR directly:
              [...]
            */

            if (Array.isArray(itemData)) {
              itemsMap[order.id] = itemData;
            } else {
              itemsMap[order.id] =
                itemData.orderItems ||
                itemData.items ||
                itemData.data ||
                [];
            }

          } catch (itemError) {
            console.error(
              `Error loading items for order ${order.id}:`,
              itemError
            );

            itemsMap[order.id] = [];
          }
        })
      );

      setOrderItems(itemsMap);

    } catch (error) {
      console.error(
        "Kitchen orders error:",
        error
      );

      setError(
        error.message ||
          "Unable to load kitchen orders."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD + AUTO REFRESH
  // =========================================================
  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // =========================================================
  // UPDATE ORDER STATUS
  // =========================================================
  const updateStatus = async (
    orderId,
    newStatus
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/kitchen/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (
        !response.ok ||
        data.success === false
      ) {
        throw new Error(
          data.message ||
            "Failed to update order status"
        );
      }

      // Refresh orders
      await fetchOrders();

    } catch (error) {
      console.error(
        "Status update error:",
        error
      );

      alert(
        error.message ||
          "Unable to update order status."
      );
    }
  };

  // =========================================================
  // GET NEXT STATUS
  // =========================================================
  const getNextStatus = (status) => {
    switch (status) {
      case "New":
        return "Accepted";

      case "Accepted":
        return "Preparing";

      case "Preparing":
        return "Ready";

      case "Ready":
        return "Served";

      default:
        return null;
    }
  };

  // =========================================================
  // STATUS BUTTON TEXT
  // =========================================================
  const getStatusButtonText = (status) => {
    switch (status) {
      case "New":
        return "Accept Order";

      case "Accepted":
        return "Start Preparing";

      case "Preparing":
        return "Mark Ready";

      case "Ready":
        return "Mark Served";

      default:
        return "Completed";
    }
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================
  const formatTime = (date) => {
    if (!date) return "";

    try {
      return new Date(date).toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );
    } catch {
      return "";
    }
  };

  // =========================================================
  // LOADING
  // =========================================================
  if (loading) {
    return (
      <div className="kitchen-page">
        <div className="kitchen-loading">
          Loading kitchen orders...
        </div>
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================
  return (
    <div className="kitchen-page">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="kitchen-header">

        <div>
          <p className="kitchen-label">
            SMART RESTAURANT
          </p>

          <h1>
            Kitchen Dashboard
          </h1>

          <p className="kitchen-subtitle">
            Manage incoming orders and prepare food
            efficiently.
          </p>
        </div>

        <div className="kitchen-live">
          <span className="live-dot"></span>
          Live
        </div>

      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}
      {error && (
        <div className="kitchen-error">
          {error}
        </div>
      )}

      {/* =====================================================
          NO ORDERS
      ===================================================== */}
      {orders.length === 0 ? (

        <div className="no-orders">

          <div className="no-orders-icon">
            🍽️
          </div>

          <h2>
            No Orders Yet
          </h2>

          <p>
            New customer orders will appear here.
          </p>

        </div>

      ) : (

        /* ===================================================
           ORDER GRID
        =================================================== */
        <div className="kitchen-orders">

          {orders.map((order) => {

            /*
              IMPORTANT:
              The backend returns order items separately,
              stored using the order ID.
            */
            const items =
              orderItems[order.id] || [];

            const nextStatus =
              getNextStatus(order.status);

            return (

              <div
                className="kitchen-order-card"
                key={order.id}
              >

                {/* ===========================================
                    ORDER HEADER
                =========================================== */}
                <div className="order-card-header">

                  <div>

                    <span className="order-label">
                      ORDER
                    </span>

                    <h2>
                      #{order.order_number}
                    </h2>

                  </div>

                  <div className="order-time">
                    {formatTime(
                      order.created_at
                    )}
                  </div>

                </div>

                {/* ===========================================
                    STATUS
                =========================================== */}
                <div
                  className={`order-status status-${String(
                    order.status || ""
                  )
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {order.status}
                </div>

                {/* ===========================================
                    TABLE LOCATION
                =========================================== */}
                <div className="table-location">

                  <div className="table-icon">
                    🪑
                  </div>

                  <div>

                    <span>
                      SERVE TO
                    </span>

                    <strong>
                      {order.table_number
                        ? `TABLE ${order.table_number}`
                        : order.table_id
                        ? `TABLE ${order.table_id}`
                        : "TAKEAWAY"}
                    </strong>

                  </div>

                </div>

                {/* ===========================================
                    CUSTOMER
                =========================================== */}
                <div className="customer-section">

                  <div className="customer-icon">
                    👤
                  </div>

                  <div>

                    <span>
                      CUSTOMER
                    </span>

                    <strong>
                      {order.customer_name ||
                        "Customer"}
                    </strong>

                  </div>

                </div>

                {/* ===========================================
                    ORDER ITEMS
                =========================================== */}
                <div className="order-items-section">

                  <h3>
                    Order Items
                  </h3>

                  {items.length === 0 ? (

                    <div className="no-items">
                      No items found for this order.
                    </div>

                  ) : (

                    <div className="order-items-list">

                      {items.map(
                        (item, index) => (

                          <div
                            className="order-item"
                            key={
                              item.id ||
                              `${order.id}-${index}`
                            }
                          >

                            <div className="item-details">

                              <strong>
                                {item.name ||
                                  item.item_name ||
                                  "Food Item"}
                              </strong>

                              <span>
                                ₹
                                {Number(
                                  item.price || 0
                                ).toFixed(2)}
                              </span>

                            </div>

                            <div className="item-quantity">
                              ×{" "}
                              {item.quantity || 1}
                            </div>

                          </div>

                        )
                      )}

                    </div>

                  )}

                </div>

                {/* ===========================================
                    ORDER SUMMARY
                =========================================== */}
                <div className="order-summary">

                  <div>

                    <span>
                      Total Amount
                    </span>

                    <strong>
                      ₹
                      {Number(
                        order.total_amount || 0
                      ).toFixed(2)}
                    </strong>

                  </div>

                  

                </div>

                {/* ===========================================
                    SPECIAL INSTRUCTIONS
                =========================================== */}
                {order.instructions && (

                  <div className="special-instructions">

                    <div className="instruction-icon">
                      📝
                    </div>

                    <div>

                      <strong>
                        Special Instructions
                      </strong>

                      <p>
                        {order.instructions}
                      </p>

                    </div>

                  </div>

                )}

                {/* ===========================================
                    STATUS ACTION
                =========================================== */}
                {nextStatus && (

                  <button
                    className="accept-order-button"
                    onClick={() =>
                      updateStatus(
                        order.id,
                        nextStatus
                      )
                    }
                  >
                    {getStatusButtonText(
                      order.status
                    )}
                  </button>

                )}

              </div>

            );
          })}

        </div>

      )}

    </div>
  );
};

export default Kitchen;