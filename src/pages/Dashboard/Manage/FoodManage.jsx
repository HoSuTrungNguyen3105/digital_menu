import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Package,
  ArrowUpDown,
} from "lucide-react";

// Mock Data
const MOCK_FOODS = [
  {
    id: 1,
    name: "Bún Thịt Nướng",
    category: "Món Chính",
    price: 45000,
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
    sold: 120,
  },
  {
    id: 2,
    name: "Cơm Tấm Sườn Bì",
    category: "Món Chính",
    price: 55000,
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80",
    sold: 85,
  },
  {
    id: 3,
    name: "Phở Bò Đặc Biệt",
    category: "Món Chính",
    price: 65000,
    status: "Out of Stock",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80",
    sold: 210,
  },
  {
    id: 4,
    name: "Bánh Mì Chảo",
    category: "Món Chính",
    price: 35000,
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&q=80",
    sold: 45,
  },
  {
    id: 5,
    name: "Trà Đào Cam Sả",
    category: "Giải Khát",
    price: 25000,
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=80",
    sold: 320,
  },
  {
    id: 6,
    name: "Yogurt Mật Ong",
    category: "Yogurt",
    price: 30000,
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&q=80",
    sold: 67,
  },
];

const CATEGORIES = [
  "Tất cả",
  "Món Chính",
  "Giải Khát",
  "Yogurt",
  "Tráng Miệng",
];

export default function FoodManage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const filteredFoods = useMemo(() => {
    return MOCK_FOODS.filter((food) => {
      const matchesSearch = food.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "Tất cả" || food.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 text-left">
            Manage Food Menu
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Control your restaurant menu and availability
          </p>
        </div>
        <button className="bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20">
          <Plus className="w-5 h-5" />
          Add New Dish
        </button>
      </div>

      {/* Filters Overlay */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search dish name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-gray-900 text-white"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFoods.map((food) => (
          <div
            key={food.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:border-orange-200 transition-all"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div
                className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-[10px] font-bold uppercase shadow-sm ${
                  food.status === "Available"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {food.status}
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-900 line-clamp-1 flex-1">
                  {food.name}
                </h3>
                <span className="text-orange-600 font-bold text-sm ml-2">
                  {food.price.toLocaleString("vi-VN")}đ
                </span>
              </div>
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-4">
                {food.category}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-500 font-medium">
                    Sold: {food.sold}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-100 hover:bg-red-500 hover:text-white rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredFoods.length === 0 && (
        <div className="bg-white p-12 rounded-3xl text-center border border-gray-100 shadow-sm">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-300" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            No items found
          </h2>
          <p className="text-gray-500 text-sm">
            We couldn't find any dishes matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
