import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  User,
  MessageCircle,
  Settings,
  LogOut,
} from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onLogout={handleLogout} />

      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-8">
          <div className="flex w-96 items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 border border-transparent focus-within:border-orange-200 focus-within:bg-white transition-all">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:bg-gray-50 hover:text-orange-600 rounded-xl transition-all">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-600 ring-2 ring-white animate-pulse"></span>
            </button>
            <button className="p-2 text-gray-400 hover:bg-gray-50 hover:text-orange-600 rounded-xl transition-all">
              <MessageCircle className="h-5 w-5" />
            </button>

            <div className="h-8 w-px bg-gray-200 mx-2"></div>

            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-gray-900 leading-none group-hover:text-orange-600 transition-colors">
                  Admin Panel
                </p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                  Restaurant Owner
                </p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-600 p-0.5 shadow-lg group-hover:scale-105 transition-all">
                <div className="h-full w-full rounded-[10px] bg-white flex items-center justify-center">
                  <User className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
