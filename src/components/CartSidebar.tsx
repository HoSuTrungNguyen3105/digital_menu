import { useRef, useEffect } from "react";
import { FaTimes, FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart, CartItem } from "../context/CartContext";

export default function CartSidebar() {
  const {
    isSidebarOpen,
    toggleSidebar,
    cartItems,
    updateQuantity,
    cartTotal,
  } = useCart();

  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isSidebarOpen
      ) {
        toggleSidebar();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen, toggleSidebar]);

  const tax = cartTotal * 0.1; // 10% tax
  const total = cartTotal + tax;

  return (
    <div
      className={`fixed inset-0 z-50 transform ease-in-out transition-all duration-300 ${
        isSidebarOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none delay-300"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-gray-900 bg-opacity-50 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Sidebar Panel */}
      <div
        ref={sidebarRef}
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full font-dmsans">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-teal-50">
            <h2 className="text-2xl font-bold font-playfair text-gray-800">
              Your Order
            </h2>
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-500 hover:text-red-500 transition-colors rounded-full hover:bg-white"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <svg
                  className="w-20 h-20 mb-4 opacity-20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <p className="text-lg font-medium">Your cart is empty</p>
                <button
                  onClick={toggleSidebar}
                  className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-full font-medium hover:bg-teal-700 transition-colors"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              cartItems.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-teal-600 font-bold">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                      >
                        {item.quantity === 1 ? (
                          <FaTrash size={12} className="text-red-500" />
                        ) : (
                          <FaMinus size={10} />
                        )}
                      </button>
                      <span className="font-bold w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Calculations */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-4">
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-800">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span className="font-bold text-gray-800">
                    ${tax.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-bold border-t border-gray-200 pt-4 text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                onClick={() => navigate(`/Payment`)}
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
