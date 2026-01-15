import { AxiosResponse } from "axios";
import instance from "../utils/axios";
import { Table, CreateTableDto, UpdateTableDto, ApiResponse, TableQueryParams } from "../types";

// Create table
export const createTable = (
    data: CreateTableDto
): Promise<AxiosResponse<ApiResponse<Table>>> =>
    instance.post("/tables", data);

// Get all tables
export const getTables = (params?: TableQueryParams): Promise<
    AxiosResponse<ApiResponse<Table[]>>
> => instance.get("/tables", { params });

// Get single table
export const getTableById = (
    tableId: string
): Promise<AxiosResponse<ApiResponse<Table>>> =>
    instance.get(`/tables/${tableId}`);

// Update table
export const updateTable = (
    tableId: string,
    data: UpdateTableDto
): Promise<AxiosResponse<ApiResponse<Table>>> =>
    instance.put(`/tables/${tableId}`, data);

// Delete table
export const deleteTable = (
    tableId: string
): Promise<AxiosResponse<ApiResponse<void>>> =>
    instance.delete(`/tables/${tableId}`);
