/**
 * Permission API Configuration
 * Easy toggle between mock and real API
 */

import { AxiosResponse } from "axios";
import { Permission, CreatePermissionDto, UpdatePermissionDto, ApiResponse } from "../types";

// Real API imports
import * as realAPI from "./permission.api";

// Mock API imports
import * as mockAPI from "./permission.api.mock";

/**
 * Configuration flag to enable/disable mock data
 * Set to true to use mock data, false to use real API
 */
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_PERMISSIONS === 'true' || false;

/**
 * Logged info about current mode
 */
if (USE_MOCK_DATA) {
    console.log('🎭 Permission API: Using MOCK data');
} else {
    console.log('🌐 Permission API: Using REAL API');
}

/**
 * Create permission - Auto-switches between mock and real
 */
export const createPermission = (
    data: CreatePermissionDto
): Promise<AxiosResponse<ApiResponse<Permission>>> => {
    return USE_MOCK_DATA 
        ? mockAPI.createPermissionMock(data)
        : realAPI.createPermission(data);
};

/**
 * Get all permissions - Auto-switches between mock and real
 */
export const getPermissions = (params?: any): Promise<
    AxiosResponse<ApiResponse<Permission[]>>
> => {
    return USE_MOCK_DATA
        ? mockAPI.getPermissionsMock(params)
        : realAPI.getPermissions(params);
};

/**
 * Get single permission - Auto-switches between mock and real
 */
export const getPermissionById = (
    permissionId: string
): Promise<AxiosResponse<ApiResponse<Permission>>> => {
    return USE_MOCK_DATA
        ? mockAPI.getPermissionByIdMock(permissionId)
        : realAPI.getPermissionById(permissionId);
};

/**
 * Update permission - Auto-switches between mock and real
 */
export const updatePermission = (
    permissionId: string,
    data: UpdatePermissionDto
): Promise<AxiosResponse<ApiResponse<Permission>>> => {
    return USE_MOCK_DATA
        ? mockAPI.updatePermissionMock(permissionId, data)
        : realAPI.updatePermission(permissionId, data);
};

/**
 * Delete permission - Auto-switches between mock and real
 */
export const deletePermission = (
    permissionId: string
): Promise<AxiosResponse<ApiResponse<void>>> => {
    return USE_MOCK_DATA
        ? mockAPI.deletePermissionMock(permissionId)
        : realAPI.deletePermission(permissionId);
};

/**
 * Get permission statistics (mock only feature)
 */
export const getPermissionStats = () => {
    if (!USE_MOCK_DATA) {
        console.warn('getPermissionStats is only available in mock mode');
        return Promise.reject(new Error('Statistics endpoint not implemented'));
    }
    return mockAPI.getPermissionStatsMock();
};

/**
 * Reset mock data (mock only feature)
 */
export const resetMockData = () => {
    if (!USE_MOCK_DATA) {
        console.warn('resetMockData is only available in mock mode');
        return;
    }
    mockAPI.resetPermissionsMock();
};

/**
 * Check if currently using mock data
 */
export const isMockMode = (): boolean => USE_MOCK_DATA;
