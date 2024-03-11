import { ConfigProvider } from "antd";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import HomeView from "./pages/HomeView";
import LoginView from "./pages/LoginView";
// import DashboardView from "./pages/DashboradView";
import SignUp from "./sections/login/SignUp";
import AdminLoginView from "./pages/AdminLoginView";
import Booking from "./sections/booking/Booking";
import Home from "./sections/dashboard/Home";
import Travels from "./sections/Travels/Travels";
import FeedBck from "./sections/feedback/FeedBck";
import AdminHome from "./sections/Admin/adminDashboard/AdminHome";
import CreatePackage from "./sections/Admin/packages/CreatePackage";

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
        <Route path="/sign-up" element={<SignUp />} />
        {/* <Route path="/dashboard" element={<DashboardView />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/travel-history" element={<Travels />} />
        <Route path="/feedback" element={<FeedBck />} />

        <Route path="/admin-login" element={<AdminLoginView />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/create-package" element={<CreatePackage />} />
      </Routes>
    </Router>
  </ConfigProvider>
);

export default App;
