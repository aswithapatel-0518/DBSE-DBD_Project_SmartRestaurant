import { useEffect, useState } from "react";
import "./Checkout.css";

const defaultTables = [
  { id: "T01", seats: 2, status: "Available", statusClass: "available", order: "-" },
  { id: "T02", seats: 4, status: "Available", statusClass: "available", order: "-" },
  { id: "T03", seats: 4, status: "Available", statusClass: "available", order: "-" },
  { id: "T04", seats: 6, status: "Available", statusClass: "available", order: "-" },
  { id: "T05", seats: 2, status: "Available", statusClass: "available", order: "-" },
  { id: "T06", seats: 4, status: "Available", statusClass: "available", order: "-" },
  { id: "T07", seats: 6, status: "Available", statusClass: "available", order: "-" },
  { id: "T08", seats: 2, status: "Available", statusClass: "available", order: "-" },
  { id: "T09", seats: 4, status: "Available", statusClass: "available", order: "-" },
  { id: "T10", seats: 6, status: "Available", statusClass: "available", order: "-" },
];

function Checkout() {
  const [cartItems, setCartItems] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [table, setTable] = useState("");
  const [instructions, setInstructions] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const [tables, setTables] = useState(defaultTables);
  const [placingOrder, setPlacingOrder] = useState(false);

  /* =========================
     LOAD CART AND TABLES
  ========================= */

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(savedCart);

    const loadTables = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/tables"
        );

        const data = await response.json();

        if (data.success) {
          const formattedTables = data.tables.map(
            (restaurantTable) => ({
              id: restaurantTable.table_number,
              seats: restaurantTable.seats,
              status: restaurantTable.status,
              statusClass:
                restaurantTable.status.toLowerCase(),
              order: "-",
              databaseId: restaurantTable.id,
            })
          );

          setTables(formattedTables);
        } else {
          setTables(defaultTables);
        }
      } catch (error) {
        console.error(
          "Failed to load tables from backend:",
          error
        );

        setTables(defaultTables);
      }
    };

    loadTables();

    const savedUser =
      JSON.parse(
        localStorage.getItem("loggedInUser")
      ) || null;

    if (savedUser) {
      setCustomerName(
        savedUser.fullName ||
          savedUser.name ||
          ""
      );

      setPhone(
        savedUser.phone || ""
      );
    }
  }, []);

  /* =========================
     CALCULATIONS
  ========================= */

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price) * Number(item.quantity),
    0
  );

  const tax = Math.round(subtotal * 0.05);

  const total = subtotal + tax;

  /* =========================
     PLACE ORDER
  ========================= */

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      alert(
        "Your cart is empty. Please add food first."
      );
      return;
    }

    if (
      !customerName.trim() ||
      !phone.trim() ||
      !table
    ) {
      alert(
        "Please fill in all required details."
      );
      return;
    }

    if (phone.trim().length < 10) {
      alert(
        "Please enter a valid phone number."
      );
      return;
    }

    setPlacingOrder(true);

    try {
      /* =========================
         GET LOGGED-IN USER
      ========================= */

      const savedUser =
        JSON.parse(
          localStorage.getItem("loggedInUser")
        ) || null;

      const userId =
        savedUser?.id ||
        savedUser?.userId ||
        null;

      /* =========================
         FIND DATABASE TABLE
      ========================= */

      const selectedTable = tables.find(
        (restaurantTable) =>
          restaurantTable.id === table
      );

      const tableId =
        selectedTable?.databaseId || null;

      /* =========================
         GENERATE ORDER NUMBER
      ========================= */

      const orderNumber = `ORD-${Date.now()}`;

      /* =========================
         CREATE ORDER IN MYSQL
      ========================= */

      const orderResponse = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_number: orderNumber,
            user_id: userId,
            table_id: tableId,
            customer_name:
              customerName.trim(),
            customer_phone:
              phone.trim(),
            total_amount: total,
            payment_method:
              paymentMethod,
            instructions:
              instructions.trim(),
          }),
        }
      );

      const orderData =
        await orderResponse.json();

      if (!orderResponse.ok || !orderData.success) {
        throw new Error(
          orderData.message ||
            "Failed to create order"
        );
      }

      const orderId =
        orderData.orderId;

      /* =========================
         CREATE ORDER ITEMS
      ========================= */

      for (const item of cartItems) {
  // Find this food in MySQL.
  // If it does not exist, create ONLY this ordered food.
  const menuResponse = await fetch(
    "http://localhost:5000/api/menu/find-or-create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item.name,
        category: item.category,
        price: item.price,
        rating: item.rating,
        emoji: item.emoji,
        description: item.description,
        popular: item.popular,
        vegetarian: item.vegetarian,
      }),
    }
  );

  const menuData = await menuResponse.json();

  if (
    !menuResponse.ok ||
    !menuData.success
  ) {
    throw new Error(
      menuData.message ||
        `Failed to prepare ${item.name}`
    );
  }

  // This is the REAL MySQL menu_items.id
  const menuItemId =
    menuData.menuItemId;

  // Now create the order item.
  const itemResponse = await fetch(
    "http://localhost:5000/api/order-items",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: orderId,
        menu_item_id: menuItemId,
        quantity: item.quantity,
        price: item.price,
      }),
    }
  );

  const itemData =
    await itemResponse.json();

 if (
  !itemResponse.ok ||
  !itemData.success
) {
  throw new Error(
    itemData.message ||
      `Failed to save ${item.name}`
  );
}
}
      /* =========================
         UPDATE TABLE STATUS
      ========================= */

      if (tableId) {
        await fetch(
          `http://localhost:5000/api/tables/${tableId}/status`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: "Occupied",
            }),
          }
        );
      }

      /* =========================
         CREATE CURRENT ORDER
         FOR FRONTEND DISPLAY
      ========================= */

      const newOrder = {
        id: orderNumber,
        databaseId: orderId,

        customerName:
          customerName.trim(),

        phone:
          phone.trim(),

        table,

        instructions:
          instructions.trim(),

        paymentMethod,

        items: cartItems,

        subtotal,
        tax,
        total,

        status: "New",

        date:
          new Date().toLocaleString(),
      };

      /* =========================
         SAVE FRONTEND ORDER
      ========================= */

      const existingOrders =
        JSON.parse(
          localStorage.getItem("orders")
        ) || [];

      localStorage.setItem(
        "orders",
        JSON.stringify([
          newOrder,
          ...existingOrders,
        ])
      );

      localStorage.setItem(
        "currentOrder",
        JSON.stringify(newOrder)
      );

      /* =========================
         CLEAR CART
      ========================= */

      localStorage.removeItem("cart");

      window.dispatchEvent(
        new Event("cartUpdated")
      );

      /* =========================
         SUCCESS
      ========================= */

      alert(
        `Order ${orderNumber} placed successfully! 🍽️`
      );

      window.location.href = "/orders";
    } catch (error) {
      console.error(
        "Order placement failed:",
        error
      );

      alert(
        `Failed to place order.\n\n${error.message}`
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <main className="checkout-page">

      {/* =========================
          CHECKOUT HEADER
      ========================= */}

      <section className="checkout-header">

        <div>

          <p>
            💳 CHECKOUT
          </p>

          <h1>
            Complete Your
            <span>
              Order
            </span>
          </h1>

          <span>
            Enter your details and
            choose your preferred
            payment method.
          </span>

        </div>

        <div className="checkout-header-icon">
          💳
        </div>

      </section>

      {/* =========================
          CHECKOUT CONTENT
      ========================= */}

      <section className="checkout-content">

        {/* =========================
            CUSTOMER DETAILS
        ========================= */}

        <form
          className="checkout-form"
          onSubmit={handlePlaceOrder}
        >

          <div className="checkout-card">

            <div className="checkout-card-heading">

              <div className="checkout-heading-icon">
                👤
              </div>

              <div>

                <h2>
                  Customer Details
                </h2>

                <p>
                  Tell us where to serve
                  your delicious food.
                </p>

              </div>

            </div>

            <div className="checkout-form-grid">

              <div className="checkout-form-group">

                <label>
                  Full Name *
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={customerName}
                  onChange={(event) =>
                    setCustomerName(
                      event.target.value
                    )
                  }
                />

              </div>

              <div className="checkout-form-group">

                <label>
                  Phone Number *
                </label>

                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(event) =>
                    setPhone(
                      event.target.value
                    )
                  }
                />

              </div>

              <div className="checkout-form-group">

                <label>
                  Select Table *
                </label>

                <select
                  value={table}
                  onChange={(event) =>
                    setTable(
                      event.target.value
                    )
                  }
                >

                  <option value="">
                    Select your table
                  </option>

                  {tables
                    .filter(
                      (restaurantTable) =>
                        restaurantTable.status ===
                        "Available"
                    )
                    .map(
                      (restaurantTable) => (
                        <option
                          key={
                            restaurantTable.id
                          }
                          value={
                            restaurantTable.id
                          }
                        >
                          {
                            restaurantTable.id
                          }{" "}
                          —{" "}
                          {
                            restaurantTable.seats
                          } Seats
                        </option>
                      )
                    )}

                </select>

                {tables.filter(
                  (restaurantTable) =>
                    restaurantTable.status ===
                    "Available"
                ).length === 0 && (
                  <small className="table-warning">
                    No tables are currently
                    available.
                  </small>
                )}

              </div>

              <div className="checkout-form-group">

                <label>
                  Order Type
                </label>

                <input
                  type="text"
                  value="Dine-in"
                  readOnly
                />

              </div>

              <div className="checkout-form-group full-width">

                <label>
                  Special Instructions
                </label>

                <textarea
                  rows="4"
                  placeholder="Example: Less spicy, extra cheese..."
                  value={instructions}
                  onChange={(event) =>
                    setInstructions(
                      event.target.value
                    )
                  }
                ></textarea>

              </div>

            </div>

          </div>

          {/* =========================
              PAYMENT METHOD
          ========================= */}

          <div className="checkout-card">

            <div className="checkout-card-heading">

              <div className="checkout-heading-icon">
                💰
              </div>

              <div>

                <h2>
                  Payment Method
                </h2>

                <p>
                  Select how you would like
                  to pay.
                </p>

              </div>

            </div>

            <div className="payment-options">

              <label
                className={
                  paymentMethod === "Cash"
                    ? "payment-option selected"
                    : "payment-option"
                }
              >

                <input
                  type="radio"
                  name="payment"
                  value="Cash"
                  checked={
                    paymentMethod === "Cash"
                  }
                  onChange={(event) =>
                    setPaymentMethod(
                      event.target.value
                    )
                  }
                />

                <span className="payment-icon">
                  💵
                </span>

                <div>

                  <strong>
                    Cash
                  </strong>

                  <small>
                    Pay at the table
                  </small>

                </div>

              </label>

              <label
                className={
                  paymentMethod === "Card"
                    ? "payment-option selected"
                    : "payment-option"
                }
              >

                <input
                  type="radio"
                  name="payment"
                  value="Card"
                  checked={
                    paymentMethod === "Card"
                  }
                  onChange={(event) =>
                    setPaymentMethod(
                      event.target.value
                    )
                  }
                />

                <span className="payment-icon">
                  💳
                </span>

                <div>

                  <strong>
                    Card
                  </strong>

                  <small>
                    Credit / Debit Card
                  </small>

                </div>

              </label>

              <label
                className={
                  paymentMethod === "UPI"
                    ? "payment-option selected"
                    : "payment-option"
                }
              >

                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  checked={
                    paymentMethod === "UPI"
                  }
                  onChange={(event) =>
                    setPaymentMethod(
                      event.target.value
                    )
                  }
                />

                <span className="payment-icon">
                  📱
                </span>

                <div>

                  <strong>
                    UPI
                  </strong>

                  <small>
                    Pay using UPI
                  </small>

                </div>

              </label>

            </div>

          </div>

          {/* =========================
              PLACE ORDER BUTTON
          ========================= */}

          <button
            type="submit"
            className="place-order-button"
            disabled={
              cartItems.length === 0 ||
              placingOrder
            }
          >
            {placingOrder
              ? "⏳ Placing Order..."
              : cartItems.length > 0
              ? "🍽️ Place Order"
              : "🛒 Cart is Empty"}
          </button>

          <div className="checkout-security">
            🔒 Your order details are
            safely stored in the database.
          </div>

        </form>

        {/* =========================
            ORDER SUMMARY
        ========================= */}

        <aside className="checkout-summary">

          <div className="checkout-summary-heading">

            <h2>
              Your Order
            </h2>

            <span>
              {cartItems.length}{" "}
              {cartItems.length === 1
                ? "item"
                : "items"}
            </span>

          </div>

          {cartItems.length > 0 ? (

            <div className="checkout-items">

              {cartItems.map(
                (item) => (

                  <div
                    className="checkout-item"
                    key={item.id}
                  >

                    <div className="checkout-item-image">
                      {item.emoji}
                    </div>

                    <div className="checkout-item-info">

                      <strong>
                        {item.name}
                      </strong>

                      <span>
                        ×{" "}
                        {item.quantity}
                      </span>

                    </div>

                    <strong className="checkout-item-price">
                      ₹
                      {item.price *
                        item.quantity}
                    </strong>

                  </div>

                )
              )}

            </div>

          ) : (

            <div className="checkout-empty">

              <div>
                🛒
              </div>

              <h3>
                Your cart is empty
              </h3>

              <p>
                Add food before
                checking out.
              </p>

              <a href="/menu">
                Explore Menu →
              </a>

            </div>

          )}

          <div className="checkout-summary-lines">

            <div>
              <span>
                Subtotal
              </span>

              <strong>
                ₹{subtotal}
              </strong>
            </div>

            <div>
              <span>
                Tax (5%)
              </span>

              <strong>
                ₹{tax}
              </strong>
            </div>

          </div>

          <div className="checkout-summary-divider"></div>

          <div className="checkout-total">

            <span>
              Total
            </span>

            <strong>
              ₹{total}
            </strong>

          </div>

          <div className="checkout-summary-note">
            🍴 Freshly prepared after
            your order is accepted.
          </div>

        </aside>

      </section>

    </main>
  );
}

export default Checkout;