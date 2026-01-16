/**
 * Mock Implementation of Permission API
 * Use this for development/testing without a backend
 */

import { AxiosResponse } from "axios";
import { Permission, CreatePermissionDto, UpdatePermissionDto, ApiResponse } from "../types";
import { mockPermissions, searchPermissions } from "../utils/mockPermissions";

// Simulated delay to mimic network request
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

let permissionsStore = [...mockPermissions];

/**
 * Create a new permission (Mock)
 */
export const createPermissionMock = async (
    data: CreatePermissionDto
): Promise<AxiosResponse<ApiResponse<Permission>>> => {
    await delay();
    
    const newPermission: Permission = {
        id: `perm_${Date.now()}`,
        key: data.key,
        category: data.category,
        action: data.action,
        description: data.description,
        isActive: data.isActive,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    permissionsStore.push(newPermission);
    
    return {
        data: {
            code: 201,
            data: newPermission,
            message: "Permission created successfully"
        },
        status: 201,
        statusText: "Created",
        headers: {},
        config: {} as any
    };
};

/**
 * Get all permissions with optional filtering (Mock)
 */
export const getPermissionsMock = async (params?: any): Promise<
    AxiosResponse<ApiResponse<Permission[]>>
> => {
    await delay(300);
    
    let filteredPermissions = [...permissionsStore];
    
    // Apply keyword search
    if (params?.keyword) {
        filteredPermissions = searchPermissions(params.keyword);
    }
    
    // Apply category filter
    if (params?.category) {
        filteredPermissions = filteredPermissions.filter(
            p => p.category === params.category
        );
    }
    
    // Apply status filter
    if (params?.isActive !== undefined) {
        filteredPermissions = filteredPermissions.filter(
            p => p.isActive === params.isActive
        );
    }
    
    // Pagination
    const page = params?.current_page || 1;
    const perPage = params?.per_page || 10;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedData = filteredPermissions.slice(startIndex, endIndex);
    
    return {
        data: {
            code: 200,
            data: perPage >= 100 ? filteredPermissions : paginatedData, // Return all if per_page is high
            message: "Permissions retrieved successfully",
            pagination: {
                current_page: page,
                per_page: perPage,
                total: filteredPermissions.length,
                total_pages: Math.ceil(filteredPermissions.length / perPage),
                keyword: params?.keyword || "",
                sort_by: params?.sort_by || "createdAt",
                sort_dir: params?.sort_dir || "DESC"
            }
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any
    };
};

/**
 * Get single permission by ID (Mock)
 */
export const getPermissionByIdMock = async (
    permissionId: string
): Promise<AxiosResponse<ApiResponse<Permission>>> => {
    await delay(200);
    
    const permission = permissionsStore.find(p => p.id === permissionId);
    
    if (!permission) {
        throw new Error("Permission not found");
    }
    
    return {
        data: {
            code: 200,
            data: permission,
            message: "Permission retrieved successfully"
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any
    };
};

/**
 * Update permission (Mock)
 */
export const updatePermissionMock = async (
    permissionId: string,
    data: UpdatePermissionDto
): Promise<AxiosResponse<ApiResponse<Permission>>> => {
    await delay(400);
    
    const index = permissionsStore.findIndex(p => p.id === permissionId);
    
    if (index === -1) {
        throw new Error("Permission not found");
    }
    
    const updatedPermission: Permission = {
        ...permissionsStore[index],
        ...data,
        updatedAt: new Date().toISOString()
    };
    
    permissionsStore[index] = updatedPermission;
    
    return {
        data: {
            code: 200,
            data: updatedPermission,
            message: "Permission updated successfully"
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any
    };
};

/**
 * Delete permission (Mock)
 */
export const deletePermissionMock = async (
    permissionId: string
): Promise<AxiosResponse<ApiResponse<void>>> => {
    await delay(300);
    
    const index = permissionsStore.findIndex(p => p.id === permissionId);
    
    if (index === -1) {
        throw new Error("Permission not found");
    }
    
    permissionsStore.splice(index, 1);
    
    return {
        data: {
            code: 200,
            data: undefined as any,
            message: "Permission deleted successfully"
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any
    };
};

/**
 * Reset permissions to original mock data
 */
export const resetPermissionsMock = () => {
    permissionsStore = [...mockPermissions];
};

/**
 * Get statistics about permissions
 */
export const getPermissionStatsMock = async () => {
    await delay(200);
    
    const stats = {
        total: permissionsStore.length,
        active: permissionsStore.filter(p => p.isActive).length,
        inactive: permissionsStore.filter(p => !p.isActive).length,
        byCategory: permissionsStore.reduce((acc, perm) => {
            acc[perm.category] = (acc[perm.category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>),
        byAction: permissionsStore.reduce((acc, perm) => {
            acc[perm.action] = (acc[perm.action] || 0) + 1;
            return acc;
        }, {} as Record<string, number>)
    };
    
    return {
        data: {
            code: 200,
            data: stats,
            message: "Statistics retrieved successfully"
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any
    };
};
