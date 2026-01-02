import React from "react";
import { useCart } from "../../context/CartContext";
import {
  ArrowLeft,
  Clock,
  ChevronRight,
  ShoppingBag,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const HistoryItem = () => {
  const { orders, clearOrders } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900 pb-24">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm px-4 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold">Lịch sử đặt món</h1>
        {orders.length > 0 && (
          <button
            onClick={clearOrders}
            className="ml-auto text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"
            title="Xóa tất cả"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-4">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Chưa có đơn hàng nào
              </h2>
              <p className="text-gray-500 text-sm">
                Cùng khám phá thực đơn và đặt ngay món ngon bạn nhé!
              </p>
            </div>
            <button
              onClick={() => navigate("/RestaurantMenu")}
              className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/30 active:scale-95 transition-all"
            >
              Xem thực đơn
            </button>
          </div>
        ) : (
          <AnimatePresence>
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                        #{order.id.split("-")[1].slice(-5)}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                        <Clock className="w-3 h-3" />
                        {order.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full border border-green-100">
                    <CheckCircle2 className="w-3 h-3" />
                    {order.status}
                  </div>
                </div>

                <div className="divide-y divide-gray-50">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="py-2 flex justify-between items-center"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800 line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            x{item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-bold">
                        {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-500 font-medium ml-2">
                    Tổng thanh toán
                  </span>
                  <span className="text-lg font-black text-gray-900">
                    {order.total.toLocaleString("vi-VN")}đ
                  </span>
                  <button
                    onClick={() => navigate("/Payment")}
                    className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold ml-28 hover:bg-orange-700 transition"
                  >
                    Thanh toán ngay
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
};

export default HistoryItem;
