import { AxiosResponse } from "axios";
import instance from "../utils/axios";
import { MenuItem, CreateMenuItemDto, ApiResponse } from "../types";

// get items of a menu
export const getMenuItemsByMenu = (
  menuId: string
): Promise<AxiosResponse<ApiResponse<MenuItem[]>>> =>
  instance.get(`/menu-items/menu/${menuId}`);

// CREATE ITEM — FIXED
export const createMenuItem = (
  menuId: string,
  data: CreateMenuItemDto
): Promise<AxiosResponse<ApiResponse<MenuItem>>> =>
  instance.post(`/menu-items/menu/${menuId}`, data);

// delete item
export const deleteMenuItem = (
  itemId: string
): Promise<AxiosResponse<ApiResponse<void>>> =>
  instance.delete(`/menu-items/${itemId}`);

// toggle availability
export const toggleMenuItem = (
  itemId: string
): Promise<AxiosResponse<ApiResponse<MenuItem>>> =>
  instance.patch(`/menu-items/${itemId}/toggle`);

export const searchMenuItems = async (
  query: string
): Promise<MenuItem[] | AxiosResponse<ApiResponse<MenuItem[]>>> => {
  // Validate query is not empty
  if (!query || query.trim() === "") {
    console.log("Empty search query, returning empty array");
    return [];
  }
  return await instance.post(`/menu/search/${encodeURIComponent(query)}`);
};
