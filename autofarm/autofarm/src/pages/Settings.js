// src/pages/Settings.js
import React, { useState, useEffect } from "react";
import DeviceList from "../components/DeviceList";

function Settings() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Utility to get auth token from localStorage
  const getAuthToken = () => localStorage.getItem("authToken");

  // Fetch all devices on mount
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/device/all`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error fetching devices: ${response.statusText}`);
        }
        const data = await response.json();
        // Assume the API returns an array of devices
        setDevices(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const handleAddDevice = async () => {
    try {
      const token = getAuthToken();
      // Create a minimal payload; adjust fields if your API expects more
      const payload = {
        name: `Thiết bị ${devices.length + 1}`,
        type: "sensor",
      };
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/device`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Error adding device: ${response.statusText}`);
      }
      const newDevice = await response.json();
      // Append newly created device to state
      setDevices((prev) => [...prev, newDevice]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteDevice = async (id) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/device/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error deleting device: ${response.statusText}`);
      }
      // On success, remove from local state
      setDevices((prev) => prev.filter((device) => device.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p>Đang tải danh sách thiết bị…</p>;
  }

  return (
    <div className="settings">
      <h1>Quản Lý Thiết Bị</h1>
      <button onClick={handleAddDevice}>Thêm Thiết Bị</button>
      <DeviceList devices={devices} onDelete={handleDeleteDevice} />
    </div>
  );
}

export default Settings;
