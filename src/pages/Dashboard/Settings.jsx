import React, { useState } from "react";
import {
  User,
  Store,
  Bell,
  Shield,
  Palette,
  Globe,
  Smartphone,
  CheckCircle2,
  Lock,
  Mail,
  Camera,
  Moon,
  Sun,
  Monitor,
  Clock,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Settings() {
  const [activeSegment, setActiveSegment] = useState("Profile");
  const [showPassword, setShowPassword] = useState(false);

  const segments = [
    { id: "Profile", icon: User },
    { id: "Restaurant", icon: Store },
    { id: "Notifications", icon: Bell },
    { id: "Security", icon: Shield },
    { id: "Appearance", icon: Palette },
  ];

  const renderProfile = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-gray-50">
        <div className="relative group">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-orange-400 to-red-600 p-1 shadow-xl">
            <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center overflow-hidden">
              <User className="w-12 h-12 text-orange-600" />
            </div>
          </div>
          <button className="absolute -bottom-2 -right-2 p-2 bg-gray-900 text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-black text-gray-900 flex items-center gap-2 justify-center sm:justify-start">
            Admin Panel
            <CheckCircle2 className="w-5 h-5 text-blue-500" />
          </h3>
          <p className="text-gray-400 text-sm font-medium">
            Joined on Oct 2023
          </p>
          <div className="mt-2 text-[10px] font-black uppercase px-2 py-1 bg-green-50 text-green-600 rounded-lg inline-block tracking-widest border border-green-100">
            Professional Plan
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
            Full Name
          </label>
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-2xl border border-transparent focus-within:border-orange-200 transition-all">
            <User className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              defaultValue="Admin Panel"
              className="bg-transparent text-sm font-bold text-gray-900 outline-none w-full"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
            Email Address
          </label>
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-2xl border border-transparent focus-within:border-orange-200 transition-all">
            <Mail className="w-4 h-4 text-gray-400" />
            <input
              type="email"
              defaultValue="admin@example.com"
              className="bg-transparent text-sm font-bold text-gray-900 outline-none w-full"
            />
          </div>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
            Phone Number
          </label>
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-2xl border border-transparent focus-within:border-orange-200 transition-all">
            <Smartphone className="w-4 h-4 text-gray-400" />
            <input
              type="tel"
              defaultValue="+84 123 456 789"
              className="bg-transparent text-sm font-bold text-gray-900 outline-none w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderRestaurant = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
            Restaurant Name
          </label>
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-2xl border border-transparent focus-within:border-orange-200 transition-all">
            <Store className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              defaultValue="Nhà Hàng Món Ngon"
              className="bg-transparent text-sm font-bold text-gray-900 outline-none w-full"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
            Address
          </label>
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-2xl border border-transparent focus-within:border-orange-200 transition-all">
            <MapPin className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              defaultValue="123 Đường ABC, Quận 1, TP. HCM"
              className="bg-transparent text-sm font-bold text-gray-900 outline-none w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
              Opening Hour
            </label>
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-2xl border border-transparent focus-within:border-orange-200 transition-all">
              <Clock className="w-4 h-4 text-gray-400" />
              <input
                type="time"
                defaultValue="08:00"
                className="bg-transparent text-sm font-bold text-gray-900 outline-none w-full"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
              Closing Hour
            </label>
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-2xl border border-transparent focus-within:border-orange-200 transition-all">
              <Clock className="w-4 h-4 text-gray-400" />
              <input
                type="time"
                defaultValue="22:00"
                className="bg-transparent text-sm font-bold text-gray-900 outline-none w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {[
        {
          title: "New Order Alerts",
          desc: "Get notified when a table places a new order.",
          active: true,
        },
        {
          title: "Payment Confirmations",
          desc: "Receive notifications for completed payments.",
          active: true,
        },
        {
          title: "System Updates",
          desc: "Stay informed about new features and maintenance.",
          active: false,
        },
        {
          title: "Weekly Reports",
          desc: "Receive a summary of your restaurant's performance.",
          active: true,
        },
      ].map((notif, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-100 transition-all"
        >
          <div className="space-y-1">
            <h4 className="text-sm font-black text-gray-900">{notif.title}</h4>
            <p className="text-xs text-gray-500">{notif.desc}</p>
          </div>
          <button
            className={`w-12 h-6 rounded-full transition-all relative ${
              notif.active ? "bg-orange-600" : "bg-gray-200"
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                notif.active ? "right-1" : "left-1"
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
            Current Password
          </label>
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-2xl border border-transparent focus-within:border-orange-200 transition-all">
            <Lock className="w-4 h-4 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              defaultValue="password"
              className="bg-transparent text-sm font-bold text-gray-900 outline-none w-full"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
            New Password
          </label>
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-2xl border border-transparent focus-within:border-orange-200 transition-all">
            <Lock className="w-4 h-4 text-gray-400" />
            <input
              type="password"
              placeholder="Min. 8 characters"
              className="bg-transparent text-sm font-bold text-gray-900 outline-none w-full"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-start gap-4">
        <ShieldCheck className="w-6 h-6 text-orange-600 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-black text-gray-900 mb-1">
            Security Recommendation
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            We recommend changing your password every 3 months and enabling 2FA
            for maximum restaurant data protection.
          </p>
        </div>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="space-y-4">
        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
          Theme Preference
        </label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { id: "light", icon: Sun, label: "Light" },
            { id: "dark", icon: Moon, label: "Dark" },
            { id: "system", icon: Monitor, label: "System" },
          ].map((theme) => (
            <button
              key={theme.id}
              className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${
                theme.id === "light"
                  ? "bg-orange-50 border-orange-200 text-orange-600"
                  : "bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100"
              }`}
            >
              <theme.icon className="w-6 h-6" />
              <span className="text-xs font-bold">{theme.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
          Accent Color
        </label>
        <div className="flex gap-4">
          {["#EA580C", "#2563EB", "#059669", "#7C3AED", "#DB2777"].map(
            (color) => (
              <button
                key={color}
                style={{ backgroundColor: color }}
                className={`w-10 h-10 rounded-full shadow-lg hover:scale-110 transition-transform ${
                  color === "#EA580C"
                    ? "ring-4 ring-orange-200 ring-offset-2"
                    : ""
                }`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-8xl mx-auto space-y-6 mb-15">
      <header>
        <h1 className="text-3xl font-black text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your account and restaurant preferences
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* SIDE NAV */}
        <nav className="w-full md:w-56 space-y-1">
          {segments.map((seg) => (
            <button
              key={seg.id}
              onClick={() => setActiveSegment(seg.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-black transition-all ${
                activeSegment === seg.id
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-500/20 translate-x-1"
                  : "text-gray-500 hover:bg-white hover:text-gray-900 border border-transparent hover:border-gray-100"
              }`}
            >
              <seg.icon className="w-5 h-5" />
              {seg.id}
            </button>
          ))}
        </nav>

        {/* CONTENT */}
        <div className="flex-1 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
            {activeSegment === "Profile" && renderProfile()}
            {activeSegment === "Restaurant" && renderRestaurant()}
            {activeSegment === "Notifications" && renderNotifications()}
            {activeSegment === "Security" && renderSecurity()}
            {activeSegment === "Appearance" && renderAppearance()}

            <div className="pt-4 flex justify-end gap-3 border-t border-gray-50">
              <button className="px-6 py-3 rounded-2xl text-sm font-black text-gray-500 hover:bg-gray-50 transition-all">
                Cancel
              </button>
              <button className="px-10 py-3 rounded-2xl text-sm font-black bg-gray-900 text-white shadow-lg hover:shadow-xl transition-all hover:bg-gray-800">
                Save Changes
              </button>
            </div>
          </div>

          {/* SECURITY BOX - Only show on relevant tabs if needed, or keep for all */}
          {activeSegment !== "Security" && (
            <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 flex items-center justify-between animate-in slide-in-from-top-2 duration-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <Lock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-sm">
                    Account Security
                  </h4>
                  <p className="text-xs text-gray-500">
                    Your account is protected by industry-standard encryption.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-green-600 bg-white px-3 py-1.5 rounded-xl border border-green-100 text-[10px] font-black uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
