// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Dashboard() {
  const [soilMoisture, setSoilMoisture] = useState(0);
  const [pumps, setPumps] = useState([
    { id: 1, name: "Máy bơm 1", status: false },
    { id: 2, name: "Máy bơm 2", status: false },
  ]);
  const [chatMessages, setChatMessages] = useState([]); // { sender: "user"|"bot", text }
  const [chatInput, setChatInput] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);

  const BASE_URL = process.env.REACT_APP_BASE_URL || "";
  const GEMINI_KEY = process.env.REACT_APP_GEMINI_API_KEY;
  const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;

  // Toggle pump (same as before)
  const handleTogglePump = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("authToken");
      const endpoint = currentStatus === false ? "on" : "off";
      const response = await fetch(
        `${BASE_URL}/api/device/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id }),
        }
      );
      if (!response.ok) throw new Error(response.statusText);
      setPumps((prev) =>
        prev.map((pump) =>
          pump.id === id ? { ...pump, status: !pump.status } : pump
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Send chat message to Gemini directly from frontend
const handleSendChat = async (e) => {
  e.preventDefault();
  if (!chatInput.trim() || !GEMINI_KEY) return;

  // Add user’s message
  const userMessage = { sender: "user", text: chatInput.trim() };
  setChatMessages((prev) => [...prev, userMessage]);
  setChatInput("");
  setLoadingChat(true);

  try {
    const response = await fetch(GEMINI_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: userMessage.text }],
          },
        ],
      }),
    });
    if (!response.ok) {
      const errJson = await response.json();
      throw new Error(errJson.error?.message || response.statusText);
    }
    const data = await response.json();

    // Correct extraction for Gemini’s nested structure:
    const botReply =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "Xin lỗi, tôi không nhận được phản hồi.";

    setChatMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
  } catch (err) {
    console.error(err);
    setChatMessages((prev) => [
      ...prev,
      { sender: "bot", text: "Đã xảy ra lỗi khi gọi AI. Vui lòng thử lại sau." },
    ]);
  } finally {
    setLoadingChat(false);
  }
};

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Bảng điều khiển Yolo:Farm</h1>
        <div className="user-info">
          <span>Username: YoloFarm_2907</span>
        </div>
      </div>

      <div className="sensor-grid">
        <div className="sensor-card temperature">
          <h3>Nhiệt độ</h3>
          <p>0.0°C</p>
        </div>
        <div className="sensor-card humidity">
          <h3>Độ ẩm</h3>
          <p>0%</p>
        </div>
        <div className="sensor-card status">
          <h3>Tình trạng</h3>
          <p>0</p>
        </div>
        <div className="sensor-card gdd">
          <h3>GDD</h3>
          <p>0</p>
        </div>
        <div className="sensor-card soil-moisture">
          <h3>Độ ẩm đất</h3>
          <div className="gauge-wrapper">
            <CircularProgressbar
              value={soilMoisture}
              text={`${soilMoisture}%`}
              styles={buildStyles({
                pathColor:
                  soilMoisture < 30
                    ? "#ff4444"
                    : soilMoisture < 70
                    ? "#ffeb3b"
                    : "#4CAF50",
                textColor: "#333",
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="history-section">
          <h3>Lịch sử ánh sáng</h3>
          <div className="history-list">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="history-item"></div>
            ))}
          </div>
        </div>
        <div className="history-section">
          <h3>Lịch sử độ ẩm đất</h3>
          <div className="history-list">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="history-item"></div>
            ))}
          </div>
        </div>
        <div className="pump-control-section">
          {pumps.map((pump) => (
            <div key={pump.id} className="pump-control">
              <h3>{pump.name}</h3>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={pump.status}
                  onChange={() =>
                    handleTogglePump(pump.id, pump.status)
                  }
                />
                <span className="slider round"></span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* AI Chatbot Section (Gemini) */}
      <div className="chatbot-section">
        <h3>AI Chatbot</h3>
        <div className="chat-window">
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-message ${
                msg.sender === "user" ? "user-msg" : "bot-msg"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loadingChat && (
            <div className="chat-message bot-msg">Đang trả lời...</div>
          )}
        </div>
        <form className="chat-input-form" onSubmit={handleSendChat}>
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Nhập câu hỏi..."
            className="chat-input"
          />
          <button type="submit" className="chat-send-btn">
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
