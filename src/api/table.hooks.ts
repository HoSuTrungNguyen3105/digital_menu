import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { getTables, getTableById, createTable, updateTable, deleteTable } from './table.api';
import { Table, CreateTableDto, UpdateTableDto, ApiResponse, TableQueryParams } from '../types';

// Get all tables
export const useGetTables = (params?: TableQueryParams): UseQueryResult<ApiResponse<Table[]>, Error> => {
    return useQuery<AxiosResponse<ApiResponse<Table[]>>, Error, ApiResponse<Table[]>>({
        queryKey: ['tables', params],
        queryFn: () => getTables(params),
        select: (data) => data.data,
    });
};

// Get single table
export const useGetTableById = (tableId: string): UseQueryResult<Table, Error> => {
    return useQuery<AxiosResponse<ApiResponse<Table>>, Error, Table>({
        queryKey: ['table', tableId],
        queryFn: () => getTableById(tableId),
        select: (data) => data.data.data,
        enabled: !!tableId,
    });
};

// Create table mutation
export const useCreateTable = (): UseMutationResult<
    AxiosResponse<ApiResponse<Table>>,
    Error,
    CreateTableDto
> => {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse<ApiResponse<Table>>, Error, CreateTableDto>({
        mutationFn: (data: CreateTableDto) => createTable(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tables'] });
        },
    });
};

// Update table mutation
export const useUpdateTable = (): UseMutationResult<
    AxiosResponse<ApiResponse<Table>>,
    Error,
    { tableId: string; data: UpdateTableDto }
> => {
    const queryClient = useQueryClient();

    return useMutation<
        AxiosResponse<ApiResponse<Table>>,
        Error,
        { tableId: string; data: UpdateTableDto }
    >({
        mutationFn: ({ tableId, data }) => updateTable(tableId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tables'] });
        },
    });
};

// Delete table mutation
export const useDeleteTable = (): UseMutationResult<
    AxiosResponse<ApiResponse<void>>,
    Error,
    string
> => {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse<ApiResponse<void>>, Error, string>({
        mutationFn: (tableId: string) => deleteTable(tableId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tables'] });
        },
    });
};
