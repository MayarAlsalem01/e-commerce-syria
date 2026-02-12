import { endpoints } from '@/lib/httpClient'
import { ResponseResult } from '@/types/ResponseResult';
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React from 'react'
import { Product } from '../types/product';
import { useHttpClient } from '@/hooks/useHttpClient';
import { productKeys } from '@/lib/queryKeys';

type ProductFilter = {
    best_selling?: boolean;
    max_price?: number;
    min_price?: number;
    // category?: string;
    sub_category_id?: number;
    name?: string
    // Add other specific filters as needed
    [key: string]: string | number | boolean | undefined; // Fallback for other dynamic filters
};

interface UseFetchProductProps {
    page?: number
    per_page?: number
    filters?: ProductFilter
}

export default function useFetchProduct({
    page = 1,
    per_page = 10,
    filters = {},
}: UseFetchProductProps) {
    const httpClinet = useHttpClient()
    return useQuery({
        queryKey: [productKeys.all[0], { page, per_page, ...filters }],
        queryFn: async () => {
            const params = new URLSearchParams()
            params.append('page', page.toString())
            params.append('per_page', per_page.toString())

            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== '') {
                    params.append(`filter[${key}]`, value.toString())
                }
            })

            const queryString = params.toString()

            const res = await httpClinet.get(`${endpoints.products}?${queryString}`, {

            })
            return res.data as ResponseResult<Product[]>// Assuming httpClient.get returns a response object with a data property
        },
        placeholderData: keepPreviousData,
    })
}
