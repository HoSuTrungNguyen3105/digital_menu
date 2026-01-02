import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaWallet,
  FaRegCreditCard,
  FaMoneyBillWave,
} from "react-icons/fa";
import MomoImg from "../../img/MOMO-Logo-App.png";
import { useCart } from "../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";
import Modal from "../../components/Modal";

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, orders, clearCart, clearOrders } = useCart();
  const [value, setValue] = useState("http://localhost:3000");

  // Combine all items for display without mutation
  const allOrderedItems = useMemo(() => {
    const itemMap = new Map();

    // Add items from current cart
    cartItems.forEach((item) => {
      itemMap.set(item.id, { ...item });
    });

    // Add items from history
    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (itemMap.has(item.id)) {
          const existing = itemMap.get(item.id);
          existing.quantity += item.quantity;
        } else {
          itemMap.set(item.id, { ...item });
        }
      });
    });

    return Array.from(itemMap.values());
  }, [cartItems, orders]);

  // Fix total calculation
  const historyTotal = useMemo(
    () => orders.reduce((sum, order) => sum + order.total, 0),
    [orders]
  );
  const finalTotal = cartTotal + historyTotal;

  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isQRImage, setIsQRImage] = useState(false);

  const handlePayment = () => {
    if (finalTotal === 0) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // setIsSuccess(true);
      // setIsQRImage(true);
      handleQRImage();
      // clearCart();
      // clearOrders();
    }, 2000);
  };

  const handleQRImage = () => {
    setIsQRImage(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md w-full"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-4xl" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            Thanh toán xong!
          </h2>
          <p className="text-gray-500 mb-8 font-medium">
            Cảm ơn bạn đã ủng hộ nhà hàng. Chúc bạn một ngày tốt lành!
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-95"
          >
            Về trang chủ
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 px-4 py-4 sm:px-6">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-50 rounded-full transition-all text-gray-600"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <h1 className="text-xl font-black text-gray-900">Thanh toán</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        {/* Order Details */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-orange-600 rounded-full"></span>
              Chi tiết đơn hàng
            </h2>

            <div className="space-y-4">
              {allOrderedItems.length > 0 ? (
                allOrderedItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 group">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 font-medium">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-gray-900">
                        {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400 font-medium">
                  Chưa có món nào được chọn.
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-dashed border-gray-200 space-y-3">
              <div className="flex justify-between text-sm text-gray-500 font-medium">
                <span>Tạm tính</span>
                <span>{finalTotal.toLocaleString("vi-VN")}đ</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 font-medium">
                <span>Phí dịch vụ (0%)</span>
                <span>0đ</span>
              </div>
              <div className="flex justify-between items-end pt-2">
                <span className="text-base font-bold text-gray-900">
                  Tổng cộng
                </span>
                <span className="text-3xl font-black text-orange-600 tracking-tight">
                  {finalTotal.toLocaleString("vi-VN")}đ
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h2 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
            Phương thức thanh toán
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setPaymentMethod("momo")}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                paymentMethod === "momo"
                  ? "border-pink-500 bg-pink-50/50"
                  : "border-gray-50 hover:border-gray-200"
              }`}
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center p-2">
                <img
                  src={MomoImg}
                  alt="MoMo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Ví MoMo</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  Khuyên dùng
                </p>
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod("vnpay")}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                paymentMethod === "vnpay"
                  ? "border-blue-500 bg-blue-50/50"
                  : "border-gray-50 hover:border-gray-200"
              }`}
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center p-2">
                <img
                  src="https://vnpay.vn/assets/images/logo-icon/logo-primary.svg"
                  alt="VNPay"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">VNPay QR</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  Nhanh chóng
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handlePayment}
          disabled={isProcessing || finalTotal === 0}
          className={`w-full py-5 rounded-3xl font-black text-lg text-white shadow-xl transition-all active:scale-[0.98] ${
            isProcessing || finalTotal === 0
              ? "bg-gray-300 cursor-not-allowed shadow-none"
              : paymentMethod === "momo"
              ? "bg-pink-600 hover:bg-pink-700 shadow-pink-200"
              : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Đang xử lý...
            </div>
          ) : (
            `Thanh toán ${finalTotal.toLocaleString("vi-VN")}đ`
          )}
        </button>
        <Modal
          isOpen={isQRImage}
          onClose={() => setIsQRImage(false)}
          title="QR Code"
          type="center"
        >
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 64,
              width: "100%",
            }}
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={value}
              viewBox={`0 0 256 256`}
            />
          </div>
        </Modal>

        <p className="text-center text-gray-400 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Giao dịch bảo mật SSL
        </p>
      </div>
    </div>
  );
};

export default Payment;
