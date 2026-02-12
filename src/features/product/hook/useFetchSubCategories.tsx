import { endpoints } from '@/lib/httpClient'
import { ResponseResult } from '@/types/ResponseResult';
import { useQuery } from '@tanstack/react-query'
import { useHttpClient } from '@/hooks/useHttpClient';
import { SubCategory } from '@/features/category/types/category';

export const subcategoryKeys = {
    all: ['subcategories'] as const,
    byCategory: (categoryId?: string | number) => [...subcategoryKeys.all, { categoryId }] as const,
};

export default function useFetchSubCategories(categoryId?: string | number) {
    const httpClinet = useHttpClient()
    return useQuery({
        queryKey: subcategoryKeys.byCategory(categoryId),
        queryFn: async () => {
            const url = categoryId
                ? `${endpoints.subcategory}?filter[category_id]=${categoryId}`
                : endpoints.subcategory;
            const res = await httpClinet.get(url)
            return res.data as ResponseResult<SubCategory[]>
        },
    })
}
