import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCreateMenuItem } from "../../api/menuItem.hooks";

export default function AddMenuItem() {
  const { menuId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const createMutation = useCreateMenuItem();

  const handleChange = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    createMutation.mutate(
      {
        menuId: menuId!,
        data: {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          category: form.category,
        },
      },
      {
        onSuccess: () => {
          navigate(`/menu/${menuId}/items`);
        },
      }
    );
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Menu Item</h1>

      {createMutation.error && (
        <p className="mb-4 text-red-500">
          {(createMutation.error as any)?.response?.data?.message || "Failed to add menu item"}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Item name"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          value={form.price}
          placeholder="Price"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          value={form.category}
          placeholder="Category (veg / non-veg)"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={createMutation.isPending}
          className={`bg-black text-white px-4 py-2 rounded w-full ${createMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {createMutation.isPending ? "Adding..." : "Add Item"}
        </button>
      </form>
    </div>
  );
}
