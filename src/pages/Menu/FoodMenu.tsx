import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Filter,
  Tag,
  ChevronRight,
  Clock,
  Star,
  Bike,
  Flame,
  ShoppingBag,
  MoreHorizontal,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
// import CountdownTimer from "./CountdownTimer";
import MenuItemCard from "./MenuItemCard";

interface MockMenuItem {
  id: number;
  name: string;
  description: string;
  originalPrice: number;
  price: number;
  discount: string;
  image: string;
  isFlashDeal: boolean;
  tags: string[];
  minOrder: string;
  rating: number;
  reviews: number;
}

// --- MOCK DATA ---
const MOCK_ITEMS: MockMenuItem[] = [
  {
    id: 1,
    name: "Sashimi Cá Hồi & Cá Trích",
    description:
      "Món Nhật tươi sống, bao gồm cá hồi Nauy và cá trích ép trứng.",
    originalPrice: 156000,
    price: 56000,
    discount: "Giảm 100k",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
    isFlashDeal: true,
    tags: ["Món Nhật", "Hải sản"],
    minOrder: "40.000đ",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Bún Thịt Nướng Đặc Biệt",
    description:
      "Bún tươi, thịt nướng than hoa, nem lụi, rau sống và nước mắm chua ngọt.",
    originalPrice: 45000,
    price: 34000,
    discount: "Giảm 11k",
    image:
      "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=400&q=80",
    isFlashDeal: true,
    tags: ["Bún", "Phở", "Cháo"],
    minOrder: "40.000đ",
    rating: 4.6,
    reviews: 89,
  },
  {
    id: 3,
    name: "Combo Gà Rán Jollibee",
    description: "2 Miếng gà giòn vui vẻ + 1 Mỳ Ý sốt bò bằm + 1 Pepsi vừa.",
    originalPrice: 89000,
    price: 69000,
    discount: "Giảm 20k",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80",
    isFlashDeal: false,
    tags: ["Fast Food", "Gà rán"],
    minOrder: "50.000đ",
    rating: 4.7,
    reviews: 256,
  },
  {
    id: 4,
    name: "Trà Sữa Trân Châu Đường Đen",
    description:
      "Sữa tươi thanh trùng Đà Lạt, trân châu nấu đường đen dẻo dai.",
    originalPrice: 55000,
    price: 35000,
    discount: "Giảm 20k",
    image:
      "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&w=400&q=80",
    isFlashDeal: true,
    tags: ["Đồ uống", "Trà sữa"],
    minOrder: "30.000đ",
    rating: 4.9,
    reviews: 512,
  },
];

const FILTERS = [
  { id: "all", label: "Tất cả", icon: null },
  {
    id: "flash_deal",
    label: "Flash Deal",
    icon: <Flame className="w-4 h-4 text-orange-500" />,
  },
  {
    id: "under_50k",
    label: "Dưới 50k",
    icon: <Tag className="w-4 h-4 text-green-500" />,
  },
  {
    id: "popular",
    label: "Phổ biến",
    icon: <Star className="w-4 h-4 text-yellow-500" />,
  },
] as const;

export default function FoodMenu() {
  const { tableId } = useParams<{ tableId?: string }>(); // Simulate getting table ID from URL
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [items, setItems] = useState<MockMenuItem[]>(MOCK_ITEMS);
  const targetTime = new Date(new Date().getTime() + 6 * 60 * 60 * 1000); // 6 hours from now

  // Filter Logic
  useEffect(() => {
    let result: MockMenuItem[] = MOCK_ITEMS;

    if (activeFilter === "flash_deal") {
      result = result.filter((item) => item.isFlashDeal);
    } else if (activeFilter === "under_50k") {
      result = result.filter((item) => item.price < 50000);
    } else if (activeFilter === "popular") {
      result = result.sort((a, b) => b.reviews - a.reviews);
    }

    if (searchQuery) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setItems(result);
  }, [searchQuery, activeFilter]);

  return (
    <div className="bg-gray-50 min-h-screen pb-24 font-sans antialiased text-gray-900">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
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
              placeholder="Bạn đang thèm gì nào?"
              className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
          </div>
          <button className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition relative">
            <ShoppingBag className="w-6 h-6 text-gray-700" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex px-4 pb-3 gap-3 overflow-x-auto no-scrollbar">
          <button className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap text-gray-700">
            <Filter className="w-4 h-4" /> Lọc
          </button>
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
                activeFilter === filter.id
                  ? "bg-orange-600 text-white shadow-md shadow-orange-500/20"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter.icon}
              {filter.label}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto">
        {/* TABLE INFO (If scanned) */}
        {tableId && (
          <div className="mb-6 flex items-center justify-between bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold">
                  {tableId.substring(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">
                  Đang ngồi tại
                </p>
                <p className="font-bold text-gray-900">Bàn số {tableId}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
              • Trực tuyến
            </span>
          </div>
        )}

        {/* FLASH DEAL BANNER */}
        <AnimatePresence>
          {activeFilter !== "under_50k" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="relative overflow-hidden rounded-[2rem] p-6 text-white mb-8 shadow-xl shadow-purple-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-orange-600 to-orange-300 animate-gradient-x" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                  <span className="font-bold tracking-wider text-yellow-200 text-xs uppercase">
                    Flash Sale
                  </span>
                </div>
                <h2 className="text-3xl font-black mb-2 leading-tight">
                  Ưu đãi <br />
                  Chớp Nhoáng!
                </h2>
                {/* <div className="flex items-center justify-between mt-6">
                  <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                    <p className="text-[10px] font-bold text-white/80 mb-1 uppercase tracking-wider">
                      Kết thúc sau
                    </p>
                    <CountdownTimer targetDate={targetTime} />
                  </div>
                  <button className="bg-white text-purple-600 w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MENU LIST */}
        <div className="space-y-5">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-bold text-lg text-gray-800">
              Món Ngon Cho Bạn
            </h3>
            <button className="p-1 rounded-full hover:bg-gray-100">
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <AnimatePresence mode="popLayout">
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-gray-400"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <p>Không tìm thấy món nào</p>
              </motion.div>
            ) : (
              items.map((item) => <MenuItemCard key={item.id} item={item} />)
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* FOOTER FLOATING BAR */}
      <footer className="fixed bottom-6 left-4 right-4 max-w-lg mx-auto">
        <div className="bg-gray-900/90 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl flex justify-between items-center border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shrink-0">
              <span className="font-bold text-lg">6%</span>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-0.5">
                Voucher đang dùng
              </p>
              <p className="font-bold text-sm">Giảm thêm 15.000đ</p>
            </div>
          </div>
          <button className="bg-white text-gray-900 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors">
            Xem Giỏ
          </button>
        </div>
      </footer>
    </div>
  );
}
