import { AxiosResponse } from "axios";
import instance from "../utils/axios";
import { Restaurant, CreateRestaurantDto, ApiResponse } from "../types";

// create restaurant
export const createRestaurant = (
  data: CreateRestaurantDto
): Promise<AxiosResponse<ApiResponse<Restaurant>>> =>
  instance.post("/restaurants/restaurant", data);

// get all restaurants
export const getRestaurants = (): Promise<
  AxiosResponse<ApiResponse<Restaurant[]>>
> => instance.get("/restaurants");

// get single restaurant
export const getRestaurantById = (
  restaurantId: string
): Promise<AxiosResponse<ApiResponse<Restaurant>>> =>
  instance.get(`/restaurants/${restaurantId}`);

// THIS WAS MISSING
export const getRestaurantQR = (
  restaurantId: string
): Promise<AxiosResponse<ApiResponse<{ qrCode: string }>>> =>
  instance.get(`/restaurants/${restaurantId}/qr`);
