import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { User, ApiResponse } from '../types';
import { getMyProfile } from './auth.api';

export const useGetMe = (): UseQueryResult<User, Error> => {
    return useQuery<AxiosResponse<ApiResponse<User>>, Error, User>({
        queryKey: ['me'],
        queryFn: () => getMyProfile(),
        select: (data) => data.data.data,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
