import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { getMenus, getMenu } from './menu.api';
import { Menu, MenuItem, ApiResponse } from '../types';

export const useGetMenus = (restaurantId: string): UseQueryResult<Menu[], Error> => {
    return useQuery<AxiosResponse<ApiResponse<Menu[]>>, Error, Menu[]>({
        queryKey: ['menus', restaurantId],
        queryFn: () => getMenus(restaurantId),
        select: (data) => data.data.data,
        enabled: !!restaurantId,
    });
};

export const useGetMenu = (menuId: string): UseQueryResult<MenuItem[], Error> => {
    return useQuery<AxiosResponse<ApiResponse<MenuItem[]>>, Error, MenuItem[]>({
        queryKey: ['menu', menuId],
        queryFn: () => getMenu(menuId),
        select: (data) => data.data.data,
        enabled: !!menuId,
    });
};
