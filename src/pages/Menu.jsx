
import React, { useMemo, useState } from "react";
import FoodCard from "../components/FoodCard";
import foodData from "../data/foodData";
import "./Menu.css";

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "All",
    "Tiffins",
    "Starters",
    "Main Course",
    "Biryani",
    "Chinese",
    "Pizza & Burgers",
    "Sides",
    "Desserts",
    "Refreshments",
  ];

  const filteredFoods = useMemo(() => {
    return foodData.filter((food) => {
      const categoryMatch =
        selectedCategory === "All" ||
        food.category === selectedCategory;

      const search = searchTerm.toLowerCase().trim();

      const searchMatch =
        search === "" ||
        food.name.toLowerCase().includes(search) ||
        food.description.toLowerCase().includes(search);

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchTerm]);

  // ================= ADD TO CART =================
  const handleAddToCart = (food) => {
    const currentCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    /*
      IMPORTANT:
      Use the food name as the main identity because
      the frontend foodData IDs may be different from
      the MySQL menu_items IDs.
    */
    const foodName = food.name.trim().toLowerCase();

    const existingItemIndex = currentCart.findIndex(
      (item) =>
        item.name &&
        item.name.trim().toLowerCase() === foodName
    );

    let updatedCart;

    if (existingItemIndex !== -1) {
      updatedCart = currentCart.map((item, index) =>
        index === existingItemIndex
          ? {
              ...item,

              // Keep the exact food that was clicked
              id: food.id,
              name: food.name,
              price: food.price,
              image: food.image,
              image_url: food.image_url,
              fallbackImage: food.fallbackImage,
              emoji: food.emoji,
              description: food.description,
              category: food.category,
              rating: food.rating,
              popular: food.popular,
              vegetarian: food.vegetarian,

              quantity: Number(item.quantity || 0) + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...currentCart,
        {
          // Keep the exact ID from foodData
          id: food.id,

          name: food.name,
          price: food.price,

          // Keep image information
          image: food.image || "",
          image_url: food.image_url || "",
          fallbackImage: food.fallbackImage || "",

          emoji: food.emoji || "🍽️",
          description: food.description || "",
          category: food.category || "",
          rating: food.rating || 0,
          popular: food.popular || false,
          vegetarian: food.vegetarian || false,

          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    alert(`${food.name} added to cart 🛒`);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "All":
        return "🍽️";

      case "Tiffins":
        return "🥞";

      case "Starters":
        return "🥟";

      case "Main Course":
        return "🍛";

      case "Biryani":
        return "🍚";

      case "Chinese":
        return "🥡";

      case "Pizza & Burgers":
        return "🍕";

      case "Sides":
        return "🍟";

      case "Desserts":
        return "🍰";

      case "Refreshments":
        return "🥤";

      default:
        return "🍽️";
    }
  };

  return (
    <div className="menu-page">

      {/* ================= HEADER ================= */}
      <section className="menu-header">

        <h1>Our Menu 🍽️</h1>

        <p>
          Discover delicious dishes prepared fresh for you
        </p>

        {/* Search */}
        <div className="menu-search">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search dishes..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => setSearchTerm("")}
            >
              ✕
            </button>
          )}

        </div>

      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="category-section">

        <div className="category-scroll">

          {categories.map((category) => (

            <button
              key={category}
              className={`category-button ${
                selectedCategory === category
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setSelectedCategory(category)
              }
            >

              <span className="category-icon">
                {getCategoryIcon(category)}
              </span>

              <span>{category}</span>

            </button>

          ))}

        </div>

      </section>

      {/* ================= CURRENT CATEGORY ================= */}
      <section className="selected-category">

        <div className="category-heading">

          <div>

            <h2>
              {getCategoryIcon(selectedCategory)}{" "}
              {selectedCategory === "All"
                ? "All Dishes"
                : selectedCategory}
            </h2>

            <p>
              {selectedCategory === "All"
                ? "Explore everything we have to offer"
                : `Explore our ${selectedCategory.toLowerCase()} selection`}
            </p>

          </div>

          <span className="item-count">

            {filteredFoods.length}{" "}

            {filteredFoods.length === 1
              ? "item"
              : "items"}

          </span>

        </div>

      </section>

      {/* ================= FOOD GRID ================= */}
      {filteredFoods.length > 0 ? (

        <section className="food-grid">

          {filteredFoods.map((food) => (

            <FoodCard
              key={food.id}
              food={food}
              onAddToCart={handleAddToCart}
            />

          ))}

        </section>

      ) : (

        <section className="no-foods">

          <div className="no-food-icon">
            🔍
          </div>

          <h2>No dishes found</h2>

          <p>
            We couldn't find any dishes matching your
            search.
          </p>

          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
          >
            View All Dishes
          </button>

        </section>

      )}

    </div>
  );
}

export default Menu;
