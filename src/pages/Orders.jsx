import { useEffect, useState } from "react";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     LOAD ORDERS FROM MYSQL
  ========================= */

  const loadOrders = async () => {
    try {
      setLoading(true);

      /* =========================
         GET ALL ORDERS
      ========================= */

      const response = await fetch(
        "http://localhost:5000/api/orders"
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load orders"
        );
      }

      /* =========================
         GET ITEMS FOR EACH ORDER
      ========================= */

      const ordersWithItems = await Promise.all(
        data.orders.map(async (order) => {
          try {
            const itemsResponse = await fetch(
              `http://localhost:5000/api/order-items/${order.id}`
            );

            const itemsData =
              await itemsResponse.json();

            return {
              id: order.order_number,
              databaseId: order.id,

              customerName:
                order.customer_name,

              phone:
                order.customer_phone,

              table:
                order.table_number || "-",

              instructions:
                order.instructions || "",

              paymentMethod:
                order.payment_method,

              items:
                itemsData.success
                  ? itemsData.orderItems
                  : [],

              total:
                Number(order.total_amount),

              status:
                order.status || "New",

              date:
                order.created_at
                  ? new Date(
                      order.created_at
                    ).toLocaleString()
                  : "-",
            };
          } catch (error) {
            console.error(
              `Failed to load items for order ${order.id}:`,
              error
            );

            return {
              id: order.order_number,
              databaseId: order.id,

              customerName:
                order.customer_name,

              phone:
                order.customer_phone,

              table:
                order.table_number || "-",

              instructions:
                order.instructions || "",

              paymentMethod:
                order.payment_method,

              items: [],

              total:
                Number(order.total_amount),

              status:
                order.status || "New",

              date:
                order.created_at
                  ? new Date(
                      order.created_at
                    ).toLocaleString()
                  : "-",
            };
          }
        })
      );

      setOrders(ordersWithItems);
    } catch (error) {
      console.error(
        "Failed to load orders from MySQL:",
        error
      );

      /*
       * Fallback to localStorage
       * so the page doesn't become blank
       * if the backend is temporarily unavailable.
       */

      const savedOrders =
        JSON.parse(
          localStorage.getItem("orders")
        ) || [];

      setOrders(savedOrders);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     INITIAL LOAD
  ========================= */

  useEffect(() => {
    loadOrders();

    window.addEventListener(
      "ordersUpdated",
      loadOrders
    );

    window.addEventListener(
      "storage",
      loadOrders
    );

    return () => {
      window.removeEventListener(
        "ordersUpdated",
        loadOrders
      );

      window.removeEventListener(
        "storage",
        loadOrders
      );
    };
  }, []);

  /* =========================
     GET STATUS CLASS
  ========================= */

  const getStatusClass = (status) => {
    return status
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  return (
    <main className="orders-page">

      {/* =========================
          ORDERS HEADER
      ========================= */}

      <section className="orders-header">

        <div>

          <p>
            📦 MY ORDERS
          </p>

          <h1>
            Track Your
            <span>
              Orders
            </span>
          </h1>

          <span>
            Check your recent orders and
            see their current status.
          </span>

        </div>

        <div className="orders-header-icon">
          📋
        </div>

      </section>

      {/* =========================
          ORDERS CONTENT
      ========================= */}

      <section className="orders-content">

        <div className="orders-title-row">

          <div>

            <h2>
              Recent Orders
            </h2>

            <p>
              View your order history and status.
            </p>

          </div>

          <a
            href="/menu"
            className="order-food-button"
          >
            + Order Food
          </a>

        </div>

        {/* =========================
            LOADING
        ========================= */}

        {loading ? (

          <div className="orders-empty-info">

            <div>
              ⏳
            </div>

            <h3>
              Loading your orders...
            </h3>

            <p>
              Please wait while we fetch
              your orders.
            </p>

          </div>

        ) : orders.length > 0 ? (

          /* =========================
             ORDERS LIST
          ========================= */

          <div className="orders-list">

            {orders.map((order) => {

              const status =
                order.status ||
                "New";

              const isAccepted =
                status === "Accepted" ||
                status === "Preparing" ||
                status === "Ready" ||
                status === "Served";

              const isPreparing =
                status === "Preparing" ||
                status === "Ready" ||
                status === "Served";

              const isReady =
                status === "Ready" ||
                status === "Served";

              const isServed =
                status === "Served";

              return (

                <div
                  className="order-card"
                  key={order.databaseId || order.id}
                >

                  {/* =========================
                      ORDER TOP
                  ========================= */}

                  <div className="order-card-top">

                    <div>

                      <span className="order-label">
                        ORDER ID
                      </span>

                      <h3>
                        {order.id}
                      </h3>

                    </div>

                    <span
                      className={`order-status ${getStatusClass(
                        status
                      )}`}
                    >
                      {status}
                    </span>

                  </div>

                  {/* =========================
                      ORDER DETAILS
                  ========================= */}

                  <div className="order-card-details">

                    <div className="order-detail">

                      <span>
                        🕐
                      </span>

                      <div>

                        <small>
                          Date & Time
                        </small>

                        <strong>
                          {order.date}
                        </strong>

                      </div>

                    </div>

                    <div className="order-detail">

                      <span>
                        🪑
                      </span>

                      <div>

                        <small>
                          Table
                        </small>

                        <strong>
                          {order.table}
                        </strong>

                      </div>

                    </div>

                    <div className="order-detail">

                      <span>
                        💰
                      </span>

                      <div>

                        <small>
                          Total Amount
                        </small>

                        <strong>
                          ₹{order.total}
                        </strong>

                      </div>

                    </div>

                    <div className="order-detail">

                      <span>
                        💳
                      </span>

                      <div>

                        <small>
                          Payment
                        </small>

                        <strong>
                          {order.paymentMethod}
                        </strong>

                      </div>

                    </div>

                  </div>

                  {/* =========================
                      ORDER ITEMS
                  ========================= */}

                  <div className="order-items-list">

                    <span>
                      🍽️ Items
                    </span>

                    {order.items &&
                    order.items.length > 0 ? (

                      order.items.map(
                        (item) => (

                          <p
                            key={item.id}
                          >
                            {item.name} ×{" "}
                            {item.quantity}
                          </p>

                        )
                      )

                    ) : (

                      <p>
                        No item details available.
                      </p>

                    )}

                  </div>

                  {/* =========================
                      SPECIAL INSTRUCTIONS
                  ========================= */}

                  {order.instructions && (

                    <div className="order-instructions">

                      <strong>
                        📝 Special Instructions
                      </strong>

                      <p>
                        {order.instructions}
                      </p>

                    </div>

                  )}

                  {/* =========================
                      ORDER PROGRESS
                  ========================= */}

                  <div className="order-progress">

                    {/* NEW */}

                    <div className="progress-step completed">

                      <span>
                        ✓
                      </span>

                      <small>
                        New
                      </small>

                    </div>

                    <div className="progress-line completed-line"></div>

                    {/* ACCEPTED */}

                    <div
                      className={
                        isAccepted
                          ? "progress-step completed"
                          : "progress-step"
                      }
                    >

                      <span>
                        ✓
                      </span>

                      <small>
                        Accepted
                      </small>

                    </div>

                    <div
                      className={
                        isAccepted
                          ? "progress-line completed-line"
                          : "progress-line"
                      }
                    ></div>

                    {/* PREPARING */}

                    <div
                      className={
                        isPreparing
                          ? "progress-step completed"
                          : "progress-step"
                      }
                    >

                      <span>
                        👨‍🍳
                      </span>

                      <small>
                        Preparing
                      </small>

                    </div>

                    <div
                      className={
                        isPreparing
                          ? "progress-line completed-line"
                          : "progress-line"
                      }
                    ></div>

                    {/* READY */}

                    <div
                      className={
                        isReady
                          ? "progress-step completed"
                          : "progress-step"
                      }
                    >

                      <span>
                        ✓
                      </span>

                      <small>
                        Ready
                      </small>

                    </div>

                    <div
                      className={
                        isReady
                          ? "progress-line completed-line"
                          : "progress-line"
                      }
                    ></div>

                    {/* SERVED */}

                    <div
                      className={
                        isServed
                          ? "progress-step completed"
                          : "progress-step"
                      }
                    >

                      <span>
                        🍽️
                      </span>

                      <small>
                        Served
                      </small>

                    </div>

                  </div>

                  {/* =========================
                      ORDER BOTTOM
                  ========================= */}

                  <div className="order-card-bottom">

                    <span>
                      Thank you for ordering
                      with us ❤️
                    </span>

                    <button
                      className="view-order-button"
                      onClick={() =>
                        alert(
                          `Order ${order.id}\n\n` +
                          `Customer: ${order.customerName}\n` +
                          `Table: ${order.table}\n` +
                          `Payment: ${order.paymentMethod}\n` +
                          `Status: ${status}\n` +
                          `Total: ₹${order.total}`
                        )
                      }
                    >
                      View Details →
                    </button>

                  </div>

                </div>

              );
            })}

          </div>

        ) : (

          /* =========================
             EMPTY ORDERS
          ========================= */

          <div className="orders-empty-info">

            <div>
              📦
            </div>

            <h3>
              You haven't placed any
              orders yet
            </h3>

            <p>
              Explore our menu and place
              your first delicious order.
            </p>

            <a href="/menu">
              Explore Menu →
            </a>

          </div>

        )}

        {/* =========================
            ORDER AGAIN
        ========================= */}

        {!loading &&
        orders.length > 0 && (

          <div className="orders-empty-info">

            <div>
              🍴
            </div>

            <h3>
              Hungry for something
              delicious?
            </h3>

            <p>
              Explore our menu and place
              your next order.
            </p>

            <a href="/menu">
              Explore Menu →
            </a>

          </div>

        )}

      </section>

    </main>
  );
}

export default Orders;