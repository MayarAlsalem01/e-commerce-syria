import { cartKeys } from '@/lib/queryKeys'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'

export default function useInvalidateCartQuery() {
    const qc = useQueryClient()
    const invalidateCartQuery = () => {
        qc.invalidateQueries({
            queryKey: cartKeys.all
        })
    }
    return { invalidateCartQuery }
}
