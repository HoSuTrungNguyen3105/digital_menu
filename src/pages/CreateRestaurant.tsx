import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, MapPin, Phone, Mail, Globe, Clock, Users, UtensilsCrossed, Loader2 } from "lucide-react";
import { createRestaurant } from "../api/restaurant.api";

interface FormData {
  name: string;
  description: string;
  address: string;
  contactNumber: string;
  email: string;
  website: string;
  cuisineType: string;
  openingHours: string;
  capacity: string;
}

export default function CreateRestaurant() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    address: "",
    contactNumber: "",
    email: "",
    website: "",
    cuisineType: "",
    openingHours: "",
    capacity: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.address || !formData.contactNumber) {
      setError("Name, address, and contact number are required");
      return;
    }

    try {
      setLoading(true);

      await createRestaurant({
        name: formData.name.trim(),
        description: formData.description.trim(),
        location: formData.address.trim(),
      });

      navigate("/dashboard");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      console.error(err);
      setError(error?.response?.data?.message || "Failed to create restaurant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-6 shadow-lg shadow-orange-500/20">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Create Your Restaurant
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Set up your restaurant profile to start serving customers with our digital menu system
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Error Message */}
          {error && (
            <div className="mx-6 mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-red-500 font-bold">!</span>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          <div className="p-8 md:p-12">
            {/* Basic Information Section */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
              </div>

              <div className="space-y-6">
                {/* Restaurant Name */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <Building2 className="w-4 h-4 text-orange-600" />
                    Restaurant Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Tasty Bites Restaurant"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all bg-gray-50 hover:bg-white"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <UtensilsCrossed className="w-4 h-4 text-orange-600" />
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Tell customers about your restaurant, specialties, and what makes you unique..."
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all resize-none bg-gray-50 hover:bg-white"
                  />
                </div>

                {/* Cuisine Type & Capacity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                      <UtensilsCrossed className="w-4 h-4 text-orange-600" />
                      Cuisine Type
                    </label>
                    <select
                      name="cuisineType"
                      value={formData.cuisineType}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all bg-gray-50 hover:bg-white"
                    >
                      <option value="">Select cuisine type</option>
                      <option value="Vietnamese">Vietnamese</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Italian">Italian</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Korean">Korean</option>
                      <option value="Thai">Thai</option>
                      <option value="American">American</option>
                      <option value="Mexican">Mexican</option>
                      <option value="Indian">Indian</option>
                      <option value="French">French</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                      <Users className="w-4 h-4 text-orange-600" />
                      Seating Capacity
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      placeholder="e.g. 50"
                      value={formData.capacity}
                      onChange={handleChange}
                      min="1"
                      className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all bg-gray-50 hover:bg-white"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Location & Contact Section */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900">Location & Contact</h2>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="e.g. 123 Main Street, District 1, Ho Chi Minh City"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all bg-gray-50 hover:bg-white"
                  />
                </div>

                {/* Contact Number & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 text-orange-600" />
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      placeholder="e.g. +84 123 456 789"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      required
                      className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all bg-gray-50 hover:bg-white"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                      <Mail className="w-4 h-4 text-orange-600" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. contact@restaurant.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all bg-gray-50 hover:bg-white"
                    />
                  </div>
                </div>

                {/* Website & Opening Hours */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                      <Globe className="w-4 h-4 text-orange-600" />
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      placeholder="e.g. https://www.restaurant.com"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all bg-gray-50 hover:bg-white"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      Opening Hours
                    </label>
                    <input
                      type="text"
                      name="openingHours"
                      placeholder="e.g. 9:00 AM - 10:00 PM"
                      value={formData.openingHours}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all bg-gray-50 hover:bg-white"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl py-5 px-8 font-bold text-lg shadow-xl shadow-orange-500/25 hover:shadow-2xl hover:shadow-orange-500/30 hover:scale-[1.01] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Creating Restaurant...</span>
                  </>
                ) : (
                  <>
                    <Building2 className="w-5 h-5" />
                    <span>Create Restaurant</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
