import { AxiosResponse } from "axios";
import instance from "../utils/axios";
import { MenuItem, CreateMenuItemDto, ApiResponse } from "../types";
import { CreateMenuItemData, UpdateMenuItemData, ReorderItemData } from "../pages/Dashboard/Menu/types/menu.types";

const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:5000/api";

// Get items of a menu
export const getMenuItemsByMenu = (
  menuId: string
): Promise<AxiosResponse<ApiResponse<MenuItem[]>>> =>
  instance.get(`/menu-items/menu/${menuId}`);

// Get menu items (alternative endpoint)
export const getMenuItems = async (menuId: string): Promise<MenuItem[]> => {
  const response = await instance.get(`${API_BASE_URL}/menu/${menuId}/items`);
  return response.data.data;
};

// Create menu item
export const createMenuItem = (
  menuId: string,
  data: CreateMenuItemDto | CreateMenuItemData
): Promise<AxiosResponse<ApiResponse<MenuItem>>> =>
  instance.post(`/menu-items/menu/${menuId}`, data);

// Update menu item
export const updateMenuItem = async (
  id: string,
  data: UpdateMenuItemData
): Promise<ApiResponse<MenuItem>> => {
  const response = await instance.put(`${API_BASE_URL}/menu-item/${id}`, data);
  return response.data;
};

// Delete menu item
export const deleteMenuItem = (
  itemId: string
): Promise<AxiosResponse<ApiResponse<void>>> =>
  instance.delete(`/menu-items/${itemId}`);

// Toggle menu item availability
export const toggleMenuItem = (
  itemId: string
): Promise<AxiosResponse<ApiResponse<MenuItem>>> =>
  instance.patch(`/menu-items/${itemId}/toggle`);

// Toggle menu item availability (alternative endpoint)
export const toggleMenuItemAvailability = async (
  id: string
): Promise<ApiResponse<MenuItem>> => {
  const response = await instance.patch(`${API_BASE_URL}/menu-item/${id}/toggle`);
  return response.data;
};

// Search menu items
export const searchMenuItems = async (
  query: string
): Promise<AxiosResponse<ApiResponse<MenuItem[]>>> => {
  // Validate query is not empty
  if (!query || query.trim() === "") {
    console.log("Empty search query, returning empty array");
    const emptyResponse: AxiosResponse<ApiResponse<MenuItem[]>> = {
      data: { success: true, data: [] },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    };
    return Promise.resolve(emptyResponse);
  }
  return await instance.post(`/menu/search/${encodeURIComponent(query)}`);
};

// Reorder menu items
export const reorderMenuItems = async (
  menuId: string,
  items: ReorderItemData[]
): Promise<ApiResponse<void>> => {
  const response = await instance.put(`${API_BASE_URL}/menu/${menuId}/reorder`, { items });
  return response.data;
};
