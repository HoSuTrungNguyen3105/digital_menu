import React, { useState } from "react";
import {
  Calendar,
  Search,
  Download,
  Filter,
  ChevronRight,
  User,
  Clock,
  CheckCircle2,
} from "lucide-react";

// Mock Data
const MOCK_HISTORY = [
  {
    id: "ORD-HIST-001",
    date: "2023-12-30",
    table: "Table 05",
    items: "Sushi Set A x2, Coca x2",
    total: 450000,
    status: "Paid",
    customer: "Minh Anh",
  },
  {
    id: "ORD-HIST-002",
    date: "2023-12-30",
    table: "Table 02",
    items: "Bún Bò x1, Trà Đá x1",
    total: 65000,
    status: "Paid",
    customer: "Hoàng Nam",
  },
  {
    id: "ORD-HIST-003",
    date: "2023-12-29",
    table: "Table 10",
    items: "Pizza Seafood x1, Pepsi x2",
    total: 285000,
    status: "Paid",
    customer: "Thu Thủy",
  },
  {
    id: "ORD-HIST-004",
    date: "2023-12-29",
    table: "Table 01",
    items: "Cơm Gà x3, Soup x3",
    total: 320000,
    status: "Paid",
    customer: "Quốc Tuấn",
  },
  {
    id: "ORD-HIST-005",
    date: "2023-12-28",
    table: "Table 04",
    items: "Burger XL x2, Fries x2",
    total: 190000,
    status: "Paid",
    customer: "Bảo Ngọc",
  },
];

export default function OrderHistory() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-500 text-sm mt-1">
            Review all past transactions and orders
          </p>
        </div>
        <button className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by table, order ID, or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200">
          <Calendar className="w-4 h-4 text-orange-600" />
          Last 30 Days
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider">
                Order Details
              </th>
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider text-center">
                Table
              </th>
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider text-center">
                Amount
              </th>
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider text-center">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MOCK_HISTORY.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50/50 transition-all group"
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900 mb-0.5">
                      {order.id}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                      <Clock className="w-3 h-3 text-orange-500" /> {order.date}
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <User className="w-3 h-3 text-blue-500" />{" "}
                      {order.customer}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-black text-gray-600">
                    {order.table}
                  </span>
                </td>
                <td className="px-6 py-4 text-center font-black text-gray-900">
                  {order.total.toLocaleString("vi-VN")}đ
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-1.5 text-green-600 bg-green-50 px-3 py-1.5 rounded-xl border border-green-100 w-fit mx-auto">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="text-xs font-black uppercase">
                      {order.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-orange-600 transition-colors p-2 rounded-lg hover:bg-orange-50">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
