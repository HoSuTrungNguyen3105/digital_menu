import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Search,
  Plus,
  Minus,
  ShoppingBag,
  Filter,
  CheckCircle,
  X,
  Home,
  ChevronDown,
  Clock, // Add Clock icon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import Modal from "../../components/Modal"; // Import Modal

// --- MOCK DATA GENERATOR ---
const NAMES = [
  "Bún Thịt Nướng",
  "Cơm Tấm Sườn Bì",
  "Phở Bò Đặc Biệt",
  "Bánh Mì Chảo",
  "Gỏi Cuốn Tôm Thịt",
  "Nem Nướng Nha Trang",
  "Bún Bò Huế",
  "Mì Quảng Ếch",
  "Hủ Tiếu Nam Vang",
  "Bánh Xèo Miền Tây",
  "Trà Sữa Trân Châu",
  "Cà Phê Sữa Đá",
  "Nước Ép Cam",
  "Sinh Tố Bơ",
  "Trà Đào Cam Sả",
  "Sting Dâu",
  "Pepsi",
  "7 Up",
  "Nước Suối",
  "Yogurt Việt Quất",
  "Yogurt Xoài",
  "Yogurt Mật Ong",
  "Pudding Socola",
  "Panna Cotta Xoài",
  "Panna Cotta Kiwi",
];

const IMAGES = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&q=80",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=80",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&q=80",
];

const CATEGORIES = [
  "Món Chính",
  "Ăn Vặt",
  "Mì Kim Chi",
  "Mì Tứ Xuyên",
  "Mì Tomyum",
  "Giải Khát",
  "Trà Sữa",
  "Yogurt",
  "Tráng Miệng",
];

interface MockMenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: string;
  sold: number;
  isPromo: boolean;
}

const generateMockData = (count = 100): MockMenuItem[] => {
  return Array.from({ length: count }, (_, i): MockMenuItem => {
    // Distribute categories somewhat evenly
    const categoryName = CATEGORIES[i % CATEGORIES.length];

    // Pick a name related to category if possible (simple mock logic)
    let baseName = NAMES[i % NAMES.length];

    // Custom price range
    const price = 12000 + Math.floor(Math.random() * 50) * 1000;

    return {
      id: i + 1,
      name: baseName, // In real app, name would match category
      description:
        "Hương vị đậm đà, nguyên liệu tươi ngon, được chế biến công phu bởi các đầu bếp hàng đầu.",
      price: price,
      image: IMAGES[i % IMAGES.length],
      category: categoryName,
      rating: (3.5 + Math.random() * 1.5).toFixed(1),
      sold: Math.floor(Math.random() * 2000),
      isPromo: Math.random() > 0.8,
    };
  });
};

