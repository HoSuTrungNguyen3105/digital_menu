import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { getRestaurants, getRestaurantById } from './restaurant.api';
import { Restaurant, ApiResponse } from '../types';

export const useGetRestaurants = (): UseQueryResult<Restaurant[], Error> => {
    return useQuery<AxiosResponse<ApiResponse<Restaurant[]>>, Error, Restaurant[]>({
        queryKey: ['restaurants'],
        queryFn: () => getRestaurants(),
        select: (data) => data.data.data,
    });
};

export const useGetRestaurantById = (restaurantId: string): UseQueryResult<Restaurant, Error> => {
    return useQuery<AxiosResponse<ApiResponse<Restaurant>>, Error, Restaurant>({
        queryKey: ['restaurant', restaurantId],
        queryFn: () => getRestaurantById(restaurantId),
        select: (data) => data.data.data,
        enabled: !!restaurantId,
    });
};
