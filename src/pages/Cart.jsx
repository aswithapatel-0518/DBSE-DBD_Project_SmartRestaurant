
import { useEffect, useState } from "react";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  /* =========================
     LOAD CART
     ========================= */

  const loadCart = () => {
    try {
      const savedCart =
        JSON.parse(localStorage.getItem("cart")) || [];

      setCartItems(savedCart);
    } catch (error) {
      console.error("Cart loading error:", error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    loadCart();

    window.addEventListener("cartUpdated", loadCart);
    window.addEventListener("storage", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
      window.removeEventListener("storage", loadCart);
    };
  }, []);

  /* =========================
     SAVE CART
     ========================= */

  const saveCart = (updatedCart) => {
    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  /* =========================
     INCREASE QUANTITY
     ========================= */

  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Number(item.quantity) + 1,
          }
        : item
    );

    saveCart(updatedCart);
  };

  /* =========================
     DECREASE QUANTITY
     ========================= */

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Number(item.quantity) - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  };

  /* =========================
     REMOVE ITEM
     ========================= */

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    saveCart(updatedCart);
  };

  /* =========================
     CALCULATIONS
     ========================= */

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + Number(item.quantity),
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        Number(item.quantity),
    0
  );

  const tax = Math.round(subtotal * 0.05);

  const total = subtotal + tax;

  return (
    <main className="cart-page">

      {/* =========================
          CART HEADER
      ========================= */}

      <section className="cart-header">

        <div>

          <p>
            🛒 YOUR CART
          </p>

          <h1>
            Your Favorite
            <span>
              Food Awaits
            </span>
          </h1>

          <span>
            Review your items before
            placing your order.
          </span>

        </div>

        <div className="cart-header-icon">
          🛍️
        </div>

      </section>

      {/* =========================
          CART CONTENT
      ========================= */}

      <section className="cart-content">

        {/* =========================
            CART ITEMS
        ========================= */}

        <div className="cart-items-section">

          <div className="cart-section-title">

            <div>

              <h2>
                Your Items
              </h2>

              <p>
                {totalItems}{" "}
                {totalItems === 1
                  ? "item"
                  : "items"}{" "}
                in your cart
              </p>

            </div>

            {cartItems.length > 0 && (

              <span className="cart-ready">
                ✓ Ready to Order
              </span>

            )}

          </div>

          {cartItems.length > 0 ? (

            <div className="cart-items">

              {cartItems.map((item) => (

                <div
                  className="cart-item"
                  key={item.id}
                >

                  {/* =========================
                      REAL FOOD IMAGE
                  ========================= */}

                  <div className="cart-food-image">

                    {item.image ? (

                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        onError={(e) => {
                          if (
                            item.fallbackImage &&
                            e.currentTarget.src !==
                              item.fallbackImage
                          ) {
                            e.currentTarget.src =
                              item.fallbackImage;
                          }
                        }}
                      />

                    ) : item.image_url ? (

                      <img
                        src={item.image_url}
                        alt={item.name}
                        loading="lazy"
                      />

                    ) : (

                      <span>
                        {item.emoji || "🍽️"}
                      </span>

                    )}

                  </div>

                  {/* =========================
                      FOOD INFORMATION
                  ========================= */}

                  <div className="cart-food-info">

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      Freshly prepared
                      for you
                    </p>

                    <span>
                      ₹{item.price} each
                    </span>

                  </div>

                  {/* =========================
                      QUANTITY
                  ========================= */}

                  <div className="quantity-control">

                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item.id
                        )
                      }
                    >
                      -
                    </button>

                    <strong>
                      {item.quantity}
                    </strong>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.id
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                  {/* =========================
                      ITEM TOTAL
                  ========================= */}

                  <div className="cart-item-total">

                    <strong>
                      ₹
                      {Number(item.price) *
                        Number(item.quantity)}
                    </strong>

                    <button
                      className="remove-button"
                      onClick={() =>
                        removeItem(item.id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            /* =========================
               EMPTY CART
            ========================= */

            <div className="no-foods">

              <div>
                🛒
              </div>

              <h3>
                Your cart is empty
              </h3>

              <p>
                Add some delicious food
                from our menu.
              </p>

              <a
                href="/menu"
                className="checkout-button"
                style={{
                  display: "inline-block",
                  marginTop: "20px",
                }}
              >
                Explore Menu →
              </a>

            </div>

          )}

          {/* CONTINUE SHOPPING */}

          <a
            href="/menu"
            className="continue-shopping"
          >
            ← Continue Shopping
          </a>

        </div>

        {/* =========================
            ORDER SUMMARY
        ========================= */}

        <aside className="order-summary">

          <h2>
            Order Summary
          </h2>

          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <strong>
              ₹{subtotal}
            </strong>

          </div>

          <div className="summary-row">

            <span>
              Tax (5%)
            </span>

            <strong>
              ₹{tax}
            </strong>

          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">

            <span>
              Total
            </span>

            <strong>
              ₹{total}
            </strong>

          </div>

          {/* DELIVERY INFORMATION */}

          <div className="delivery-info">

            <span>
              🍽️
            </span>

            <div>

              <strong>
                Dine-in Order
              </strong>

              <p>
                Your food will be
                prepared fresh.
              </p>

            </div>

          </div>

          {/* CHECKOUT */}

          <a
            href={
              cartItems.length > 0
                ? "/checkout"
                : "/menu"
            }
            className="checkout-button"
          >
            {cartItems.length > 0
              ? "Proceed to Checkout →"
              : "Add Food First →"}
          </a>

          <div className="secure-note">
            🔒 Secure & safe ordering
          </div>

        </aside>

      </section>

    </main>
  );
}

export default Cart;
