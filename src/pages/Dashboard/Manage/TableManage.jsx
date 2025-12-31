import React, { useState } from "react";
import {
  Plus,
  Search,
  QrCode,
  MoreVertical,
  Edit2,
  Trash2,
  Download,
  Users,
  Grid,
  ExternalLink,
} from "lucide-react";
import Modal from "../../../components/Modal";

// Mock Data
const MOCK_TABLES = [
  {
    id: "T1",
    name: "Table 01",
    capacity: 4,
    restaurant: "Nhà Hàng Món Ngon",
    status: "Available",
    qrUrl: "TAB01",
  },
  {
    id: "T2",
    name: "Table 02",
    capacity: 2,
    restaurant: "Nhà Hàng Món Ngon",
    status: "Occupied",
    qrUrl: "TAB02",
  },
  {
    id: "T3",
    name: "Table 03",
    capacity: 6,
    restaurant: "Nhà Hàng Món Ngon",
    status: "Available",
    qrUrl: "TAB03",
  },
  {
    id: "T4",
    name: "Table 04",
    capacity: 4,
    restaurant: "Nhà Hàng Món Ngon",
    status: "Available",
    qrUrl: "TAB04",
  },
  {
    id: "T5",
    name: "Table 05",
    capacity: 4,
    restaurant: "Sushi Sakura",
    status: "Available",
    qrUrl: "TAB05",
  },
  {
    id: "T6",
    name: "Table 06",
    capacity: 8,
    restaurant: "Sushi Sakura",
    status: "Occupied",
    qrUrl: "TAB06",
  },
];

export default function TableManage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTable, setSelectedTable] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);

  const filteredTables = MOCK_TABLES.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.restaurant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewQr = (table) => {
    setSelectedTable(table);
    setShowQrModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 text-left">
            Manage Tables
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Generate and manage QR codes for your tables
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg">
            <QrCode className="w-5 h-5" />
            Print All QRs
          </button>
          <button className="bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20">
            <Plus className="w-5 h-5" />
            Add Table
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tables or restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTables.map((table) => (
          <div
            key={table.id}
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 transition-all group relative"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  table.status === "Occupied"
                    ? "bg-red-50 text-red-600"
                    : "bg-green-50 text-green-600"
                }`}
              >
                <Grid className="w-6 h-6" />
              </div>
              <span
                className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${
                  table.status === "Occupied"
                    ? "bg-red-50 text-red-600"
                    : "bg-green-50 text-green-600"
                }`}
              >
                {table.status}
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {table.name}
            </h3>
            <p className="text-gray-400 text-xs mb-3 flex items-center gap-1">
              <Users className="w-3 h-3" /> Capacity: {table.capacity} people
            </p>
            <p className="text-gray-500 text-sm font-medium mb-4">
              {table.restaurant}
            </p>

            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-50">
              <button
                onClick={() => handleViewQr(table)}
                className="flex items-center justify-center gap-2 py-2 rounded-lg bg-orange-50 text-orange-600 text-xs font-bold hover:bg-orange-100 transition-colors"
              >
                <QrCode className="w-4 h-4" />
                View QR
              </button>
              <button className="flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 text-gray-600 text-xs font-bold hover:bg-gray-100 transition-colors">
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* QR MODAL */}
      <Modal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        title="Table QR Code"
      >
        {selectedTable && (
          <div className="flex flex-col items-center py-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-orange-500 mb-6">
              {/* Mock QR Placeholder */}
              <div className="w-48 h-48 bg-gray-900 rounded-lg flex flex-col items-center justify-center p-4 text-center">
                <QrCode className="w-20 h-20 text-white mb-2" />
                <span className="text-white text-[10px] font-mono break-all">{`http://localhost:5173/menu/${selectedTable.qrUrl}`}</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {selectedTable.name}
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              {selectedTable.restaurant}
            </p>

            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              <button className="flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all">
                <Download className="w-5 h-5" />
                Download
              </button>
              <button
                onClick={() =>
                  window.open(`/menu/${selectedTable.qrUrl}`, "_blank")
                }
                className="flex items-center justify-center gap-2 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20"
              >
                <ExternalLink className="w-5 h-5" />
                Live View
              </button>
            </div>
            <p className="mt-6 text-xs text-gray-400 text-center">
              Scan this QR code to access the menu for this specific table.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

import { ExternalLink } from "lucide-react";
