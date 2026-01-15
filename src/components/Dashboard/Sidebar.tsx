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
  Shield,
  LucideIcon,
} from "lucide-react";

interface SidebarProps {
  onLogout: () => void;
}

interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ||
    location.pathname.startsWith(path + "/");

  const navItems: NavItem[] = [
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
    {
      icon: Shield,
      label: "Permissions",
      path: "/dashboard/manage/permissions",
    },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
    {
      icon: UtensilsCrossed,
      label: "Create Restaurant",
      path: "/dashboard/create-restaurant", // ✅ FIX
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r">
      <div className="flex h-full flex-col px-3 py-4">
        {/* LOGO */}
        <div className="mb-6 pl-2.5 text-xl font-semibold">
          Menu<span className="text-orange-600">Digital</span>
        </div>

        {/* NAV */}
        <ul className="space-y-2 flex-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center rounded-lg p-3 transition ${isActive(item.path)
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-900 hover:bg-gray-100"
                  }`}
              >
                <item.icon
                  className={`h-5 w-5 ${isActive(item.path)
                      ? "text-orange-600"
                      : "text-gray-500"
                    }`}
                />
                <span className="ml-3">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* LOGOUT */}
        <button
          onClick={onLogout}
          className="flex items-center rounded-lg p-3 text-gray-900 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
}
