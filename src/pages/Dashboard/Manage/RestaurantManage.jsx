import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  ExternalLink,
  MapPin,
  Clock,
} from "lucide-react";

// Mock Data
const MOCK_RESTAURANTS = [
  {
    id: "1",
    name: "Nhà Hàng Món Ngon",
    location: "Quận 1, TP. HCM",
    description: "Chuyên các món ăn truyền thống Việt Nam",
    createdAt: "2024-03-20",
    status: "Active",
    menuCount: 3,
  },
  {
    id: "2",
    name: "Sushi Sakura",
    location: "Quận 7, TP. HCM",
    description: "Ẩm thực Nhật Bản cao cấp",
    createdAt: "2024-03-22",
    status: "Active",
    menuCount: 5,
  },
  {
    id: "3",
    name: "The Pizza House",
    location: "Quận 3, TP. HCM",
    description: "Pizza nướng củi phong cách Ý",
    createdAt: "2024-03-25",
    status: "Inactive",
    menuCount: 2,
  },
];

export default function RestaurantManage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRestaurants = MOCK_RESTAURANTS.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 text-left">
            Manage Restaurants
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Overview of all your restaurant venues
          </p>
        </div>
        <button
          onClick={() => navigate("/create-restaurant")}
          className="bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20"
        >
          <Plus className="w-5 h-5" />
          Add Restaurant
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-gray-50 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Restaurant Info</th>
                <th className="px-6 py-4 text-center">Location</th>
                <th className="px-6 py-4 text-center">Menus</th>
                <th className="px-6 py-4 text-center">Created At</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredRestaurants.map((res) => (
                <tr
                  key={res.id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors uppercase">
                        {res.name}
                      </span>
                      <span className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                        {res.description}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1.5 text-gray-500">
                      <MapPin className="w-3.5 h-3.5 text-orange-400" />
                      <span className="text-sm">{res.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold">
                      {res.menuCount} Menus
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-gray-400 text-sm">
                      <Clock className="w-3.5 h-3.5" />
                      {res.createdAt}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold ${
                        res.status === "Active"
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-50 text-gray-400"
                      }`}
                    >
                      {res.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          navigate(`/manage/restaurant/${res.id}/menus`)
                        }
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Menus"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredRestaurants.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">
              No restaurants found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
