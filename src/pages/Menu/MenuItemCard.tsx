import { motion } from "framer-motion";
import { Bike, Flame, ShoppingBag, Star } from "lucide-react";

interface MenuItemCardProps {
  item: {
    _id?: string;
    id?: string | number;
    name: string;
    description?: string;
    price: number;
    image?: string;
    rating?: number | string;
    reviews?: number;
    minOrder?: string;
    isFlashDeal?: boolean;
    originalPrice?: number;
    discount?: string | null;
  };
}

function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="relative">
        <div className="aspect-[2/1] bg-gray-100 overflow-hidden">
            <img
            src={item.image || "https://via.placeholder.com/400"}
            alt={item.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {item.isFlashDeal && (
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-3 h-3 fill-white" /> Flash Deal
            </span>
          </div>
        )}

        <button className="absolute bottom-3 right-3 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors">
          <ShoppingBag className="w-5 h-5" />
        </button>

        {item.rating && (
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-bold">{item.rating}</span>
            {item.reviews && (
              <span className="text-[10px] text-gray-300">({item.reviews})</span>
            )}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2 flex-1 mr-2">
            {item.name}
          </h3>
          <span className="text-xs font-medium text-gray-400 whitespace-nowrap bg-gray-50 px-2 py-1 rounded">
            {item.minOrder}
          </span>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2 mb-3 leading-relaxed">
          {item.description}
        </p>

        <div className="flex items-center gap-4 border-t border-gray-50 pt-3 mt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-orange-600 font-black text-lg">
              {item.price.toLocaleString("vi-VN")}₫
            </span>
            {item.discount && (
              <span className="text-gray-400 text-sm line-through decoration-gray-300">
                {item.originalPrice.toLocaleString("vi-VN")}₫
              </span>
            )}
          </div>

          {item.discount && (
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100">
              {item.discount}
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center gap-3 text-xs text-gray-400 font-medium">
          <div className="flex items-center gap-1">
            <Bike className="w-3.5 h-3.5" /> 15-25 min
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full" />
          <div className="flex items-center gap-1">
            <ShoppingBag className="w-3.5 h-3.5" /> Free Ship
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default MenuItemCard;
