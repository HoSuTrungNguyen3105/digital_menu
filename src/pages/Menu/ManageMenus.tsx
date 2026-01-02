import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMenu } from "../../api/menu.api";

export default function ManageMenuItems() {
  const { menuId } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await getMenu(menuId);
        setItems(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load menu items");
      } finally {
        setLoading(false);
      }
    }

    if (menuId) {
      fetchItems();
    }
  }, [menuId]);

  if (loading) return <p className="p-6">Loading items...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm font-semibold text-gray-500 hover:text-orange-600 mb-2 block"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Menu Items
          </h1>
        </div>

        <button
          onClick={() => navigate(`/menu/${menuId}/items/add`)}
          className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:bg-orange-700 transition-colors"
        >
          + Add New Item
        </button>
      </div>

      {/* CONTENT */}
      {items.length === 0 ? (
        <p className="text-gray-500">No items added yet.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-100 rounded-2xl p-5 flex justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-lg text-gray-900 capitalize">
                    {item.name}
                  </h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      item.isAvailable
                        ? "bg-green-50 text-green-700 border-green-100"
                        : "bg-red-50 text-red-700 border-red-100"
                    }`}
                  >
                    {item.isAvailable ? "AVAILABLE" : "UNAVAILABLE"}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2 max-w-md">
                  {item.description}
                </p>
                <div className="flex items-center gap-4 text-sm font-medium">
                  <span className="text-orange-600">₹ {item.price}</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-400">
                    Category: {item.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="text-sm font-semibold text-gray-400 hover:text-orange-600 px-3 py-1">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
