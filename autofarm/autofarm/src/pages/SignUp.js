// src/pages/SignUp.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import logo from "../assets/logo.png"; // same logo as in Login

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");

  const BASE_URL = process.env.REACT_APP_BASE_URL || "";

  const handleSignUp = async () => {
    // Basic validation: no empty fields
    if (!name.trim() || !email.trim() || !password || !tel.trim()) {
      toast.error("Vui lòng nhập đầy đủ thông tin!", {
        duration: 3000,
        style: { background: "#ff4444", color: "#fff" },
      });
      return;
    }

    try {
      // ← Note the added "/api" prefix below:
      const response = await fetch(`${BASE_URL}/api/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          tel: tel.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Đăng ký thất bại.");
      }

      toast.success(
        "Đăng ký thành công! Vui lòng kiểm tra email để xác minh.",
        {
          duration: 3000,
          style: { background: "#4CAF50", color: "#fff" },
        }
      );

      // After a brief delay, navigate back to Login
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.message, {
        duration: 3000,
        style: { background: "#ff4444", color: "#fff" },
      });
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-card">
          <img src={logo} alt="Yolo:Farm Logo" className="signup-logo" />
          <h2 className="signup-title">Đăng Ký Tài Khoản</h2>

          <div className="input-group">
            {/* Name */}
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <input
                type="text"
                placeholder="Họ và tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="signup-input"
              />
            </div>

            {/* Email */}
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="signup-input"
              />
            </div>

            {/* Password */}
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faLock} className="input-icon" />
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="signup-input"
              />
            </div>

            {/* Tel */}
            <div className="input-wrapper">
              <FontAwesomeIcon icon={faPhone} className="input-icon" />
              <input
                type="text"
                placeholder="Số điện thoại"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                className="signup-input"
              />
            </div>
          </div>

          <button onClick={handleSignUp} className="signup-button">
            Đăng Ký
          </button>

          <div className="signup-footer">
            <span>Đã có tài khoản?</span>
            <Link to="/login" className="login-link">
              Đăng Nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
