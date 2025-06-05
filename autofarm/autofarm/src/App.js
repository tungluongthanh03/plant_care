// src/App.js
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import PumpControlPage from "./pages/PumpControlPage";
import History from "./pages/History";
import AnomalyDetection from "./pages/AnomalyDetection";
import FruitClassification from "./pages/FruitClassification";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import GardenManagement from "./pages/GardenManagement";

import "./styles.css";

// A wrapper that redirects to /login if no authToken is found in localStorage
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem("authToken"));

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // If authenticated, render children (Sidebar + nested routes). Otherwise render nothing.
  return isAuthenticated ? children : null;
}

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Sidebar />
                <div className="main-content">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/pump-control" element={<PumpControlPage />} />
                    <Route path="/history" element={<History />} />
                    <Route
                      path="/anomaly"
                      element={<AnomalyDetection />}
                    />
                    <Route
                      path="/fruit-classification"
                      element={<FruitClassification />}
                    />
                    <Route path="/settings" element={<Settings />} />
                    <Route
                      path="/notifications"
                      element={<Notifications />}
                    />
                    <Route
                      path="/garden-management"
                      element={<GardenManagement />}
                    />
                  </Routes>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
