import axios from "../utils/axios";

/**
 * Fetches the public menu and provides autocomplete suggestions.
 * @param {string} restaurantId 
 * @returns {Promise<MenuData>} 
 */

export const getPublicMenu = (restaurantId) => {
  return axios.get(`/public/menu/${restaurantId}`);
};
