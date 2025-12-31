import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import { logoutOwner } from "../api/auth.api";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // For mobile toggle later if needed

  const handleLogout = async () => {
    try {
      await logoutOwner();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar onLogout={handleLogout} />

      <div className="ml-64 p-8">
        <Outlet />
      </div>
    </div>
  );
}
