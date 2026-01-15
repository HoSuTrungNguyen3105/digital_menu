import { AxiosResponse } from "axios";
import instance from "../utils/axios";
import { Permission, CreatePermissionDto, UpdatePermissionDto, ApiResponse } from "../types";

// Create permission
export const createPermission = (
    data: CreatePermissionDto
): Promise<AxiosResponse<ApiResponse<Permission>>> =>
    instance.post("/permissions", data);

// Get all permissions
export const getPermissions = (params?: any): Promise<
    AxiosResponse<ApiResponse<Permission[]>>
> => instance.get("/permissions", { params });

// Get single permission
export const getPermissionById = (
    permissionId: string
): Promise<AxiosResponse<ApiResponse<Permission>>> =>
    instance.get(`/permissions/${permissionId}`);

// Update permission
export const updatePermission = (
    permissionId: string,
    data: UpdatePermissionDto
): Promise<AxiosResponse<ApiResponse<Permission>>> =>
    instance.put(`/permissions/${permissionId}`, data);

// Delete permission
export const deletePermission = (
    permissionId: string
): Promise<AxiosResponse<ApiResponse<void>>> =>
    instance.delete(`/permissions/${permissionId}`);
