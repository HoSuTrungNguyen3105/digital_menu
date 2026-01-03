import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import {
    getMenuItemsByMenu,
    createMenuItem,
    deleteMenuItem,
    toggleMenuItem,
    searchMenuItems
} from './menuitem.api';
import { MenuItem, CreateMenuItemDto, ApiResponse } from '../types';

export const useGetMenuItems = (menuId: string): UseQueryResult<MenuItem[], Error> => {
    return useQuery<AxiosResponse<ApiResponse<MenuItem[]>>, Error, MenuItem[]>({
        queryKey: ['menuItems', menuId],
        queryFn: () => getMenuItemsByMenu(menuId),
        select: (data) => data.data.data,
        enabled: !!menuId,
    });
};

interface CreateMenuItemVariables {
    menuId: string;
    data: CreateMenuItemDto;
}

export const useCreateMenuItem = (): UseMutationResult<
    AxiosResponse<ApiResponse<MenuItem>>,
    Error,
    CreateMenuItemVariables
> => {
    const queryClient = useQueryClient();
    return useMutation<
        AxiosResponse<ApiResponse<MenuItem>>,
        Error,
        CreateMenuItemVariables
    >({
        mutationFn: ({ menuId, data }) => createMenuItem(menuId, data),
        onSuccess: (_, { menuId }) => {
            queryClient.invalidateQueries({ queryKey: ['menuItems', menuId] });
        },
    });
};

export const useDeleteMenuItem = (): UseMutationResult<
    AxiosResponse<ApiResponse<void>>,
    Error,
    string
> => {
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse<ApiResponse<void>>, Error, string>({
        mutationFn: (itemId) => deleteMenuItem(itemId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuItems'] });
        },
    });
};

export const useToggleMenuItem = (): UseMutationResult<
    AxiosResponse<ApiResponse<MenuItem>>,
    Error,
    string
> => {
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse<ApiResponse<MenuItem>>, Error, string>({
        mutationFn: (itemId) => toggleMenuItem(itemId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuItems'] });
        },
    });
};

export const useSearchMenuItems = (query: string): UseQueryResult<MenuItem[], Error> => {
    return useQuery<MenuItem[] | AxiosResponse<ApiResponse<MenuItem[]>>, Error, MenuItem[]>({
        queryKey: ['searchMenuItems', query],
        queryFn: async () => {
            const res = await searchMenuItems(query);
            return Array.isArray(res) ? res : res.data.data;
        },
        enabled: !!query && query.trim() !== "",
    });
};
