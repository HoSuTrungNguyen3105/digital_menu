import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { getMe } from './auth.api';
import { User, ApiResponse } from '../types';

export const useGetMe = (): UseQueryResult<User, Error> => {
    return useQuery<AxiosResponse<ApiResponse<User>>, Error, User>({
        queryKey: ['me'],
        queryFn: () => getMe(),
        select: (data) => data.data.data,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
