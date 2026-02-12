import { cartKeys } from '@/lib/queryKeys'
import { useQuery } from '@tanstack/react-query'
import getCart from '../services/getCart'


export default function useCart() {
    return useQuery({
        queryKey: cartKeys.all,
        queryFn: async () => {
            return await getCart()

        },
    })
}
