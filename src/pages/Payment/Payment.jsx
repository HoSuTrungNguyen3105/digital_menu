import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import MomoImg from "../../img/MOMO-Logo-App.png";

const Payment = () => {
  const { total } = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [paymentForm, setPaymentForm] = useState("cash");

  const [isProcessing, setIsProcessing] = useState(false);
  const [isMethodForm, setIsMethodForm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Mock payment handler
  const handlePayment = () => {
    setIsProcessing(true);
    navigate("success");
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleTransformPaymentForm = useCallback(() => {
    setIsMethodForm(true);
    setPaymentForm((e) => !e);
    setTimeout(() => {
      setIsMethodForm(false);
    }, 2000);
  }, []);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full animate-fade-in-up">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-teal-600 mb-6 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to Order
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-teal-600 px-8 py-6">
            <h1 className="text-2xl font-bold text-white">Secure Checkout</h1>
            <p className="text-teal-100 mt-1">
              Complete your payment to place order
            </p>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-gray-800 font-bold text-xl mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                <span className="text-gray-600">Total Amount</span>
                <span className="text-3xl font-bold text-teal-600">
                  ${total}
                </span>
              </div>
            </div>
            <button
              onClick={handleTransformPaymentForm}
              disabled={isMethodForm}
              className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all ${
                isMethodForm
                  ? "bg-gray-400 cursor-not-allowed"
                  : paymentMethod === "momo"
                  ? "bg-pink-600 hover:bg-pink-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isMethodForm
                ? "Processing..."
                : `Pay with ${paymentMethod === "momo" ? "MoMo" : "VNPay"}`}
            </button>

            {paymentForm !== "cash" && (
              <div className="mb-8">
                <h2 className="text-gray-800 font-bold text-xl mb-4">
                  Select Payment Method
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* MoMo Option */}
                  <div
                    onClick={() => setPaymentMethod("momo")}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                      paymentMethod === "momo"
                        ? "border-pink-500 bg-pink-50 shadow-md"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={MomoImg}
                        alt="MoMo"
                        className="w-10 h-10 object-contain rounded"
                      />
                      <span className="font-bold text-gray-700">
                        MoMo Wallet
                      </span>
                    </div>
                    {paymentMethod === "momo" && (
                      <div className="w-4 h-4 rounded-full bg-pink-500"></div>
                    )}
                  </div>

                  {/* VNPay Option */}
                  <div
                    onClick={() => setPaymentMethod("vnpay")}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                      paymentMethod === "vnpay"
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src="https://vnpay.vn/assets/images/logo-icon/logo-primary.svg"
                        alt="VNPay"
                        className="w-10 h-10 object-contain"
                      />
                      <span className="font-bold text-gray-700">VNPay QR</span>
                    </div>
                    {paymentMethod === "vnpay" && (
                      <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all ${
                isProcessing
                  ? "bg-gray-400 cursor-not-allowed"
                  : paymentMethod === "momo"
                  ? "bg-pink-600 hover:bg-pink-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isProcessing
                ? "Processing..."
                : `Pay with ${paymentMethod === "momo" ? "MoMo" : "VNPay"}`}
            </button>

            <p className="text-center text-gray-400 text-sm mt-4 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Secure SSL Encrypted Transaction
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
