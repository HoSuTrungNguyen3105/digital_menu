import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Store,
  UtensilsCrossed,
  LogOut,
  QrCode,
  Pizza,
  ClipboardList,
  History,
  Settings,
} from "lucide-react";

export default function Sidebar({ onLogout }) {
  const location = useLocation();

  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
    {
      icon: Store,
      label: "Manage Restaurants",
      path: "/dashboard/manage/restaurants",
    },
    { icon: QrCode, label: "Manage Tables", path: "/dashboard/manage/tables" },
    { icon: Pizza, label: "Manage Food", path: "/dashboard/manage/food" },
    {
      icon: ClipboardList,
      label: "Live Orders",
      path: "/dashboard/manage/orders",
    },
    {
      icon: History,
      label: "Order History",
      path: "/dashboard/manage/history",
    },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
    {
      icon: UtensilsCrossed,
      label: "Create Restaurant",
      path: "/create-restaurant",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-gray-200 transition-transform">
      <div className="flex h-full flex-col px-3 py-4">
        {/* LOGO */}
        <div className="mb-6 flex items-center pl-2.5">
          <span className="self-center whitespace-nowrap text-xl font-semibold text-gray-800">
            Menu<span className="text-orange-600">Digital</span>
          </span>
        </div>

        {/* NAV LINKS */}
        <ul className="space-y-2 font-medium flex-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center rounded-lg p-3 group transition-colors ${
                  isActive(item.path) && item.path !== "/create-restaurant" // Special case for create restaurant which might be outside or just a simple link
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                <item.icon
                  className={`flex-shrink-0 h-5 w-5 transition duration-75 ${
                    isActive(item.path)
                      ? "text-orange-600"
                      : "text-gray-500 group-hover:text-gray-900"
                  }`}
                />
                <span className="ml-3">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* LOGOUT */}
        <div className="mt-auto border-t pt-4">
          <button
            onClick={onLogout}
            className="flex w-full items-center rounded-lg p-3 text-gray-900 hover:bg-red-50 hover:text-red-600 transition-colors group"
          >
            <LogOut className="flex-shrink-0 h-5 w-5 text-gray-500 transition duration-75 group-hover:text-red-600" />
            <span className="ml-3 whitespace-nowrap">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
