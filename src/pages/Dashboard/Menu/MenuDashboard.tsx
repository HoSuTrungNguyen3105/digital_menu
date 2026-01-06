import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, Search, Filter, MoreVertical, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useGetMenuItemsByMenu, useReorderMenuItems } from "../../../api/menuItem.hooks";
import AddEditMenuModal from "./components/AddEditMenuModal";
// import FilterModal from "@/components/FilterModal";
import { MenuItem } from "./types/menu.types";

export default function MenuDashboard() {
  const { menuId } = useParams();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: items = [], isLoading, error } = useGetMenuItemsByMenu(menuId!);
  const reorderMutation = useReorderMenuItems();

  // Filter items based on search and category
  const filteredItems = items.filter((item: MenuItem) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(filteredItems);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    // Update order in backend
    reorderMutation.mutate({
      menuId: menuId!,
      items: newItems.map((item, index) => ({ id: item._id, order: index }))
    });
  };

  const categories = ["all", ...new Set(items.map((item: MenuItem) => item.category))];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Failed to load menu items</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-orange-600 hover:text-orange-700 font-medium"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm font-semibold text-gray-500 hover:text-orange-600 mb-2 block transition-colors"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-500 mt-1">
            Manage your menu items, categories, and availability
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:bg-orange-700 transition-all hover:shadow-xl flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Item
        </button>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search menu items..."
              className="w-full bg-gray-50 rounded-xl pl-12 pr-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all"
            />
          </div>
          
          <button
            onClick={() => setShowFilterModal(true)}
            className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors font-medium text-gray-700"
          >
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-orange-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category === "all" ? "All Items" : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* MENU ITEMS LIST */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery ? "Try adjusting your search terms" : "Start by adding your first menu item"}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-700 transition-colors"
              >
                Add First Item
              </button>
            )}
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="menu-items">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {filteredItems.map((item: MenuItem, index: number) => (
                    <Draggable key={item._id} draggableId={item._id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`${snapshot.isDragging ? "shadow-2xl" : ""}`}
                        >
                          {/* <MenuItemCard
                            item={item}
                            // onEdit={() => setEditingItem(item)}
                            // dragHandleProps={provided.dragHandleProps}
                            // isDragging={snapshot.isDragging}
                          /> */}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>

      {/* MODALS */}
      <AddEditMenuModal
        isOpen={showAddModal || !!editingItem}
        onClose={() => {
          setShowAddModal(false);
          setEditingItem(null);
        }}
        menuId={menuId!}
        editingItem={editingItem}
      />

      {/* <FilterModal
        show={showFilterModal}
        onApply={()=>{}}
        onClose={() => setShowFilterModal(false)}
        // categories={categories.filter(cat => cat !== "all")}
        // selectedCategory={selectedCategory}
        // onCategoryChange={setSelectedCategory}
      /> */}
    </div>
  );
}
