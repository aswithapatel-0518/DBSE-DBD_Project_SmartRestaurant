
import { useEffect, useState } from "react";
import foodData from "../data/foodData";
import "./AdminMenu.css";

const emptyForm = {
  name: "",
  category: "Pizza",
  price: "",
  rating: "4.5",
  emoji: "🍕",
  description: "",
  popular: false,
  vegetarian: true,
};

function AdminMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     LOAD MENU FROM MYSQL
  ========================= */

  const loadMenu = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/menu"
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load menu"
        );
      }

      setMenuItems(data.menuItems || []);

      // Keep localStorage updated for frontend compatibility
      localStorage.setItem(
        "menuItems",
        JSON.stringify(data.menuItems || [])
      );
    } catch (error) {
      console.error("Menu loading error:", error);

      // Fallback to localStorage / foodData
      const savedMenu =
        JSON.parse(
          localStorage.getItem("menuItems")
        ) || foodData;

      setMenuItems(savedMenu);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  /* =========================
     FORM CHANGE
  ========================= */

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((previous) => ({
      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /* =========================
     ADD / UPDATE ITEM
  ========================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.price ||
      !formData.description.trim()
    ) {
      alert(
        "Please fill in all required food details."
      );

      return;
    }

    if (Number(formData.price) <= 0) {
      alert(
        "Please enter a valid price."
      );

      return;
    }

    const foodItem = {
      name: formData.name.trim(),
      category: formData.category,
      price: Number(formData.price),
      rating: Number(formData.rating) || 4.5,
      emoji: formData.emoji || "🍽️",
      description: formData.description.trim(),
      popular: Boolean(formData.popular),
      vegetarian: Boolean(formData.vegetarian),
    };

    try {
      let response;

      /* =========================
         UPDATE
      ========================= */

      if (editingId !== null) {
        response = await fetch(
          `http://localhost:5000/api/menu/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(foodItem),
          }
        );
      }

      /* =========================
         ADD
      ========================= */

      else {
        response = await fetch(
          "http://localhost:5000/api/menu",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(foodItem),
          }
        );
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to save menu item"
        );
      }

      /* =========================
         RELOAD MYSQL MENU
      ========================= */

      await loadMenu();

      if (editingId !== null) {
        alert(
          `${foodItem.name} updated successfully! ✨`
        );
      } else {
        alert(
          `${foodItem.name} added to the menu! 🍽️`
        );
      }

      setFormData(emptyForm);
      setEditingId(null);

      window.dispatchEvent(
        new Event("menuUpdated")
      );
    } catch (error) {
      console.error(
        "Menu save error:",
        error
      );

      alert(
        error.message ||
          "Failed to save menu item."
      );
    }
  };

  /* =========================
     EDIT ITEM
  ========================= */

  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      name: item.name || "",
      category: item.category || "Pizza",
      price: item.price || "",
      rating: item.rating || "4.5",
      emoji: item.emoji || "🍽️",
      description: item.description || "",
      popular: Boolean(item.popular),
      vegetarian: Boolean(item.vegetarian),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     DELETE ITEM
  ========================= */

  const handleDelete = async (id) => {
    const itemToDelete =
      menuItems.find(
        (item) => item.id === id
      );

    if (!itemToDelete) {
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${itemToDelete.name}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/menu/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to delete menu item"
        );
      }

      await loadMenu();

      if (editingId === id) {
        setEditingId(null);
        setFormData(emptyForm);
      }

      window.dispatchEvent(
        new Event("menuUpdated")
      );

      alert(
        `${itemToDelete.name} deleted from the menu.`
      );
    } catch (error) {
      console.error(
        "Menu delete error:",
        error
      );

      alert(
        error.message ||
          "Failed to delete menu item."
      );
    }
  };

  /* =========================
     CANCEL EDIT
  ========================= */

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
  };

  /* =========================
     CATEGORIES
  ========================= */

  const categories = [
    "Pizza",
    "Burgers",
    "Indian",
    "Noodles",
    "Pasta",
    "Sides",
    "Desserts",
    "Drinks",
  ];

  return (
    <main className="admin-menu-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="admin-menu-header">

        <div>

          <p>
            🍽️ MENU MANAGEMENT
          </p>

          <h1>
            Manage Your
            <span>
              Menu
            </span>
          </h1>

          <span>
            Add new dishes, update existing
            items and keep your restaurant
            menu fresh.
          </span>

        </div>

        <div className="admin-menu-header-icon">
          🍴
        </div>

      </section>

      {/* =========================
          CONTENT
      ========================= */}

      <section className="admin-menu-content">

        {/* =========================
            ADD / EDIT FORM
        ========================= */}

        <div className="admin-menu-form-card">

          <div className="admin-menu-form-heading">

            <div className="admin-menu-form-icon">
              {editingId !== null
                ? "✏️"
                : "➕"}
            </div>

            <div>

              <h2>
                {editingId !== null
                  ? "Edit Food Item"
                  : "Add New Food"}
              </h2>

              <p>
                {editingId !== null
                  ? "Update the selected menu item."
                  : "Add a delicious new item to your menu."}
              </p>

            </div>

          </div>

          <form
            className="admin-menu-form"
            onSubmit={handleSubmit}
          >

            <div className="admin-menu-form-group">

              <label>
                Food Name *
              </label>

              <input
                type="text"
                name="name"
                placeholder="Example: Paneer Tikka"
                value={formData.name}
                onChange={handleChange}
              />

            </div>

            <div className="admin-menu-form-group">

              <label>
                Category *
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >

                {categories.map(
                  (category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  )
                )}

              </select>

            </div>

            <div className="admin-menu-form-group">

              <label>
                Price (₹) *
              </label>

              <input
                type="number"
                name="price"
                min="1"
                placeholder="Example: 249"
                value={formData.price}
                onChange={handleChange}
              />

            </div>

            <div className="admin-menu-form-group">

              <label>
                Rating
              </label>

              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                step="0.1"
                placeholder="4.5"
                value={formData.rating}
                onChange={handleChange}
              />

            </div>

            <div className="admin-menu-form-group">

              <label>
                Food Emoji
              </label>

              <input
                type="text"
                name="emoji"
                placeholder="🍕"
                value={formData.emoji}
                onChange={handleChange}
              />

            </div>

            <div className="admin-menu-form-group full-width">

              <label>
                Description *
              </label>

              <textarea
                name="description"
                rows="3"
                placeholder="Describe the food item..."
                value={formData.description}
                onChange={handleChange}
              ></textarea>

            </div>

            <div className="admin-menu-checkboxes">

              <label>

                <input
                  type="checkbox"
                  name="popular"
                  checked={
                    formData.popular
                  }
                  onChange={
                    handleChange
                  }
                />

                <span>
                  🔥 Mark as Popular
                </span>

              </label>

              <label>

                <input
                  type="checkbox"
                  name="vegetarian"
                  checked={
                    formData.vegetarian
                  }
                  onChange={
                    handleChange
                  }
                />

                <span>
                  🥗 Vegetarian
                </span>

              </label>

            </div>

            <div className="admin-menu-form-actions">

              <button
                type="submit"
                className="admin-save-button"
              >
                {editingId !== null
                  ? "✓ Update Food"
                  : "+ Add Food"}
              </button>

              {editingId !== null && (

                <button
                  type="button"
                  className="admin-cancel-button"
                  onClick={
                    handleCancelEdit
                  }
                >
                  Cancel Edit
                </button>

              )}

            </div>

          </form>

        </div>

        {/* =========================
            MENU LIST
        ========================= */}

        <div className="admin-menu-list-section">

          <div className="admin-menu-list-heading">

            <div>

              <span>
                📋 MENU ITEMS
              </span>

              <h2>
                Current Menu
              </h2>

              <p>
                {menuItems.length}{" "}
                {menuItems.length === 1
                  ? "item"
                  : "items"}{" "}
                currently available.
              </p>

            </div>

            <a href="/menu">
              View Customer Menu →
            </a>

          </div>

          {loading ? (

            <div className="admin-menu-empty">

              <div>
                ⏳
              </div>

              <h3>
                Loading menu...
              </h3>

              <p>
                Fetching menu items from MySQL.
              </p>

            </div>

          ) : menuItems.length > 0 ? (

            <div className="admin-menu-grid">

              {menuItems.map(
                (item) => (

                  <div
                    className="admin-food-card"
                    key={item.id}
                  >

                    {/* =========================
                        FOOD IMAGE
                    ========================= */}

                    <div className="admin-food-image">

                      {item.popular && (
                        <span className="admin-popular-badge">
                          🔥 Popular
                        </span>
                      )}

                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          loading="lazy"
                        />
                      ) : (
                        <span className="admin-food-emoji">
                          {item.emoji || "🍽️"}
                        </span>
                      )}

                    </div>

                    <div className="admin-food-info">

                      <div className="admin-food-title">

                        <h3>
                          {item.name}
                        </h3>

                        {item.vegetarian && (
                          <span className="admin-veg-badge">
                            ●
                          </span>
                        )}

                      </div>

                      <span className="admin-food-category">
                        {item.category}
                      </span>

                      <p>
                        {item.description}
                      </p>

                      <div className="admin-food-meta">

                        <strong>
                          ₹{item.price}
                        </strong>

                        <span>
                          ⭐ {item.rating}
                        </span>

                      </div>

                      <div className="admin-food-actions">

                        <button
                          className="admin-edit-button"
                          onClick={() =>
                            handleEdit(item)
                          }
                        >
                          ✏️ Edit
                        </button>

                        <button
                          className="admin-delete-button"
                          onClick={() =>
                            handleDelete(
                              item.id
                            )
                          }
                        >
                          🗑️ Delete
                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          ) : (

            <div className="admin-menu-empty">

              <div>
                🍽️
              </div>

              <h3>
                No menu items
              </h3>

              <p>
                Add your first food item
                using the form above.
              </p>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}

export default AdminMenu;
