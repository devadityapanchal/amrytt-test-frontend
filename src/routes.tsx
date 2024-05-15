import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import ProfileDetails from "./pages/ProfileDetails";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="" element={<Insights />} />
        <Route path="profiles" element={<Profile />} />
        <Route path="profile/:id" element={<ProfileDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
