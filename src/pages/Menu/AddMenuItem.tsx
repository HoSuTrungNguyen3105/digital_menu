import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createMenuItem } from "@/api/menuitem.api";

type CreateMenuItemPayload = {
  menuId: string;
  data: {
    name: string;
    description: string;
    price: number;
    category: string;
  };
};

export default function AddMenuItem() {
  const { menuId } = useParams<{ menuId: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const createMutation = useMutation({
    mutationFn: ({ menuId, data }: CreateMenuItemPayload) =>
      createMenuItem(menuId, data),
    onSuccess: () => {
      navigate(`/menu/${menuId}/items`);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuId) return;

    createMutation.mutate({
      menuId,
      data: {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Menu Item</h1>

      {createMutation.isError && (
        <p className="mb-4 text-red-500">
          {(createMutation.error as any)?.response?.data?.message ||
            "Failed to add menu item"}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Item name"
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category (veg / non-veg)"
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={createMutation.isPending}
          className={`w-full bg-black text-white px-4 py-2 rounded ${
            createMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {createMutation.isPending ? "Adding..." : "Add Item"}
        </button>
      </form>
    </div>
  );
}
