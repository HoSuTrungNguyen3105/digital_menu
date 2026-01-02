import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Users,
  DollarSign,
  Package,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { getMe } from "../../api/auth.api";
import { getRestaurants } from "../../api/restaurant.api";
import RestaurantCard from "../../components/RestaurantCard";

export default function DashboardOverview() {
  const navigate = useNavigate();

  const [owner, setOwner] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [meRes, restRes] = await Promise.all([getMe(), getRestaurants()]);

      setOwner(meRes?.data?.data || null);

      const list = restRes?.data?.data?.restaurant || [];
      setRestaurants(Array.isArray(list) ? list.filter(Boolean) : []);
    } catch (err) {
      console.error("Dashboard error:", err);
      if (err?.response?.status === 401) {
        navigate("/login");
      } else {
        setError("Failed to load dashboard");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        Loading overview...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={fetchData} className="underline text-gray-600">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* HEADER - Simplified since Sidebar handles nav */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back,{" "}
          <span className="text-orange-600">{owner?.ownername}</span>
        </h1>
        <p className="text-gray-500 mt-1">
          Here's what's happening with your restaurants today.
        </p>
      </header>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            label: "Total Revenue",
            value: "24.5Mđ",
            icon: DollarSign,
            trend: "+12.5%",
            positive: true,
            color: "bg-blue-500",
          },
          {
            label: "Active Orders",
            value: "12",
            icon: Package,
            trend: "+4",
            positive: true,
            color: "bg-orange-500",
          },
          {
            label: "Total Visitors",
            value: "842",
            icon: Users,
            trend: "-2.4%",
            positive: false,
            color: "bg-green-500",
          },
          {
            label: "Avg. Bill",
            value: "185kđ",
            icon: TrendingUp,
            trend: "+5.2%",
            positive: true,
            color: "bg-red-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 group hover:border-orange-200 transition-all"
          >
            <div
              className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center shadow-lg shadow-gray-200`}
            >
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                {stat.label}
              </p>
              <div className="flex items-end gap-2">
                <h3 className="text-2xl font-black text-gray-900 leading-tight">
                  {stat.value}
                </h3>
                <span
                  className={`text-[10px] font-bold flex items-center mb-1 ${
                    stat.positive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.positive ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {stat.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* STATS or QUICK ACTIONS */}
      {/* For now, just listing restaurants as before, but cleaner */}

      {restaurants.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🍽️</span>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            No restaurants yet
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Get started by creating your first restaurant profile to generate QR
            menus.
          </p>
          <button
            onClick={() => navigate("/create-restaurant")}
            className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
          >
            Create First Restaurant
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Restaurants
            </h2>
            <button
              onClick={() => navigate("/create-restaurant")}
              className="text-sm font-medium text-orange-600 hover:text-orange-700"
            >
              + Add New
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((r) => (
              <RestaurantCard key={r._id} restaurant={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
