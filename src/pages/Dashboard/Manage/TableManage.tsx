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
  Loader2,
  ClipboardList,
  Pizza,
  History as HistoryIcon,
  LayoutGrid,
} from "lucide-react";
import Modal from "../../../components/Modal";
// import { useGetTables, useCreateTable, useGetTableById } from "../../../api/table.hooks";
import { Table, TableQueryParams } from "../../../types";
import FiltersLayout from "../Menu/components/FilterLayout";

// Mock Data
const MOCK_TABLES: Table[] = [
  {
    id: "table-001",
    tableNumber: "T-01",
    capacity: 2,
    status: "AVAILABLE",
    qrCode: "QR_T01_ABC123",
    createdAt: new Date("2024-01-15T08:00:00").toISOString(),
    updatedAt: new Date("2024-01-15T08:00:00").toISOString(),
    orders: [],
  },
  {
    id: "table-002",
    tableNumber: "T-02",
    capacity: 4,
    status: "OCCUPIED",
    qrCode: "QR_T02_DEF456",
    createdAt: new Date("2024-01-15T08:30:00").toISOString(),
    updatedAt: new Date("2024-01-15T12:00:00").toISOString(),
    orders: [
      {
        id: "order-001",
        status: "PENDING",
        createdAt: new Date("2024-01-15T12:00:00").toISOString(),
      },
      {
        id: "order-002",
        status: "IN_PROGRESS",
        createdAt: new Date("2024-01-15T12:15:00").toISOString(),
      },
    ],
  },
  {
    id: "table-003",
    tableNumber: "T-03",
    capacity: 6,
    status: "RESERVED",
    qrCode: "QR_T03_GHI789",
    createdAt: new Date("2024-01-15T09:00:00").toISOString(),
    updatedAt: new Date("2024-01-15T11:00:00").toISOString(),
    orders: [],
  },
  {
    id: "table-004",
    tableNumber: "T-04",
    capacity: 4,
    status: "AVAILABLE",
    qrCode: "QR_T04_JKL012",
    createdAt: new Date("2024-01-15T09:30:00").toISOString(),
    updatedAt: new Date("2024-01-15T09:30:00").toISOString(),
    orders: [],
  },
  {
    id: "table-005",
    tableNumber: "T-05",
    capacity: 2,
    status: "OCCUPIED",
    qrCode: "QR_T05_MNO345",
    createdAt: new Date("2024-01-15T10:00:00").toISOString(),
    updatedAt: new Date("2024-01-15T13:00:00").toISOString(),
    orders: [
      {
        id: "order-003",
        status: "COMPLETED",
        createdAt: new Date("2024-01-15T13:00:00").toISOString(),
      },
    ],
  },
  {
    id: "table-006",
    tableNumber: "T-06",
    capacity: 8,
    status: "AVAILABLE",
    qrCode: "QR_T06_PQR678",
    createdAt: new Date("2024-01-15T10:30:00").toISOString(),
    updatedAt: new Date("2024-01-15T10:30:00").toISOString(),
    orders: [],
  },
  {
    id: "table-007",
    tableNumber: "T-07",
    capacity: 4,
    status: "OCCUPIED",
    qrCode: "QR_T07_STU901",
    createdAt: new Date("2024-01-15T11:00:00").toISOString(),
    updatedAt: new Date("2024-01-15T14:00:00").toISOString(),
    orders: [
      {
        id: "order-004",
        status: "IN_PROGRESS",
        createdAt: new Date("2024-01-15T14:00:00").toISOString(),
      },
    ],
  },
  {
    id: "table-008",
    tableNumber: "T-08",
    capacity: 6,
    status: "AVAILABLE",
    qrCode: "QR_T08_VWX234",
    createdAt: new Date("2024-01-15T11:30:00").toISOString(),
    updatedAt: new Date("2024-01-15T11:30:00").toISOString(),
    orders: [],
  },
  {
    id: "table-009",
    tableNumber: "T-09",
    capacity: 2,
    status: "RESERVED",
    qrCode: "QR_T09_YZA567",
    createdAt: new Date("2024-01-15T12:00:00").toISOString(),
    updatedAt: new Date("2024-01-15T15:00:00").toISOString(),
    orders: [],
  },
  {
    id: "table-010",
    tableNumber: "T-10",
    capacity: 4,
    status: "AVAILABLE",
    qrCode: "QR_T10_BCD890",
    createdAt: new Date("2024-01-15T12:30:00").toISOString(),
    updatedAt: new Date("2024-01-15T12:30:00").toISOString(),
    orders: [],
  },
  {
    id: "table-011",
    tableNumber: "T-11",
    capacity: 2,
    status: "OCCUPIED",
    qrCode: "QR_T11_EFG123",
    createdAt: new Date("2024-01-15T13:00:00").toISOString(),
    updatedAt: new Date("2024-01-15T16:00:00").toISOString(),
    orders: [
      {
        id: "order-005",
        status: "PENDING",
        createdAt: new Date("2024-01-15T16:00:00").toISOString(),
      },
    ],
  },
  {
    id: "table-012",
    tableNumber: "T-12",
    capacity: 6,
    status: "AVAILABLE",
    qrCode: "QR_T12_HIJ456",
    createdAt: new Date("2024-01-15T13:30:00").toISOString(),
    updatedAt: new Date("2024-01-15T13:30:00").toISOString(),
    orders: [],
  },
  {
    id: "table-013",
    tableNumber: "T-13",
    capacity: 4,
    status: "RESERVED",
    qrCode: "QR_T13_KLM789",
    createdAt: new Date("2024-01-15T14:00:00").toISOString(),
    updatedAt: new Date("2024-01-15T17:00:00").toISOString(),
    orders: [],
  },
  {
    id: "table-014",
    tableNumber: "T-14",
    capacity: 8,
    status: "OCCUPIED",
    qrCode: "QR_T14_NOP012",
    createdAt: new Date("2024-01-15T14:30:00").toISOString(),
    updatedAt: new Date("2024-01-15T18:00:00").toISOString(),
    orders: [
      {
        id: "order-006",
        status: "IN_PROGRESS",
        createdAt: new Date("2024-01-15T18:00:00").toISOString(),
      },
      {
        id: "order-007",
        status: "COMPLETED",
        createdAt: new Date("2024-01-15T18:30:00").toISOString(),
      },
    ],
  },
  {
    id: "table-015",
    tableNumber: "T-15",
    capacity: 2,
    status: "AVAILABLE",
    qrCode: "QR_T15_QRS345",
    createdAt: new Date("2024-01-15T15:00:00").toISOString(),
    updatedAt: new Date("2024-01-15T15:00:00").toISOString(),
    orders: [],
  },
];

