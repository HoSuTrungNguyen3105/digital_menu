import React from "react";
import { TrendingUp, TrendingDown, Eye, EyeOff } from "lucide-react";
import { MenuItem } from "../types/menu.types";

interface MenuStatsProps {
  items: MenuItem[];
}

export default function MenuStats({ items }: MenuStatsProps) {
  const totalItems = items.length;
  const availableItems = items.filter(item => item.isAvailable).length;
  const unavailableItems = totalItems - availableItems;
  const averagePrice = items.length > 0 
    ? items.reduce((sum, item) => sum + item.price, 0) / items.length 
    : 0;

  const categories = [...new Set(items.map(item => item.category))];

  const stats = [
    {
      label: "Total Items",
      value: totalItems,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Available",
      value: availableItems,
      icon: Eye,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Unavailable",
      value: unavailableItems,
      icon: EyeOff,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      label: "Avg. Price",
      value: `₹${averagePrice.toFixed(0)}`,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Menu Overview</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-2`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {categories.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const categoryCount = items.filter(item => item.category === category).length;
              return (
                <span
                  key={category}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)} ({categoryCount})
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
