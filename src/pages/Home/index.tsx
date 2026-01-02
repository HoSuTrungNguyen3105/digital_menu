import React from "react";
import Button from "../../components/Button";

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-lg font-medium">Chat</div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Tiếng Việt</span>
            <div className="w-10 h-6 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
              VN
            </div>
            <i className="fas fa-chevron-down text-gray-600 ml-1"></i>
          </div>
        </div>
      </header>

      {/* Restaurant Info */}
      <section className="px-4 py-4">
        <h1 className="text-2xl font-bold">
          Mì Kung Fu - 124B Đường 2 tháng...
        </h1>
        <div className="flex items-center text-gray-600 mt-2">
          <i className="fas fa-map-marker-alt mr-2"></i>
          <span className="text-sm">
            124b Đ. 2 Tháng 9, Bình Thuận, Hải Châu, Đ...
          </span>
        </div>
      </section>

      {/* Banner */}
      <section className="px-4 mb-6">
        <div className="rounded-3xl overflow-hidden shadow-lg">
          <img
            src="https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=122221143644150262"
            alt="Mì Kung Fu Banner"
            className="w-full h-64 object-cover"
          />
        </div>
      </section>

      {/* Greeting */}
      <section className="px-4 mb-6 text-center">
        <h2 className="text-2xl font-bold text-blue-600">
          Chào buổi trưa Quý khách
        </h2>
        <p className="text-gray-700 mt-2">
          Chúng tôi sẽ trà đồ cho bạn tại bàn:
          <span className="bg-gray-800 text-white rounded-full px-4 py-1 ml-2">
            Y5
          </span>
        </p>
      </section>

      {/* Accumulate Points Card */}
      <section className="px-4 mb-8">
        <div className="bg-gradient-to-r from-blue-300 to-blue-400 rounded-3xl p-6 flex items-center shadow-md">
          <img
            src="https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3682439985236240992"
            alt="Tích điểm"
            className="w-20 h-20 object-cover rounded-xl"
          />
          <div className="ml-6 text-white">
            <Button title={"Nhập số điện thoại để tích điểm"} />
          </div>
          <i className="fas fa-chevron-right text-white text-2xl ml-auto"></i>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="px-4 mb-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 text-center shadow">
            <img
              src="https://thumbs.dreamstime.com/b/payment-goods-services-util…pping-check-receipt-invoice-order-score-paying-128416681.jpg"
              alt="Gọi thanh toán"
              className="w-16 h-16 mx-auto mb-2 object-cover rounded"
            />
            <p className="font-medium">Gọi thanh toán</p>
          </div>

          <div className="bg-white rounded-2xl p-4 text-center shadow">
            <img
              src="https://thumbs.dreamstime.com/b/restaurant-web-banner-landi…aving-lunch-hostess-helps-visitors-flat-vector-244245440.jpg"
              alt="Gọi nhân viên"
              className="w-16 h-16 mx-auto mb-2 object-cover rounded"
            />
            <p className="font-medium">Gọi nhân viên</p>
          </div>

          <div className="bg-white rounded-2xl p-4 text-center shadow">
            <img
              src="https://static.vecteezy.com/system/resources/previews/011/8…edback-rate-star-expert-opinion-and-online-survey-vector.jpg"
              alt="Đánh giá"
              className="w-16 h-16 mx-auto mb-2 object-cover rounded"
            />
            <p className="font-medium">Đánh giá</p>
          </div>
        </div>
      </section>

      {/* View Menu Button */}
      <section className="px-4 mb-10">
        <div className="bg-gradient-to-r from-orange-400 to-yellow-400 rounded-3xl p-6 shadow-lg flex items-center justify-between">
          <div className="text-white">
            <h3 className="text-2xl font-bold">Xem Menu - Gọi món</h3>
          </div>
          <div className="relative">
            <img
              src="https://cdn.prod.website-files.com/5f46c318c843828732a6f8e2…370fd47b456ec79285_digital-menu-board-free-templates-th.webp"
              alt="Menu"
              className="w-32 h-32 object-cover rounded-2xl"
            />
            <div className="absolute bottom-2 right-2 bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
              <i className="fas fa-play text-lg"></i>
            </div>
          </div>
          <i className="fas fa-chevron-right text-white text-2xl"></i>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