export default function TableManage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState<{
    tableNumber: string;
    capacity: number;
    status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED';
    qrCode: string;
  }>({
    tableNumber: "",
    capacity: 2,
    status: 'AVAILABLE',
    qrCode: "",
  });

  // Filter States
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'floor'>('grid');
  const [sortBy, setSortBy] = useState("newest");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrand, setActiveBrand] = useState("All");
  const [activePriceRange, setActivePriceRange] = useState("All");

  const categories = ["All", "AVAILABLE", "OCCUPIED", "RESERVED"];
  const brands = ["All", "VIP", "Regular", "Near Window", "Outdoor"]; // Mock attributes
  const priceRanges = ["All", "1-4 People", "5-8 People", "8+ People"];

  // Pagination Logic (Master Control)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
  });

  const handleRangeChange = (from: number, to: number, reset: boolean) => {
    if (reset) {
      setPagination({ currentPage: 1, perPage: 10 });
    } else {
      const newPerPage = to - from + 1;
      const newPage = Math.floor((from - 1) / newPerPage) + 1;
      setPagination({ currentPage: newPage, perPage: newPerPage });
    }
  };

  const handlePrevPage = () => {
    setPagination(prev => ({ ...prev, currentPage: Math.max(1, prev.currentPage - 1) }));
  };

  const handleNextPage = () => {
    setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }));
  };

  // API Hooks (Commented for mock data usage)
  // const queryParams: TableQueryParams = {
  //   current_page: pagination.currentPage,
  //   per_page: pagination.perPage,
  //   keyword: searchTerm,
  //   sort_by: sortBy === "newest" ? "createdAt" : "tableNumber",
  //   sort_dir: sortBy === "price-low" ? "ASC" : "DESC",
  // };

  // const { data: tablesResponse, isLoading, error } = useGetTables(queryParams);
  // const createTableMutation = useCreateTable();

  // // Fetch single table detail when a modal is open
  // const {
  //   data: detailTable,
  //   isLoading: isDetailLoading
  // } = useGetTableById(selectedTableId || "");

  // Mock data usage
  const isLoading = false;
  const error = null;
  const isDetailLoading = false;

  // Filter and search mock data
  let filteredTables = [...MOCK_TABLES];

  // Apply search filter
  if (searchTerm) {
    filteredTables = filteredTables.filter(table =>
      table.tableNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply category filter
  if (activeCategory !== "All") {
    filteredTables = filteredTables.filter(table => table.status === activeCategory);
  }

  // Apply capacity filter (price range)
  if (activePriceRange !== "All") {
    if (activePriceRange === "1-4 People") {
      filteredTables = filteredTables.filter(table => table.capacity >= 1 && table.capacity <= 4);
    } else if (activePriceRange === "5-8 People") {
      filteredTables = filteredTables.filter(table => table.capacity >= 5 && table.capacity <= 8);
    } else if (activePriceRange === "8+ People") {
      filteredTables = filteredTables.filter(table => table.capacity > 8);
    }
  }

  // Apply sorting
  if (sortBy === "newest") {
    filteredTables.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sortBy === "price-low") {
    filteredTables.sort((a, b) => a.capacity - b.capacity);
  } else if (sortBy === "price-high") {
    filteredTables.sort((a, b) => b.capacity - a.capacity);
  }

  // Calculate pagination
  const totalItems = filteredTables.length;
  const startIndex = (pagination.currentPage - 1) * pagination.perPage;
  const endIndex = startIndex + pagination.perPage;
  const displayTables = filteredTables.slice(startIndex, endIndex);

  // Calculate actual records for UI
  const fromRecord = totalItems > 0 ? startIndex + 1 : 0;
  const toRecord = Math.min(endIndex, totalItems);

  // Get selected table detail
  const detailTable = selectedTableId ? MOCK_TABLES.find(t => t.id === selectedTableId) : null;

  const handleViewQr = (table: Table) => {
    setSelectedTableId(table.id);
    setShowQrModal(true);
  };

  const handleViewDetail = (table: Table) => {
    setSelectedTableId(table.id);
    setShowDetailModal(true);
  };

  const handleCloseModals = () => {
    setShowQrModal(false);
    setShowDetailModal(false);
    setSelectedTableId(null);
  };

  const handleCreateTable = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mock table creation - just close modal for now
    console.log("Creating table with mock data:", formData);

    // TODO: Uncomment when API is ready
    // try {
    //   await createTableMutation.mutateAsync({
    //     tableNumber: formData.tableNumber,
    //     capacity: formData.capacity,
    //     status: formData.status,
    //     qrCode: formData.qrCode || undefined,
    //   });
    //   setShowCreateModal(false);
    //   setFormData({
    //     tableNumber: "",
    //     capacity: 4,
    //     status: 'AVAILABLE',
    //     qrCode: ""
    //   });
    // } catch (error) {
    //   console.error("Failed to create table:", error);
    // }

    // Mock success
    setShowCreateModal(false);
    setFormData({
      tableNumber: "",
      capacity: 4,
      status: 'AVAILABLE',
      qrCode: ""
    });
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
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20"
          >
            <Plus className="w-5 h-5" />
            Add Table
          </button>
        </div>
      </div>

      {/* Filters */}
      <FiltersLayout
        searchQuery={searchTerm}
        setSearchQuery={setSearchTerm}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortBy={sortBy}
        setSortBy={setSortBy}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeBrand={activeBrand}
        setActiveBrand={setActiveBrand}
        activePriceRange={activePriceRange}
        setActivePriceRange={setActivePriceRange}
        categories={categories}
        brands={brands}
        priceRanges={priceRanges}
        fromRecord={fromRecord}
        toRecord={toRecord}
        totalItems={totalItems}
        onRangeChange={handleRangeChange}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          Failed to load tables. Please try again.
        </div>
      )}

      {/* Floor Plan View */}
      {!isLoading && !error && viewMode === 'floor' && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-sm border border-gray-200 p-8 min-h-[600px]">
          {/* Restaurant Floor Layout */}
          <div className="relative w-full h-full">
            {/* Floor Grid Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}
            />

            {/* Legend */}
            <div className="flex gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Reserved</span>
              </div>
            </div>

            {/* Tables Layout */}
            <div className="relative grid grid-cols-5 gap-8 auto-rows-fr">
              {displayTables.map((table, index) => {
                const statusColor =
                  table.status === 'OCCUPIED' ? 'bg-red-500 border-red-600' :
                    table.status === 'RESERVED' ? 'bg-yellow-500 border-yellow-600' :
                      'bg-green-500 border-green-600';

                const statusColorLight =
                  table.status === 'OCCUPIED' ? 'bg-red-50 border-red-200 hover:border-red-300' :
                    table.status === 'RESERVED' ? 'bg-yellow-50 border-yellow-200 hover:border-yellow-300' :
                      'bg-green-50 border-green-200 hover:border-green-300';

                // Alternate between round and rectangular tables for visual variety
                const isRound = table.capacity <= 4;

                return (
                  <div
                    key={table.id}
                    className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${isRound ? 'aspect-square' : 'aspect-[4/3]'
                      }`}
                    onClick={() => handleViewDetail(table)}
                  >
                    {/* Table Shape */}
                    <div
                      className={`w-full h-full border-4 ${statusColorLight} shadow-lg transition-all duration-300 group-hover:shadow-2xl flex flex-col items-center justify-center ${isRound ? 'rounded-full' : 'rounded-2xl'
                        }`}
                    >
                      {/* Status Indicator */}
                      <div className={`absolute -top-2 -right-2 w-6 h-6 ${statusColor} rounded-full border-4 border-white shadow-md z-10`}></div>

                      {/* Table Content */}
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <LayoutGrid className="w-5 h-5 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-black text-gray-900 mb-1">
                          {table.tableNumber}
                        </h3>
                        <div className="flex items-center justify-center gap-1 text-gray-500">
                          <Users className="w-3.5 h-3.5" />
                          <span className="text-xs font-bold">{table.capacity}</span>
                        </div>
                      </div>

                      {/* Hover Actions */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 rounded-[inherit] flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewQr(table);
                            }}
                            className="p-2 bg-white rounded-lg shadow-lg hover:bg-orange-50 transition-colors"
                          >
                            <QrCode className="w-4 h-4 text-orange-600" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetail(table);
                            }}
                            className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Chair indicators for round tables */}
                    {isRound && (
                      <>
                        {Array.from({ length: Math.min(table.capacity, 6) }).map((_, i) => {
                          const angle = (i * 360) / Math.min(table.capacity, 6);
                          const radius = 52; // Percentage from center
                          const x = 50 + radius * Math.cos((angle - 90) * Math.PI / 180);
                          const y = 50 + radius * Math.sin((angle - 90) * Math.PI / 180);

                          return (
                            <div
                              key={i}
                              className="absolute w-3 h-3 bg-gray-400 rounded-sm shadow-sm"
                              style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                transform: 'translate(-50%, -50%)'
                              }}
                            />
                          );
                        })}
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {displayTables.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <LayoutGrid className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">No tables in the floor plan</p>
                <p className="text-gray-400 text-sm">Add tables to see them on the floor plan</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grid View */}
      {!isLoading && !error && viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayTables.map((table) => (
            <div
              key={table.id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 transition-all group relative cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${table.status === "OCCUPIED"
                    ? "bg-red-50 text-red-600"
                    : "bg-green-50 text-green-600"
                    }`}
                >
                  <Grid className="w-6 h-6" />
                </div>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${table.status === "OCCUPIED"
                    ? "bg-red-50 text-red-600"
                    : "bg-green-50 text-green-600"
                    }`}
                >
                  {table.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {table.tableNumber}
              </h3>
              <p className="text-gray-400 text-xs mb-3 flex items-center gap-1 text-left">
                <Users className="w-3 h-3" /> Capacity: {table.capacity} people
              </p>

              <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-50">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewQr(table);
                  }}
                  className="flex items-center justify-center gap-2 py-2 rounded-lg bg-orange-50 text-orange-600 text-xs font-bold hover:bg-orange-100 transition-colors"
                >
                  <QrCode className="w-4 h-4" />
                  View QR
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetail(table);
                  }}
                  className="flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-50 text-gray-600 text-xs font-bold hover:bg-gray-100 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {!isLoading && !error && viewMode === 'list' && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Table Name</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Capacity</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Created At</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {displayTables.map((table) => (
                  <tr key={table.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
                          <Grid className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">{table.tableNumber}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${table.status === 'AVAILABLE' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                        }`}>
                        {table.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                        <Users className="w-4 h-4 text-gray-400" />
                        {table.capacity}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-gray-400 font-medium">
                        {new Date(table.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewQr(table)}
                          className="p-2 hover:bg-orange-50 text-gray-400 hover:text-orange-600 rounded-lg transition-colors"
                        >
                          <QrCode className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleViewDetail(table)}
                          className="p-2 hover:bg-gray-100 text-gray-400 hover:text-gray-900 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setFormData({
            tableNumber: "",
            capacity: 4,
            status: 'AVAILABLE',
            qrCode: ""
          });
        }}
        title="Create New Table"
        type="center"
      >
        <form onSubmit={handleCreateTable} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest text-left">
                Table Name
              </label>
              <input
                type="text"
                value={formData.tableNumber}
                onChange={(e) =>
                  setFormData({ ...formData, tableNumber: e.target.value })
                }
                placeholder="e.g., T101"
                required
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest text-left">
                Capacity
              </label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: parseInt(e.target.value) })
                }
                min="1"
                max="20"
                required
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest text-left">
              Initial Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as any })
              }
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all appearance-none"
            >
              <option value="AVAILABLE">Available</option>
              <option value="OCCUPIED">Occupied</option>
              <option value="RESERVED">Reserved</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest text-left">
              Custom QR Mapping (Optional)
            </label>
            <div className="relative">
              <QrCode className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={formData.qrCode}
                onChange={(e) =>
                  setFormData({ ...formData, qrCode: e.target.value })
                }
                placeholder="QR_T101_HASH"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1 ml-1">If left blank, the system will auto-generate a secure QR link.</p>
          </div>

          <div className="flex gap-3 pt-6 border-t border-gray-50">
            <button
              type="button"
              onClick={() => {
                setShowCreateModal(false);
                setFormData({
                  tableNumber: "",
                  capacity: 4,
                  status: 'AVAILABLE',
                  qrCode: ""
                });
              }}
              className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all"
            >
              Discard
            </button>
            <button
              type="submit"
              className="flex-2 py-3 px-6 bg-gray-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              Finalize & Create
            </button>
          </div>
        </form>
      </Modal>

      {/* DETAIL MODAL - PREMIUM REDESIGN */}
      <Modal
        isOpen={showDetailModal}
        onClose={handleCloseModals}
        title="Table Master Insights"
        type="center"
      >
        {isDetailLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
            <p className="text-gray-500 font-medium animate-pulse">Syncing table data...</p>
          </div>
        ) : detailTable && (
          <div className="space-y-6">
            {/* Glossy Header card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-[2rem] text-white shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full -ml-12 -mb-12 blur-2xl"></div>

              <div className="relative flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner">
                  <Grid className="w-8 h-8 text-orange-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black tracking-tight">
                      {detailTable.tableNumber}
                    </h2>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${detailTable.status === 'AVAILABLE' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                      {detailTable.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs font-medium mt-0.5 text-left">
                    ID: {detailTable.id}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <Users className="w-5 h-5 text-orange-500 mb-1" />
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Capacity</span>
                <span className="text-sm font-black text-gray-900">{detailTable.capacity}</span>
              </div>
              <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <ClipboardList className="w-5 h-5 text-blue-500 mb-1" />
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Orders</span>
                <span className="text-sm font-black text-gray-900">{detailTable.orders?.length || 0}</span>
              </div>
              <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                <HistoryIcon className="w-5 h-5 text-purple-500 mb-1" />
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Joined</span>
                <span className="text-sm font-black text-gray-900">
                  {new Date(detailTable.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Orders Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-black text-gray-900 flex items-center gap-2 uppercase tracking-tight text-left">
                  <div className="w-1.5 h-4 bg-orange-600 rounded-full"></div>
                  Recent Activity
                </h4>
                {detailTable.orders && detailTable.orders.length > 0 && (
                  <button className="text-[10px] font-bold text-orange-600 hover:underline">View All</button>
                )}
              </div>

              <div className="space-y-3">
                {detailTable.orders && detailTable.orders.length > 0 ? (
                  detailTable.orders.slice(0, 3).map((order: any, idx) => (
                    <div key={idx} className="p-3 bg-white border border-gray-100 rounded-xl flex items-center justify-between hover:border-orange-100 transition-all shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                          <Pizza className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold text-gray-900">Order #{order.id.slice(-4)}</p>
                          <p className="text-[10px] text-gray-400">{new Date(order.createdAt).toLocaleTimeString()}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-1 rounded-md">
                        {order.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-10 bg-gray-50/50 rounded-[2rem] border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm">
                      <ClipboardList className="w-6 h-6 text-gray-300" />
                    </div>
                    <p className="text-xs font-bold text-gray-400 opacity-60">No active orders found.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setShowQrModal(true);
                }}
                className="group relative overflow-hidden py-4 px-4 bg-gray-900 text-white rounded-2xl font-bold text-xs hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <QrCode className="w-4 h-4" />
                Manage Master QR
              </button>
              <button className="py-4 px-4 bg-orange-600 text-white rounded-2xl font-bold text-xs hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20 active:scale-95 duration-150">
                Edit Configuration
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* QR MODAL */}
      <Modal
        isOpen={showQrModal}
        onClose={handleCloseModals}
        title="Table QR Code"
        type="center"
      >
        {isDetailLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
            <p className="text-gray-500 font-medium animate-pulse">Generating QR insights...</p>
          </div>
        ) : detailTable && (
          <div className="flex flex-col items-center py-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-orange-500 mb-6">
              {/* Mock QR Placeholder */}
              <div className="w-48 h-48 bg-gray-900 rounded-lg flex flex-col items-center justify-center p-4 text-center">
                <QrCode className="w-20 h-20 text-white mb-2" />
                <span className="text-white text-[10px] font-mono break-all line-clamp-2">
                  {detailTable.qrCode || `http://localhost:5173/menu/${detailTable.id}`}
                </span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {detailTable.tableNumber}
            </h2>
            <p className="text-gray-500 text-sm mb-8 text-center">
              Experience dynamic QR table management
            </p>

            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              <button className="flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all">
                <Download className="w-5 h-5" />
                Download
              </button>
              <button
                onClick={() =>
                  window.open(`/menu/${detailTable.id}`, "_blank")
                }
                className="flex items-center justify-center gap-2 py-3 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/20"
              >
                <ExternalLink className="w-5 h-5" />
                Live View
              </button>
            </div>
            <p className="mt-6 text-xs text-gray-400 text-center uppercase tracking-widest font-black opacity-40">
              Master Control Interface
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
