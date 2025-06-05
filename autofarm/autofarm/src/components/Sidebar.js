import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <img src={logo} alt="Yolo:Farm Logo" className="logo" />
      <nav>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/history">Lịch sử</Link>
          </li>
          <li>
            <Link to="/garden-management">Quản lý khu vườn</Link>
          </li>
          <li>
            <Link to="/settings">Thiết bị</Link>
          </li>
          <li>
            <Link to="/anomaly">Nguồn gốc</Link>
          </li>
          <li>
            <Link to="/notifications">Thông tin</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Đăng xuất
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;