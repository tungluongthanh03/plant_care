// src/pages/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import logo from "../assets/logo.png"; // Sử dụng logo của dự án

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Make sure REACT_APP_BASE_URL is set in your environment (e.g. http://localhost:3000)
  const BASE_URL = process.env.REACT_APP_BASE_URL || "";

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin!", {
        duration: 3000,
        style: { background: "#ff4444", color: "#fff" },
      });
      return;
    }

    try {
      // ← Note the added "/api" prefix below:
      const response = await fetch(`${BASE_URL}/api/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      // Parse JSON payload
      const data = await response.json();

      if (!response.ok) {
        // If backend returned 4xx/5xx, show its message
        throw new Error(data.message || "Đăng nhập thất bại.");
      }

      // data should contain { message, token, id }
      toast.success("Đăng nhập thành công!", {
        duration: 2000,
        style: { background: "#4CAF50", color: "#fff" },
      });

      // Store token & userId in localStorage (or secure store)
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userId", data.id);

      // Redirect to home (or dashboard)
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error(err.message, {
        duration: 3000,
        style: { background: "#ff4444", color: "#fff" },
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <img src={logo} alt="Yolo:Farm Logo" className="login-logo" />
          <h2 className="login-title">Đăng Nhập Yolo:Farm</h2>

          <div className="input-group">
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
              />
            </div>

            <div className="input-wrapper">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
            </div>
          </div>

          <button onClick={handleLogin} className="login-button">
            Đăng Nhập
          </button>

          <div className="login-footer">
            {/* “Quên mật khẩu?” */}
            <Link to="/forgot-password" className="forgot-password">
              Quên mật khẩu?
            </Link>

            {/* “Đăng Ký” Link */}
            <span className="footer-separator">|</span>
            <Link to="/sign-up" className="register-link">
              Đăng Ký
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
