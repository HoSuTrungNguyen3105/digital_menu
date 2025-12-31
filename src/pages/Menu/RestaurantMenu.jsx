import React, { useMemo, useState, useEffect, Activity } from "react";
import {
  ArrowLeft,
  Search,
  Star,
  Plus,
  Minus,
  ShoppingBag,
  Filter,
  Utensils,
  X,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
  "Tất cả",
  "Món Chính",
  "Ăn Vặt",
  "Giải Khát",
  "Combo Cao Cấp",
  "Tráng Miệng",
];

// const CATEGORIES = [
//   { all: "Tất cả" },
//   { main: "Món Chính" },
//   { snack: "Ăn Vặt" },
//   { drink: "Giải Khát" },
//   { combo: "Combo Cao Cấp" },
//   { dessert: "Tráng Miệng" },
// ];

const generateMockData = (count = 100) => {
  return Array.from({ length: count }, (_, i) => {
    const categoryName =
      CATEGORIES[1 + Math.floor(Math.random() * (CATEGORIES.length - 1))];
    return {
      id: i + 1,
      name: `${NAMES[i % NAMES.length]} ${Math.floor(i / NAMES.length) + 1}`,
      description: "Hương vị đậm đà, nguyên liệu tươi ngon chọn lọc kỹ càng.",
      price: 25000 + Math.floor(Math.random() * 50) * 1000,
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
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [cart, setCart] = useState({}); // { itemId: quantity }
  const [showCartModal, setShowCartModal] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Create 100 items once
  const allItems = useMemo(() => generateMockData(100), []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "Tất cả") return allItems;
    return allItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, allItems]);

  // --- CART UTILS ---
  const getItemQty = (id) => cart[id] || 0;

  const handleUpdateCart = (id, delta) => {
    setCart((prev) => {
      const newQty = (prev[id] || 0) + delta;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const totalPrice = Object.entries(cart).reduce((total, [id, qty]) => {
    const item = allItems.find((i) => i.id === parseInt(id));
    return total + (item ? item.price * qty : 0);
  }, 0);

  const cartItemsDetail = Object.entries(cart).map(([id, qty]) => {
    return { ...allItems.find((i) => i.id === parseInt(id)), qty };
  });

  const handleOrder = () => {
    setIsOrdering(true);
    // Simulate API call
    setTimeout(() => {
      setIsOrdering(false);
      setOrderSuccess(true);
      setCart({});
    }, 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-32 font-sans text-gray-900 leading-snug">
      {/* --- HEADER --- */}
      <header className="bg-white sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex-1 text-center mx-2">
            <h1 className="text-lg font-bold truncate">Nhà Hàng Món Ngon</h1>
            <p className="text-xs text-green-600 font-medium">● Bàn T-01</p>
          </div>
          {/* <Activity>
          </Activity> */}
          <button
            onClick={() => totalItems > 0 && setShowCartModal(true)}
            className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition relative"
          >
            <ShoppingBag className="w-6 h-6 text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Categories Scroller */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-orange-600 text-white shadow-md shadow-orange-500/20"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* --- PROMO BANNER --- */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-4 text-white shadow-lg shadow-orange-500/20 flex flex-col justify-between h-32 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-bold text-xl mb-1">🔥 Giờ Vàng Giảm 50%</h2>
            <p className="text-orange-100 text-sm">Cho toàn bộ Combo Cao Cấp</p>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* --- MENU LIST --- */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            {activeCategory} ({filteredItems.length})
          </h2>
          <button className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
            <Filter className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const qty = getItemQty(item.id);
            return (
              <div
                key={item.id}
                className={`bg-white p-3 rounded-2xl shadow-sm border transition-all ${
                  qty > 0
                    ? "border-orange-500 ring-1 ring-orange-500"
                    : "border-gray-100 hover:shadow-md"
                }`}
              >
                <div className="flex gap-3">
                  {/* Image */}
                  <div className="w-24 h-24 flex-shrink-0 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    {item.isPromo && (
                      <span className="absolute top-0 left-0 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-lg rounded-tl-xl">
                        PROMO
                      </span>
                    )}
                    {qty > 0 && (
                      <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                        {qty}x
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-gray-500 line-clamp-2 mt-1 mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="text-orange-600 font-bold">
                          {item.price.toLocaleString("vi-VN")}đ
                        </span>
                        <span>• {item.rating}</span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-end mt-2">
                      {qty === 0 ? (
                        <button
                          onClick={() => handleUpdateCart(item.id, 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      ) : (
                        <div className="flex items-center bg-orange-50 rounded-full">
                          <button
                            onClick={() => handleUpdateCart(item.id, -1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-orange-600 hover:bg-orange-200"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-bold text-orange-700 w-6 text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => handleUpdateCart(item.id, 1)}
                            className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white hover:bg-orange-700 shadow-md shadow-orange-500/30"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- FLOATING CART BAR --- */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-40"
          >
            <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
              <div
                onClick={() => setShowCartModal(true)}
                className="flex-1 cursor-pointer"
              >
                <p className="text-xs text-gray-500">
                  Tổng cộng ({totalItems} món)
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">
                    {totalPrice.toLocaleString("vi-VN")}đ
                  </span>
                  <span className="text-xs font-bold text-orange-600">
                    Xem chi tiết
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowCartModal(true)}
                className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
              >
                Đặt Món
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CART / ORDER MODAL --- */}
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
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold">Xác Nhận Đơn Hàng</h2>
                <button
                  onClick={() => setShowCartModal(false)}
                  className="p-2 bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cartItemsDetail.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{item.name}</h4>
                      <p className="text-orange-600 font-medium">
                        {item.price.toLocaleString("vi-VN")}đ
                      </p>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 h-fit">
                      <button
                        onClick={() => handleUpdateCart(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm border border-gray-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold w-4 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => handleUpdateCart(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm border border-gray-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="border-t border-dashed border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tạm tính</span>
                    <span className="font-medium">
                      {totalPrice.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Phí dịch vụ (0%)</span>
                    <span className="font-medium">0đ</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2">
                    <span>Tổng thanh toán</span>
                    <span className="text-orange-600">
                      {totalPrice.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <button
                  disabled={isOrdering}
                  onClick={handleOrder}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isOrdering ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Đang gửi bếp...
                    </>
                  ) : (
                    "Xác Nhận Đặt Món"
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- SUCCESS OVERLAY --- */}
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
              className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle className="w-12 h-12" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-2">Đặt Món Thành Công!</h2>
            <p className="text-gray-500 mb-8 max-w-xs">
              Nhà bếp đã nhận được đơn hàng của bạn. Món ăn sẽ được phục vụ
              trong giây lát.
            </p>
            <button
              onClick={() => {
                setOrderSuccess(false);
                setShowCartModal(false);
              }}
              className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition"
            >
              Đặt Thêm Món
            </button>
            <button
              onClick={() => {
                navigate("booking");
              }}
              className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition"
            >
              THanh toans
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RestaurantMenu;
