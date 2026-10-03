import { useEffect, useState } from "react";
import "./Tables.css";

function Tables() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     LOAD TABLES FROM MYSQL
  ========================= */

  const loadTables = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/tables"
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load tables"
        );
      }

      const formattedTables = data.tables.map(
        (table) => ({
          id: table.table_number,
          databaseId: table.id,
          seats: table.seats,
          status: table.status,
          statusClass:
            table.status.toLowerCase(),
          order: "-",
        })
      );

      setTables(formattedTables);

      // Keep localStorage updated for frontend compatibility
      localStorage.setItem(
        "restaurantTables",
        JSON.stringify(formattedTables)
      );
    } catch (error) {
      console.error(
        "Table loading error:",
        error
      );

      // Fallback to existing localStorage
      const savedTables =
        JSON.parse(
          localStorage.getItem(
            "restaurantTables"
          )
        ) || [];

      setTables(savedTables);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTables();
  }, []);

  /* =========================
     CHANGE TABLE STATUS
  ========================= */

  const changeTableStatus = async (tableId) => {
    const selectedTable = tables.find(
      (table) => table.id === tableId
    );

    if (!selectedTable) return;

    let newStatus;

    if (selectedTable.status === "Available") {
      newStatus = "Reserved";
    } else if (
      selectedTable.status === "Reserved"
    ) {
      newStatus = "Available";
    } else {
      const confirmRelease =
        window.confirm(
          `Are you sure you want to release ${selectedTable.id}?`
        );

      if (!confirmRelease) return;

      newStatus = "Available";
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/tables/${selectedTable.databaseId}/status`,
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

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to update table status"
        );
      }

      await loadTables();

      window.dispatchEvent(
        new Event("tablesUpdated")
      );
    } catch (error) {
      console.error(
        "Table status update error:",
        error
      );

      alert(
        error.message ||
          "Failed to update table status."
      );
    }
  };

  /* =========================
     STATISTICS
  ========================= */

  const availableCount = tables.filter(
    (table) =>
      table.status === "Available"
  ).length;

  const reservedCount = tables.filter(
    (table) =>
      table.status === "Reserved"
  ).length;

  const occupiedCount = tables.filter(
    (table) =>
      table.status === "Occupied"
  ).length;

  const totalSeats = tables.reduce(
    (sum, table) =>
      sum + Number(table.seats),
    0
  );

  const occupiedSeats = tables
    .filter(
      (table) =>
        table.status === "Occupied"
    )
    .reduce(
      (sum, table) =>
        sum + Number(table.seats),
      0
    );

  return (
    <div className="tables-page">
      <div className="tables-container">

        {/* Header */}

        <div className="tables-header">

          <div>

            <span className="tables-label">
              RESTAURANT MANAGEMENT
            </span>

            <h1>
              Table Management
            </h1>

            <p>
              Monitor table availability,
              reservations and occupancy in
              real-time.
            </p>

          </div>

          <div className="tables-header-icon">
            🪑
          </div>

        </div>

        {/* Statistics */}

        <div className="table-stats">

          <div className="table-stat-card">

            <div className="stat-icon total-icon">
              🪑
            </div>

            <div>
              <span>
                Total Tables
              </span>

              <strong>
                {tables.length}
              </strong>
            </div>

          </div>

          <div className="table-stat-card">

            <div className="stat-icon available-icon">
              ✓
            </div>

            <div>
              <span>
                Available
              </span>

              <strong>
                {availableCount}
              </strong>
            </div>

          </div>

          <div className="table-stat-card">

            <div className="stat-icon reserved-icon">
              📅
            </div>

            <div>
              <span>
                Reserved
              </span>

              <strong>
                {reservedCount}
              </strong>
            </div>

          </div>

          <div className="table-stat-card">

            <div className="stat-icon occupied-icon">
              👥
            </div>

            <div>
              <span>
                Occupied
              </span>

              <strong>
                {occupiedCount}
              </strong>
            </div>

          </div>

        </div>

        {/* Table Information */}

        <div className="table-info-bar">

          <div>
            <span>
              Total Seating Capacity
            </span>

            <strong>
              {totalSeats} Seats
            </strong>
          </div>

          <div>
            <span>
              Currently Occupied
            </span>

            <strong>
              {occupiedSeats} Seats
            </strong>
          </div>

          <div>
            <span>
              Utilization
            </span>

            <strong>
              {tables.length
                ? Math.round(
                    (occupiedCount /
                      tables.length) *
                      100
                  )
                : 0}
              %
            </strong>
          </div>

        </div>

        {/* Table Grid */}

        <div className="tables-section">

          <div className="section-heading">

            <div>

              <h2>
                Restaurant Tables
              </h2>

              <p>
                Manage the current status
                of every table.
              </p>

            </div>

            <div className="table-legend">

              <span>
                <i className="legend-dot available-dot"></i>
                Available
              </span>

              <span>
                <i className="legend-dot reserved-dot"></i>
                Reserved
              </span>

              <span>
                <i className="legend-dot occupied-dot"></i>
                Occupied
              </span>

            </div>

          </div>

          {loading ? (

            <div className="tables-help">

              <div className="help-icon">
                ⏳
              </div>

              <div>
                <h3>
                  Loading tables...
                </h3>

                <p>
                  Fetching table information
                  from MySQL.
                </p>
              </div>

            </div>

          ) : (

            <div className="tables-grid">

              {tables.map((table) => (

                <div
                  className={`restaurant-table-card ${table.statusClass}`}
                  key={table.id}
                >

                  <div className="table-card-top">

                    <div className="table-number">
                      {table.id}
                    </div>

                    <span
                      className={`table-status-badge ${table.statusClass}`}
                    >
                      {table.status}
                    </span>

                  </div>

                  <div className="table-visual">

                    <div className="table-circle">
                      <span>🪑</span>
                    </div>

                    <div className="table-seats">
                      <span>👥</span>
                      {table.seats} Seats
                    </div>

                  </div>

                  <div className="table-card-details">

                    <div>
                      <span>
                        Order
                      </span>

                      <strong>
                        {table.order || "-"}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Status
                      </span>

                      <strong>
                        {table.status}
                      </strong>
                    </div>

                  </div>

                  <button
                    className={`table-action-btn ${table.statusClass}`}
                    onClick={() =>
                      changeTableStatus(
                        table.id
                      )
                    }
                  >
                    {table.status ===
                      "Available" &&
                      "Reserve Table"}

                    {table.status ===
                      "Reserved" &&
                      "Make Available"}

                    {table.status ===
                      "Occupied" &&
                      "Release Table"}
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Information */}

        <div className="tables-help">

          <div className="help-icon">
            💡
          </div>

          <div>

            <h3>
              Table Status Guide
            </h3>

            <p>
              <strong>
                Available:
              </strong>{" "}
              The table is free and can be
              selected by customers during
              checkout.
            </p>

            <p>
              <strong>
                Reserved:
              </strong>{" "}
              The table has been manually
              reserved and is temporarily
              unavailable.
            </p>

            <p>
              <strong>
                Occupied:
              </strong>{" "}
              The table is being used for an
              active customer order. It
              automatically becomes available
              after the order is marked as
              served.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Tables;