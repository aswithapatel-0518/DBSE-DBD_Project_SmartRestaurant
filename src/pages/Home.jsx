import "./Home.css";

function Home() {
  return (
    <main className="home-page">

      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="hero-section">

        <div className="hero-content">

          <span className="hero-badge">
            🍽️ SMART DINING EXPERIENCE
          </span>

          <h1>
            Delicious Food,
            <span> Delivered With Love.</span>
          </h1>

          <p>
            Discover delicious meals, place your order
            easily and enjoy a smart restaurant experience
            from your table.
          </p>

          <div className="hero-buttons">

            <a
              href="/menu"
              className="primary-button"
            >
              Explore Menu →
            </a>

            <a
              href="/orders"
              className="secondary-button"
            >
              📦 Track Order
            </a>

          </div>

          {/* Hero Features */}

          <div className="hero-features">

            <div className="hero-feature">

              <span>
                🥗
              </span>

              <div>
                <strong>
                  Fresh Food
                </strong>

                <small>
                  Prepared fresh
                </small>
              </div>

            </div>

            <div className="hero-feature">

              <span>
                ⚡
              </span>

              <div>
                <strong>
                  Quick Service
                </strong>

                <small>
                  Fast ordering
                </small>
              </div>

            </div>

            <div className="hero-feature">

              <span>
                ⭐
              </span>

              <div>
                <strong>
                  Top Rated
                </strong>

                <small>
                  Loved by customers
                </small>
              </div>

            </div>

          </div>

        </div>

        {/* Hero Food Illustration */}

        <div className="hero-visual">

          <div className="hero-circle"></div>

          <div className="hero-food-main">
            🍕
          </div>

          <div className="floating-food floating-one">
            🍔
          </div>

          <div className="floating-food floating-two">
            🍟
          </div>

          <div className="floating-food floating-three">
            🍰
          </div>

          <div className="floating-food floating-four">
            🥤
          </div>

          <div className="hero-rating-card">

            <span>
              ⭐
            </span>

            <div>
              <strong>
                4.9/5
              </strong>

              <small>
                Customer Rating
              </small>
            </div>

          </div>

        </div>

      </section>

      {/* =========================
          CATEGORY SECTION
      ========================= */}

      <section className="home-section category-section">

        <div className="section-heading">

          <div>

            <span>
              🍴 EXPLORE
            </span>

            <h2>
              What are you
              <strong> craving today?</strong>
            </h2>

          </div>

          <a href="/menu">
            View Full Menu →
          </a>

        </div>

        <div className="category-grid">

          <a
            href="/menu"
            className="category-card"
          >
            <div className="category-icon">
              🍕
            </div>

            <h3>
              Pizza
            </h3>

            <p>
              Cheesy & delicious
            </p>
          </a>

          <a
            href="/menu"
            className="category-card"
          >
            <div className="category-icon">
              🍔
            </div>

            <h3>
              Burgers
            </h3>

            <p>
              Juicy & tasty
            </p>
          </a>

          <a
            href="/menu"
            className="category-card"
          >
            <div className="category-icon">
              🍛
            </div>

            <h3>
              Indian
            </h3>

            <p>
              Rich & flavorful
            </p>
          </a>

          <a
            href="/menu"
            className="category-card"
          >
            <div className="category-icon">
              🍜
            </div>

            <h3>
              Noodles
            </h3>

            <p>
              Hot & delicious
            </p>
          </a>

          <a
            href="/menu"
            className="category-card"
          >
            <div className="category-icon">
              🍝
            </div>

            <h3>
              Pasta
            </h3>

            <p>
              Creamy & yummy
            </p>
          </a>

          <a
            href="/menu"
            className="category-card"
          >
            <div className="category-icon">
              🍰
            </div>

            <h3>
              Desserts
            </h3>

            <p>
              Sweet & special
            </p>
          </a>

        </div>

      </section>

      {/* =========================
          WHY CHOOSE US
      ========================= */}

      <section className="home-section why-section">

        <div className="why-visual">

          <div className="why-main-icon">
            👨‍🍳
          </div>

          <div className="why-small-icon why-icon-one">
            🍕
          </div>

          <div className="why-small-icon why-icon-two">
            ❤️
          </div>

          <div className="why-small-icon why-icon-three">
            ⭐
          </div>

        </div>

        <div className="why-content">

          <span className="section-tag">
            ✨ WHY CHOOSE US
          </span>

          <h2>
            More than just
            <strong> a restaurant.</strong>
          </h2>

          <p>
            Our smart restaurant system makes ordering
            simple, fast and enjoyable while helping our
            kitchen team manage every order efficiently.
          </p>

          <div className="why-list">

            <div className="why-item">

              <span>
                ✓
              </span>

              <div>

                <h3>
                  Easy Ordering
                </h3>

                <p>
                  Browse the menu and order your favorite
                  food with just a few clicks.
                </p>

              </div>

            </div>

            <div className="why-item">

              <span>
                ✓
              </span>

              <div>

                <h3>
                  Live Order Tracking
                </h3>

                <p>
                  Follow your order from preparation to
                  serving through every stage.
                </p>

              </div>

            </div>

            <div className="why-item">

              <span>
                ✓
              </span>

              <div>

                <h3>
                  Smart Kitchen Management
                </h3>

                <p>
                  Kitchen staff can efficiently manage
                  incoming orders and table status.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          HOW IT WORKS
      ========================= */}

      <section className="home-section process-section">

        <div className="section-heading centered-heading">

          <div>

            <span>
              🚀 SIMPLE PROCESS
            </span>

            <h2>
              Order in
              <strong> 3 easy steps</strong>
            </h2>

          </div>

        </div>

        <div className="process-grid">

          <div className="process-card">

            <div className="process-number">
              01
            </div>

            <div className="process-icon">
              📋
            </div>

            <h3>
              Choose Your Food
            </h3>

            <p>
              Explore our menu and select the dishes
              you love.
            </p>

          </div>

          <div className="process-card">

            <div className="process-number">
              02
            </div>

            <div className="process-icon">
              🛒
            </div>

            <h3>
              Place Your Order
            </h3>

            <p>
              Add your favorite dishes to the cart and
              complete checkout.
            </p>

          </div>

          <div className="process-card">

            <div className="process-number">
              03
            </div>

            <div className="process-icon">
              👨‍🍳
            </div>

            <h3>
              Enjoy Your Meal
            </h3>

            <p>
              Our kitchen prepares your food and serves
              it fresh at your table.
            </p>

          </div>

        </div>

      </section>

      {/* =========================
          CALL TO ACTION
      ========================= */}

      <section className="home-cta">

        <div className="cta-content">

          <span>
            🍽️ READY TO ORDER?
          </span>

          <h2>
            Good food is
            <strong> just a click away.</strong>
          </h2>

          <p>
            Explore our delicious menu and discover
            your next favorite meal.
          </p>

          <a
            href="/menu"
            className="cta-button"
          >
            Start Ordering →
          </a>

        </div>

        <div className="cta-decoration">
          🍕
        </div>

      </section>

    </main>
  );
}

export default Home;