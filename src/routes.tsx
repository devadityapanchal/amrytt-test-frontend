import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import ProfileDetails from "./pages/ProfileDetails";
import { Suspense } from "react";
import AuthProvider from "./components/Auth/AuthProvider";

export const publicRoutes = [
  { id: "login", path: "/login", element: <Login /> },
  { id: "register", path: "/register", element: <Register /> },
  {
    id: "landing",
    path: "/",
    element: <LandingPage />,
  },
];

export const privateRoutes = [
  { id: "dashboard", path: "/dashboard", element: <Insights /> },
  { id: "profiles", path: "/dashboard/profiles", element: <Profile /> },
  {
    id: "profile",
    path: "/dashboard/profile/:id",
    element: <ProfileDetails />,
  },
];

export interface RouteAttribute {
  id: string;
  path: string;
  element: JSX.Element;
  name?: string;
}

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback="Loading...">
      <Routes>
        <Route path="/">
          {publicRoutes.map((route: RouteAttribute) => (
            <Route index key={route.id} {...route} />
          ))}
        </Route>
        <Route
          path="/"
          element={
            <AuthProvider>
              <Dashboard />
            </AuthProvider>
          }
        >
          {privateRoutes.map((route: RouteAttribute) => (
            <Route index key={route.id} {...route} />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
