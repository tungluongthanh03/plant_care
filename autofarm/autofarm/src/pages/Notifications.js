// src/pages/Notifications.js
import React, { useEffect, useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy JWT từ localStorage
  const getAuthToken = () => localStorage.getItem("authToken");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/notifications`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Lỗi khi tải thông báo: ${response.statusText}`);
        }
        const data = await response.json();
        // Giả sử API trả về mảng [{ id, message, time, status }, …]
        setNotifications(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <p>Đang tải thông báo…</p>;
  }

  return (
    <div className="notifications">
      <h1>Thông Báo</h1>
      <ul>
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className={notification.status === "UNREAD" ? "unread" : ""}
          >
            {notification.message} – {notification.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
