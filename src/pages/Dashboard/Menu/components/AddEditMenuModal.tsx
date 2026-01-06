import React, { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import Modal from "../../../../components/Modal";
import { MenuItem } from "../types/menu.types";
import { useUpdateMenuItem } from "../../../../api/menuItem.hooks";

interface AddEditMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuId: string;
  editingItem?: MenuItem | null;
}

export default function AddEditMenuModal({
  isOpen,
  onClose,
  menuId,
  editingItem
}: AddEditMenuModalProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    isAvailable: true
  });

  const createMutation = {};
  const updateMutation = useUpdateMenuItem();

  const isEditing = !!editingItem;
  const mutation = isEditing ? updateMutation : createMutation;

  useEffect(() => {
    if (editingItem) {
      setForm({
        name: editingItem.name,
        description: editingItem.description,
        price: editingItem.price.toString(),
        category: editingItem.category,
        image: editingItem.image || "",
        isAvailable: editingItem.isAvailable
      });
    } else {
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        isAvailable: true
      });
    }
  }, [editingItem, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      image: form.image,
      isAvailable: form.isAvailable
    };

    if (isEditing) {
      mutation.mutate(
        { id: editingItem._id, data },
        { onSuccess: onClose }
      );
    } else {
      mutation.mutate(
        { menuId, data },
        { onSuccess: onClose }
      );
    }
  };

  const categories = [
    { value: "veg", label: "Vegetarian" },
    { value: "non-veg", label: "Non-Vegetarian" },
    { value: "beverage", label: "Beverage" },
    { value: "dessert", label: "Dessert" },
    { value: "appetizer", label: "Appetizer" },
    { value: "main-course", label: "Main Course" }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Menu Item" : "Add New Menu Item"}
      type="center"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ERROR MESSAGE */}
        {mutation.error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm">
              {(mutation.error as any)?.response?.data?.message || 
               `Failed to ${isEditing ? 'update' : 'add'} menu item`}
            </p>
          </div>
        )}

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Item Image
          </label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              {form.image ? (
                <img 
                  src={form.image} 
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Upload className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <input
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Enter image URL"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter a valid image URL or leave empty
              </p>
            </div>
          </div>
        </div>

        {/* BASIC INFO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Item Name *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="e.g., Margherita Pizza"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price (₹) *
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="299"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category *
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Describe your delicious item..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none"
          />
        </div>

        {/* AVAILABILITY */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isAvailable"
            id="isAvailable"
            checked={form.isAvailable}
            onChange={handleChange}
            className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
          />
          <label htmlFor="isAvailable" className="text-sm font-medium text-gray-700">
            Available for ordering
          </label>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className={`flex-1 px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors ${
              mutation.isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {mutation.isPending 
              ? (isEditing ? "Updating..." : "Adding...") 
              : (isEditing ? "Update Item" : "Add Item")
            }
          </button>
        </div>
      </form>
    </Modal>
  );
}
