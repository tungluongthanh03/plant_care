// src/pages/PumpControlPage.js
import React, { useState, useEffect } from "react";
import PumpControl from "../components/PumpControl";

function PumpControlPage() {
  const [pumps, setPumps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to get JWT
  const getAuthToken = () => localStorage.getItem("authToken");

  // Fetch all devices, then filter to pumps (type === "actuator" and name includes "Máy bơm")
  useEffect(() => {
    const fetchPumps = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/device/all`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error fetching devices: ${response.statusText}`);
        }
        const devices = await response.json();
        // Filter to pumps; assume device.type === "actuator" and name contains "Máy bơm"
        const pumpDevices = devices
          .filter(
            (d) =>
              d.type === "actuator" &&
              d.name.toLowerCase().includes("máy bơm")
          )
          .map((d) => ({
            id: d.id,
            name: d.name,
            // Assume backend status is boolean or string "on"/"off"
            status:
              d.status === true || d.status === "on" ? "Bật" : "Tắt",
          }));
        setPumps(pumpDevices);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPumps();
  }, []);

  // Toggle pump via API
  const handleTogglePump = async (id, currentStatus) => {
    try {
      const token = getAuthToken();
      const endpoint =
        currentStatus === "Tắt" ? "on" : "off";
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/device/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id }),
        }
      );
      if (!response.ok) {
        throw new Error(
          `Error toggling pump: ${response.statusText}`
        );
      }
      // Update local state
      setPumps((prev) =>
        prev.map((pump) =>
          pump.id === id
            ? {
                ...pump,
                status: pump.status === "Tắt" ? "Bật" : "Tắt",
              }
            : pump
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p>Đang tải dữ liệu máy bơm…</p>;
  }

  return (
    <div className="pump-control-page">
      <h1>Điều Khiển Máy Bơm</h1>
      <div className="pump-grid">
        {pumps.map((pump) => (
          <PumpControl
            key={pump.id}
            name={pump.name}
            status={pump.status}
            onToggle={() =>
              handleTogglePump(pump.id, pump.status)
            }
          />
        ))}
      </div>
    </div>
  );
}

export default PumpControlPage;