const RestaurantMenu = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, updateQuantity, clearCart, placeOrder } =
    useCart();
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]);
  const [showCartModal, setShowCartModal] = useState<boolean>(false);
  const [isOrdering, setIsOrdering] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Modal State
  const [selectedItem, setSelectedItem] = useState<MockMenuItem | null>(null);

  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Derived state from Context
  const cart = useMemo(() => {
    return cartItems.reduce<{ [key: string]: number }>((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});
  }, [cartItems]);

  // Create items once
  const allItems = useMemo(() => generateMockData(80), []);

  // Filter items
  const filteredItems = useMemo(() => {
    let items = allItems;
    if (searchTerm) {
      items = items.filter((i) =>
        i.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return items;
  }, [allItems, searchTerm]);

  // Group items by category for the display list
  const groupedItems = useMemo(() => {
    const groups: { [key: string]: MockMenuItem[] } = {};
    CATEGORIES.forEach((cat) => (groups[cat] = []));
    filteredItems.forEach((item) => {
      if (groups[item.category]) {
        groups[item.category].push(item);
      }
    });
    return groups;
  }, [filteredItems]);

  // --- CART UTILS ---
  const getItemQty = (id: number): number => cart[id.toString()] || 0;

  const handleUpdateCart = (item: MockMenuItem, delta: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Prevent modal opening when clicking +/- 
    const currentQty = getItemQty(item.id);
    if (currentQty === 0 && delta > 0) {
      addToCart({
        id: item.id.toString(),
        title: item.name,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
      });
    } else {
      updateQuantity(item.id.toString(), delta);
    }
  };

  const handleItemClick = (item: MockMenuItem) => {
    setSelectedItem(item);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleOrder = () => {
    setIsOrdering(true);
    // Simulate API call
    setTimeout(() => {
      setIsOrdering(false);
      setOrderSuccess(true);
      placeOrder(); // Call placeOrder instead of clearCart
    }, 2000);
  };

  const scrollToCategory = (cat: string) => {
    setActiveCategory(cat);
    const el = categoryRefs.current[cat];
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 180; // Offset for header
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900 pb-24">
      {/* --- HEADER --- */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        {/* Top Bar with Search */}
        <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-100">
          <button
            onClick={() => navigate("/")}
            className="p-2 border border-orange-200 rounded-lg text-orange-600 hover:bg-orange-50"
          >
            <Home className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Bạn muốn tìm món gì ?"
              className="w-full bg-gray-100 pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none focus:bg-white focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={() => navigate("/booking-history")}
            className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center gap-2"
            title="Lịch sử đặt món"
          >
            <Clock className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide px-4 py-3 bg-white">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => scrollToCategory(cat)}
              className={`whitespace-nowrap text-sm font-bold uppercase transition-colors relative pb-1 ${
                activeCategory === cat
                  ? "text-orange-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"
                />
              )}
            </button>
          ))}
          <div className="flex-shrink-0 text-gray-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* --- MENU LIST --- */}
      <div className="px-4 py-4 space-y-8 max-w-7xl mx-auto">
        {CATEGORIES.map((cat) => {
          const items = groupedItems[cat];
          if (!items || items.length === 0) return null;

          return (
            <div key={cat} ref={(el) => (categoryRefs.current[cat] = el)}>
              <h3 className="text-gray-500 font-bold uppercase text-sm mb-3 tracking-wide pl-1 border-l-4 border-transparent">
                {cat}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => {
                  const qty = getItemQty(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleItemClick(item)} // OPEN MODAL
                      className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-4 h-32 cursor-pointer active:scale-[0.98] transition-transform"
                    >
                      {/* Image */}
                      <div className="w-24 h-full flex-shrink-0 relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        {qty > 0 && (
                          <div className="absolute top-1 right-1 bg-orange-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md">
                            {qty}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col relative">
                        <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1 line-clamp-2">
                          {item.name}
                        </h4>

                        <div className="mt-auto flex items-end justify-between">
                          <span className="text-orange-600 font-bold text-base">
                            {item.price.toLocaleString("vi-VN")}
                          </span>

                          <button
                            onClick={(e) => handleUpdateCart(item, 1, e)}
                            className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-colors"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* --- FOOD DETAIL MODAL --- */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title="Chi tiết món ăn"
      >
        {selectedItem && (
          <div className="space-y-4 pb-20">
            <div className="relative h-56 w-full rounded-2xl overflow-hidden shadow-sm">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-full object-cover"
              />
              {selectedItem.isPromo && (
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
                  PROMO
                </span>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {selectedItem.name}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <span className="text-orange-600 font-bold text-lg">
                  {selectedItem.price.toLocaleString("vi-VN")}đ
                </span>
                <span>
                  • {selectedItem.rating}{" "}
                  <span className="text-yellow-400">★</span>
                </span>
                <span>• Đã bán {selectedItem.sold}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {selectedItem.description ||
                  "Hương vị đậm đà, được chế biến từ những nguyên liệu tươi ngon nhất. Món ăn này là sự lựa chọn tuyệt vời cho bữa ăn của bạn."}
              </p>
            </div>

            {/* Add to Cart Bar in Modal */}
            <div className="pt-4 mt-auto">
              <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => handleUpdateCart(selectedItem, -1, e)}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Minus className="w-5 h-5 text-gray-600" />
                  </button>
                  <span className="text-xl font-bold w-6 text-center">
                    {getItemQty(selectedItem.id)}
                  </span>
                  <button
                    onClick={(e) => handleUpdateCart(selectedItem, 1, e)}
                    className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center hover:bg-orange-700 shadow-lg shadow-orange-500/30"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-bold"
                >
                  {getItemQty(selectedItem.id) > 0 ? "Đã chọn" : "Thêm vào giỏ"}
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* --- BOTTOM FLOATING BAR --- */}
      <AnimatePresence>
        {totalItems > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-40">
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 shadow-lg flex items-center justify-between cursor-pointer hover:brightness-110 transition-all"
              onClick={() => setShowCartModal(true)}
            >
              {/* Left: Cart Items Preview */}
              <div className="flex items-center gap-3">
                <div className="relative flex -space-x-3 items-center pl-2">
                  {cartItems.slice(0, 3).map((item, idx) => (
                    <img
                      key={item.id}
                      src={item.image}
                      className="w-10 h-10 rounded-full border-2 border-orange-500 object-cover bg-white"
                    />
                  ))}
                  {cartItems.length > 3 && (
                    <div className="w-10 h-10 rounded-full border-2 border-orange-500 bg-gray-900 text-white flex items-center justify-center text-xs font-bold relative z-10">
                      +{cartItems.length - 3}
                    </div>
                  )}
                  <div className="w-8 h-8 rounded-full bg-gray-900 absolute -top-2 -right-2 flex items-center justify-center text-xs font-bold border-2 border-orange-500">
                    {totalItems}
                  </div>
                </div>

                <div className="ml-4 flex flex-col">
                  <span className="text-xl font-bold leading-none">
                    {totalPrice.toLocaleString("vi-VN")}
                  </span>
                  {/* <span className="text-xs text-orange-100 opacity-90">Tổng cộng</span> */}
                </div>
              </div>

              {/* Right: Action */}
              <div className="flex items-center gap-2 pr-2">
                <span className="font-bold text-sm uppercase tracking-wide">
                  Xem và xác nhận
                </span>
                {/* <ArrowRight className="w-5 h-5" /> */}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- CART COMPONENT (Unchanged mostly, just styling tweaks if needed) --- */}
      <AnimatePresence>
        {showCartModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCartModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[90vh] flex flex-col"
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-orange-600" />
                  Giỏ hàng của bạn
                </h2>
                <button
                  onClick={() => setShowCartModal(false)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                    />
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-gray-900 text-sm line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-orange-600 font-bold text-sm">
                        {item.price.toLocaleString("vi-VN")}đ
                      </p>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 h-fit self-center">
                      <button
                        onClick={() => handleUpdateCart(item, -1)}
                        className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm border border-gray-200"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold w-4 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateCart(item, 1)}
                        className="w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm border border-gray-200"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50 pb-8">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-gray-500 text-sm">Tổng thanh toán</span>
                  <span className="text-2xl font-bold text-orange-600">
                    {totalPrice.toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <button
                  disabled={isOrdering}
                  onClick={handleOrder}
                  className="w-full bg-orange-600 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30 hover:bg-orange-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isOrdering ? "Đang xử lý..." : "Xác Nhận Đặt Món"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {orderSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle className="w-10 h-10" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">Đặt Món Thành Công!</h2>
            <p className="text-gray-500 mb-8 max-w-xs text-sm">
              Nhà bếp đã nhận được đơn hàng. Chúc bạn ngon miệng!
            </p>
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <button
                onClick={() => {
                  setOrderSuccess(false);
                  setShowCartModal(false);
                }}
                className="w-full bg-gray-100 text-gray-900 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
              >
                Quay lại thực đơn
              </button>
              <button
                onClick={() => navigate("/Payment")}
                className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition"
              >
                Thanh toán ngay
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RestaurantMenu;
