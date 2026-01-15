import React, { useState } from "react";
import {
  Clock,
  MapPin,
  ChefHat,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  ExternalLink,
  Utensils,
  CreditCard,
} from "lucide-react";

// Mock Data
const MOCK_ORDERS = [
  {
    id: "ORD-001",
    table: "Table 04",
    items: ["Bún Thịt Nướng x2", "Trà Đào x1"],
    total: 115000,
    status: "Pending",
    time: "5 mins ago",
    customer: "Anh Tuấn",
  },
  {
    id: "ORD-002",
    table: "Table 01",
    items: ["Cơm Tấm Sườn x1", "Pepsi x1"],
    total: 65000,
    status: "Preparing",
    time: "12 mins ago",
    customer: "Chị Lan",
  },
  {
    id: "ORD-003",
    table: "Table 08",
    items: ["Phở Bò x3", "Nước Suối x3"],
    total: 210000,
    status: "Ready",
    time: "18 mins ago",
    customer: "Minh Hoàng",
  },
  {
    id: "ORD-004",
    table: "Table 02",
    items: ["Bánh Mì Chảo x2"],
    total: 70000,
    status: "Served",
    time: "25 mins ago",
    customer: "Khánh Linh",
  },
];

const STATUS_COLORS = {
  Pending: "bg-orange-50 text-orange-600 border-orange-100",
  Preparing: "bg-blue-50 text-blue-600 border-blue-100",
  Ready: "bg-green-50 text-green-600 border-green-100",
  Served: "bg-gray-50 text-gray-500 border-gray-100",
};

export default function OrderManage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Live Orders</h1>
            <p className="text-gray-500 text-sm">
              Monitor and update active orders in real-time
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            Kitchen Connected
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto scrollbar-hide">
        {["All", "Pending", "Preparing", "Ready", "Served"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === tab
                ? "bg-gray-900 text-white shadow-lg"
                : "text-gray-500 hover:bg-gray-50"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_ORDERS.filter(
          (o) => activeTab === "All" || o.status === activeTab
        ).map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-orange-200 transition-all flex flex-col"
          >
            {/* Card Top */}
            <div className="p-4 border-b border-gray-50">
              <div className="flex justify-between items-start mb-3">
                <span
                  className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase border 
                `}
                >
                  {order.status}
                </span>
                <span className="text-gray-400 text-[10px] font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {order.time}
                </span>
              </div>
              <h3 className="font-black text-gray-900 text-lg flex items-center gap-2">
                <Utensils className="w-4 h-4 text-orange-600" />
                {order.table}
              </h3>
              <p className="text-gray-400 text-xs font-medium">
                Customer: {order.customer}
              </p>
            </div>

            {/* Card Middle: Items */}
            <div className="p-4 flex-1 space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50/50 p-2 rounded-lg border border-gray-100/50"
                >
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                  {item}
                </div>
              ))}
            </div>

            {/* Card Bottom: Total & Actions */}
            <div className="p-4 bg-gray-50/50 rounded-b-2xl border-t border-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                  Total Amount
                </span>
                <span className="font-black text-gray-900">
                  {order.total.toLocaleString("vi-VN")}đ
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all">
                  Details
                </button>
                <button className="py-2.5 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 transition-all shadow-md shadow-orange-500/10">
                  Next Step
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {MOCK_ORDERS.filter((o) => activeTab === "All" || o.status === activeTab)
        .length === 0 && (
          <div className="py-20 text-center bg-white rounded-3xl border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-10 h-10 text-gray-200" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No orders here</h3>
            <p className="text-gray-500 text-sm">
              There are currently no orders in this category.
            </p>
          </div>
        )}
    </div>
  );
}
