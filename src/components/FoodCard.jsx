import React, { useState } from "react";
import "./FoodCard.css";

function FoodCard({ food, onAddToCart }) {
  const [imageSrc, setImageSrc] = useState(food.image || null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const handleImageError = () => {
    // First failure:
    // Switch from online food image to local JPG fallback
    if (!usingFallback && food.fallbackImage) {
      setImageSrc(food.fallbackImage);
      setUsingFallback(true);
      return;
    }

    // If both online image and local JPG fail
    setImageFailed(true);
  };

  return (
    <div className="food-card">

      {/* ================= IMAGE ================= */}
      <div className="food-image-container">

        {!imageFailed && imageSrc ? (
          <img
            src={imageSrc}
            alt={food.name}
            className="food-image"
            onError={handleImageError}
          />
        ) : (
          <div className="food-image-fallback">
            <span className="fallback-emoji">
              {food.emoji || "🍽️"}
            </span>

            <span className="fallback-name">
              {food.name}
            </span>
          </div>
        )}

        {/* Image overlay */}
        {!imageFailed && (
          <div className="food-image-overlay"></div>
        )}

        {/* Popular badge */}
        {food.popular && (
          <span className="popular-badge">
            ⭐ Popular
          </span>
        )}

        {/* Vegetarian badge */}
        {food.vegetarian && (
          <span className="veg-badge">
            🟢 Veg
          </span>
        )}

      </div>

      {/* ================= DETAILS ================= */}
      <div className="food-details">

        <div className="food-title-row">
          <h3>{food.name}</h3>

          <span className="food-rating">
            ⭐ {food.rating}
          </span>
        </div>

        <p className="food-category">
          {food.category}
        </p>

        <p className="food-description">
          {food.description}
        </p>

        {/* ================= BOTTOM ================= */}
        <div className="food-bottom">

          <span className="food-price">
            ₹{food.price}
          </span>

          <button
            className="add-cart-button"
            onClick={() => onAddToCart(food)}
          >
            <span>🛒</span>
            Add
          </button>

        </div>

      </div>

    </div>
  );
}

export default FoodCard;