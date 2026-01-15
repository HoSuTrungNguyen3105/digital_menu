import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { getPermissions, getPermissionById, createPermission, updatePermission, deletePermission } from './permission.api';
import { Permission, CreatePermissionDto, UpdatePermissionDto, ApiResponse } from '../types';

// Get all permissions
export const useGetPermissions = (params?: any): UseQueryResult<ApiResponse<Permission[]>, Error> => {
    return useQuery<AxiosResponse<ApiResponse<Permission[]>>, Error, ApiResponse<Permission[]>>({
        queryKey: ['permissions', params],
        queryFn: () => getPermissions(params),
        select: (data) => data.data,
    });
};

// Get single permission
export const useGetPermissionById = (permissionId: string): UseQueryResult<Permission, Error> => {
    return useQuery<AxiosResponse<ApiResponse<Permission>>, Error, Permission>({
        queryKey: ['permission', permissionId],
        queryFn: () => getPermissionById(permissionId),
        select: (data) => data.data.data,
        enabled: !!permissionId,
    });
};

// Create permission mutation
export const useCreatePermission = (): UseMutationResult<
    AxiosResponse<ApiResponse<Permission>>,
    Error,
    CreatePermissionDto
> => {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse<ApiResponse<Permission>>, Error, CreatePermissionDto>({
        mutationFn: (data: CreatePermissionDto) => createPermission(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['permissions'] });
        },
    });
};

// Update permission mutation
export const useUpdatePermission = (): UseMutationResult<
    AxiosResponse<ApiResponse<Permission>>,
    Error,
    { permissionId: string; data: UpdatePermissionDto }
> => {
    const queryClient = useQueryClient();

    return useMutation<
        AxiosResponse<ApiResponse<Permission>>,
        Error,
        { permissionId: string; data: UpdatePermissionDto }
    >({
        mutationFn: ({ permissionId, data }) => updatePermission(permissionId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['permissions'] });
        },
    });
};

// Delete permission mutation
export const useDeletePermission = (): UseMutationResult<
    AxiosResponse<ApiResponse<void>>,
    Error,
    string
> => {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse<ApiResponse<void>>, Error, string>({
        mutationFn: (permissionId: string) => deletePermission(permissionId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['permissions'] });
        },
    });
};
