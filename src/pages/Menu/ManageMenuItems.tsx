import { useParams, useNavigate } from "react-router-dom";
import {
  useGetMenuItems,
  useDeleteMenuItem,
  useToggleMenuItem,
} from "../../api/menuItem.hooks";

export default function ManageMenuItems() {
  const { menuId } = useParams();
  const navigate = useNavigate();

  const { data: items = [], isLoading, error } = useGetMenuItems(menuId!);
  const deleteMutation = useDeleteMenuItem();
  const toggleMutation = useToggleMenuItem();


  const handleToggle = async (itemId: string) => {
    toggleMutation.mutate(itemId);
  };

  const handleDelete = async (itemId: string) => {
    if (!window.confirm("Delete this item?")) return;
    deleteMutation.mutate(itemId);
  };

  if (isLoading) return <p className="p-6">Loading items...</p>;
  if (error) return <p className="p-6 text-red-500">Failed to load menu items</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Menu Items</h1>

        <button
          onClick={() => navigate(`/menu/${menuId}/items/add`)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Item
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500">No items added yet.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item: any) => (
            <div
              key={item._id}
              className="border rounded p-4 flex justify-between"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="mt-1 font-medium">₹ {item.price}</p>
                <p className="text-xs text-gray-400">
                  Category: {item.category}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleToggle(item._id)}
                  disabled={toggleMutation.isPending}
                  className={`px-3 py-1 border rounded ${item.isAvailable
                      ? "text-green-600 border-green-600"
                      : "text-red-600 border-red-600"
                    } ${toggleMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {toggleMutation.isPending ? "Updating..." : (item.isAvailable ? "Available" : "Unavailable")}
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={deleteMutation.isPending}
                  className={`px-3 py-1 border rounded text-red-600 border-red-600 ${deleteMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
