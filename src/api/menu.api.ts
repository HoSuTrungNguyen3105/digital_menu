import { AxiosResponse } from "axios";
import instance from "../utils/axios";
import { Menu, CreateMenuDto, MenuItem, ApiResponse } from "../types";

export const createMenu = (
  restaurantId: string,
  data: CreateMenuDto
): Promise<AxiosResponse<ApiResponse<Menu>>> =>
  instance.post(`/menus/${restaurantId}`, data);

export const getMenus = (
  restaurantId: string
): Promise<AxiosResponse<ApiResponse<Menu[]>>> =>
  instance.get(`/menus/restaurants/${restaurantId}`);

export const getMenu = (
  menuId: string
): Promise<AxiosResponse<ApiResponse<MenuItem[]>>> =>
  instance.get(`/menu-items/menu/${menuId}`);
