import instance from "../utils/axios";

export const createMenu = (restaurantId, data) =>
  instance.post(`/menus/${restaurantId}`, data);

export const getMenus = (restaurantId) =>
  instance.get(`/menus/restaurants/${restaurantId}`);

export const getMenu = (menuId) =>
  instance.get(`/menu-items/menu/${menuId}`)
