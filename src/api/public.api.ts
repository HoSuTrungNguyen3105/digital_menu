import { AxiosResponse } from "axios";
import axios from "../utils/axios";
import { MenuItem, ApiResponse } from "../types";

/**
 * Fetches the public menu and provides autocomplete suggestions.
 * @param {string} restaurantId 
 * @returns {Promise<MenuData>} 
 */

export const getPublicMenu = (
  restaurantId: string
): Promise<AxiosResponse<ApiResponse<MenuItem[]>>> => {
  return axios.get(`/public/menu/${restaurantId}`);
};
