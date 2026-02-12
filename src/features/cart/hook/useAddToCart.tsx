'use client'
import { endpoints, httpClient } from '@/lib/httpClient'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

export default function useAddToCart() {
    return useMutation({
        mutationFn: async ({ quantity, productId, token }: { quantity: number, productId: number, token: string }) => {
            const res = await httpClient.post(endpoints.cart, {
                quantity,
                'product_id': productId,
                'color': 'red'
            }, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            })
            return res
        }
    })
}
