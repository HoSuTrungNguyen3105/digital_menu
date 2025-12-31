import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRestaurant } from "../api/restaurant.api";

export default function CreateRestaurant() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !address || !contactNumber) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await createRestaurant({
        name: name.trim(),
        address: address.trim(),
        contactNumber: contactNumber.trim(),
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to create restaurant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-sm font-semibold text-gray-500 hover:text-orange-600 transition-colors"
        >
          ← Back
        </button>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl shadow-xl shadow-orange-500/5 border border-orange-100"
        >
          <div className="text-center mb-8">
            <span className="text-4xl">🏪</span>
            <h2 className="text-2xl font-bold mt-4 text-gray-900">
              Create New Restaurant
            </h2>
            <p className="text-gray-500 text-sm">
              Set up your location to start served
            </p>
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-xl border border-red-100">
              {error}
            </p>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Restaurant Name
              </label>
              <input
                type="text"
                placeholder="e.g. Tasty Bites"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Address
              </label>
              <input
                type="text"
                placeholder="e.g. 123 Main St, New York"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 ml-1">
                Contact Number
              </label>
              <input
                type="text"
                placeholder="e.g. +1 234 567 890"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl py-3.5 font-bold shadow-lg shadow-orange-500/25 hover:scale-[1.02] transition-all disabled:opacity-70"
          >
            {loading ? "Creating..." : "Create Restaurant"}
          </button>
        </form>
      </div>
    </div>
  );
}
