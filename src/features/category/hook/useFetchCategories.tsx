import { endpoints } from '@/lib/httpClient'
import { ResponseResult } from '@/types/ResponseResult';
import { useQuery } from '@tanstack/react-query'
import { useHttpClient } from '@/hooks/useHttpClient';
import { Category } from '../types/category';

export const categoryKeys = {
    all: ['categories'] as const,
};

export default function useFetchCategories() {
    const httpClinet = useHttpClient()
    return useQuery({
        queryKey: categoryKeys.all,
        queryFn: async () => {
            const res = await httpClinet.get(endpoints.category)
            return res.data as ResponseResult<Category[]>
        },
    })
}
