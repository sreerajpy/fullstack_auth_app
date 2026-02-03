import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/authPages/Login";
import Signup from "./pages/authPages/Signup";
import Dashboard from "./pages/dashboard/dashboard";
import Users from "./pages/user-management/Users";
import PrivateRoute from "./components/PrivateRoute";


export default function App() {

  // A simple check function
  const isAuthenticated = () => !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Initial Page Logic */}
        <Route
          path="/"
          element={isAuthenticated() ? <Navigate to="/usermanagement" /> : <Navigate to="/login" />}
        />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/usermanagement"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />

        {/* 404 Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}