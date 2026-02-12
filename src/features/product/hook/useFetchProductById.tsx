import { endpoints } from '@/lib/httpClient'
import { useQuery } from '@tanstack/react-query'
import { Product } from '../types/product'
import { productKeys } from '@/lib/queryKeys'
import { useHttpClient } from '@/hooks/useHttpClient'

export default function useFetchProductById(productId: string) {
    const httpClinet = useHttpClient()

    return useQuery({
        queryKey: productKeys.id(productId),
        queryFn: async () => {
            const res = await httpClinet.get(endpoints.productById + '/' + productId)
            return res.data.data as Product
        }
    })
}
