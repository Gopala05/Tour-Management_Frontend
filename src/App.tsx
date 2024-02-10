import { ConfigProvider } from "antd";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import HomeView from "./pages/HomeView";
import LoginView from "./pages/LoginView";
import DashboardView from "./pages/DashboradView";

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#1c5335",
      },
    }}
  >
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/dashboard" element={<DashboardView />} />
      </Routes>
    </Router>
  </ConfigProvider>
);

export default App;
