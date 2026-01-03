import { useNavigate } from "react-router-dom";
import { logoutOwner } from "../../api/auth.api";
import { useGetMe } from "../../api/auth.hooks";
import { useGetRestaurants } from "../../api/restaurant.hooks";
import RestaurantCard from "../../components/RestaurantCard";

export default function Dashboard() {
  const navigate = useNavigate();

  // Use React Query hooks instead of manual fetching
  const { data: owner, isLoading: ownerLoading, error: ownerError } = useGetMe();
  const { data: restaurants = [], isLoading: restaurantsLoading, error: restaurantsError } = useGetRestaurants();

  const loading = ownerLoading || restaurantsLoading;
  const error = ownerError || restaurantsError;

  const handleLogout = async () => {
    try {
      await logoutOwner();
    } finally {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load dashboard</p>
          <button 
            onClick={() => navigate("/login")} 
            className="underline text-blue-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, <span className="text-orange-600">{owner?.name}</span>
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your restaurants & QR menus
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/create-restaurant")}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform"
          >
            + Create Restaurant
          </button>

          <button
            onClick={handleLogout}
            className="border border-gray-200 px-6 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto">
        {restaurants.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🍽️</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              No restaurants yet
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Get started by creating your first restaurant profile to generate
              QR menus.
            </p>
            <button
              onClick={() => navigate("/create-restaurant")}
              className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
            >
              Create First Restaurant
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((r) => (
              <RestaurantCard key={r._id} restaurant={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
