import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  ShoppingBag,
  MapPin,
  Flame,
  Star,
  Tag,
} from "lucide-react";
import { getPublicMenu } from "../../api/public.api";
import MenuItemCard from "./MenuItemCard";

const FILTERS = [
  { id: "all", label: "Tất cả", icon: null },
  {
    id: "popular",
    label: "Phổ biến",
    icon: <Star className="w-4 h-4 text-yellow-500" />,
  },
  {
    id: "under_50k",
    label: "Dưới 50k",
    icon: <Tag className="w-4 h-4 text-green-500" />,
  },
];

export default function PublicMenu() {
  const { tableId } = useParams();
  const [data, setData] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await getPublicMenu(tableId);
        const apiData = res.data.data;

        // Normalize Data
        const normalizedData = {
          restaurant: apiData?.restaurant || {},
          menus: Array.isArray(apiData?.menus) ? apiData.menus : [],
          items: Array.isArray(apiData?.items) ? apiData.items : [],
        };

        setData(normalizedData);
        setItems(normalizedData.items);
      } catch (err) {
        console.error("Failed to load public menu", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, [tableId]);

  // --- FILTER LOGIC ---
  const getFilteredItems = () => {
    if (!data) return [];
    let result = data.items;

    // 1. By Category
    if (activeCategory !== "all") {
      result = result.filter((item) => item.menuId === activeCategory);
    }

    // 2. By Filter Tag
    if (activeFilter === "under_50k") {
      result = result.filter((item) => item.price < 50000);
    }

    // 3. By Search
    if (searchQuery) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Map to View Model (Add placeholders for missing UI data)
    return result.map((item) => ({
      ...item,
      // Fallback UI data since backend might be simple
      image:
        item.image ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 100 + Math.floor(Math.random() * 500),
      minOrder: "15 min",
      isFlashDeal: Math.random() > 0.8, // Simulate some deals
      originalPrice: item.price * 1.2,
      discount: Math.random() > 0.8 ? "Giảm 20%" : null,
    }));
  };

  const filterItemss = FILTERS.map((e) => {
    {
      label: e.label;
      value: e.id;
    }
  });

  const filteredItems = getFilteredItems();

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
        />
        <p className="mt-4 text-gray-500 font-medium">Đang tải thực đơn...</p>
      </div>
    );
  }

  if (!data) return <div className="p-8 text-center">Menu not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-24 font-sans text-gray-900">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        {/* Top Bar */}
        <div className="flex items-center gap-3 p-4">
          <Link
            to="/"
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm món ngon..."
              className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <ShoppingBag className="w-6 h-6 text-gray-700" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>

        {/* Categories / Filters */}
        <div className="flex px-4 pb-3 gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
              activeCategory === "all"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Tất cả
          </button>
          {data.menus.map((menu) => (
            <button
              key={menu._id}
              onClick={() => setActiveCategory(menu._id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                activeCategory === menu._id
                  ? "bg-orange-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {menu.title}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* RESTAURANT INFO */}
        <div className="mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg">{data.restaurant.name}</h1>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              <MapPin className="w-3 h-3" />{" "}
              {data.restaurant.address || "123 Street"}
            </div>
          </div>
          <div className="text-right">
            <span className="block text-xs text-gray-400 uppercase tracking-wider">
              Bàn số
            </span>
            <span className="text-2xl font-black text-orange-600">
              {tableId}
            </span>
          </div>
        </div>

        {/* FLASH DEAL BANNER (Static for visual impact) */}
        {!searchQuery && activeCategory === "all" && (
          <div className="relative overflow-hidden rounded-[2rem] p-6 text-white mb-8 shadow-xl shadow-orange-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-500 to-orange-400 animate-gradient-x" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                <span className="font-bold text-yellow-200 text-xs uppercase">
                  Flash Deals
                </span>
              </div>
              <h2 className="text-2xl font-black mb-1">
                Món Ngon <br /> Giá Hời
              </h2>
              <p className="text-sm opacity-90">
                Giảm tới 50% cho các món best-seller!
              </p>
            </div>
          </div>
        )}

        {/* LIST ITEMS */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p>Không tìm thấy món ăn nào.</p>
            </div>
          ) : (
            // Using AnimatePresence for smooth filtering
            <AnimatePresence>
              {filteredItems.map((item) => (
                <MenuItemCard key={item._id} item={item} />
              ))}
            </AnimatePresence>
          )}
        </div>
      </main>

      {/* FLOATING CART */}
      <footer className="fixed bottom-6 left-4 right-4 max-w-lg mx-auto z-40">
        <div className="bg-gray-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl flex justify-between items-center ring-1 ring-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shrink-0">
              <span className="font-bold">0</span>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">
                Tổng thanh toán
              </p>
              <p className="font-bold text-sm">0đ</p>
            </div>
          </div>
          <button className="bg-white text-gray-900 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-100">
            Xem Giỏ
          </button>
        </div>
      </footer>
    </div>
  );
}
