import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import {
  getMenuItemsByMenu,
  toggleMenuItem,
  searchMenuItems,
  updateMenuItem,
  deleteMenuItem,
  reorderMenuItems,
} from './menuitem.api';
import { MenuItem, CreateMenuItemDto, ApiResponse } from '../types';
import { CreateMenuItemData, UpdateMenuItemData, ReorderItemData } from "../pages/Dashboard/Menu/types/menu.types";

// Hook to get menu items by menu ID
export const useGetMenuItemsByMenu = (
  menuId: string
): UseQueryResult<MenuItem[], Error> => {
  return useQuery<AxiosResponse<ApiResponse<MenuItem[]>>, Error, MenuItem[]>({
    queryKey: ['menuItems', menuId],
    queryFn: () => getMenuItemsByMenu(menuId),
    select: (data) => data.data.data,
    enabled: !!menuId,
  });
};

// Hook to update menu item
export function useUpdateMenuItem(): UseMutationResult<
  ApiResponse<MenuItem>,
  Error,
  { id: string; data: UpdateMenuItemData }
> {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<MenuItem>, Error, { id: string; data: UpdateMenuItemData }>({
    mutationFn: ({ id, data }: { id: string; data: UpdateMenuItemData }) =>
      updateMenuItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
    },
  });
}

// Hook to delete menu item
export function useDeleteMenuItem(): UseMutationResult<
  AxiosResponse<ApiResponse<void>>,
  Error,
  string
> {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<ApiResponse<void>>, Error, string>({
    mutationFn: (id: string) => deleteMenuItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
    },
  });
}

// Hook to toggle menu item availability
export const useToggleMenuItem = (): UseMutationResult<
  AxiosResponse<ApiResponse<MenuItem>>,
  Error,
  string
> => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse<ApiResponse<MenuItem>>, Error, string>({
    mutationFn: (itemId: string) => toggleMenuItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
    },
  });
};

// Hook to search menu items
export const useSearchMenuItems = (query: string): UseQueryResult<MenuItem[], Error> => {
  return useQuery<AxiosResponse<ApiResponse<MenuItem[]>>, Error, MenuItem[]>({
    queryKey: ['searchMenuItems', query],
    queryFn: () => searchMenuItems(query),
    select: (data) => data.data.data,
    enabled: !!query && query.trim() !== "",
  });
};

// Hook to reorder menu items
export function useReorderMenuItems(): UseMutationResult<
  ApiResponse<void>,
  Error,
  { menuId: string; items: ReorderItemData[] }
> {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<void>, Error, { menuId: string; items: ReorderItemData[] }>({
    mutationFn: ({ menuId, items }: { menuId: string; items: ReorderItemData[] }) =>
      reorderMenuItems(menuId, items),
    onSuccess: (_, { menuId }) => {
      queryClient.invalidateQueries({ queryKey: ["menuItems", menuId] });
    },
  });
}
