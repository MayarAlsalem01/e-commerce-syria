'use client'
import { Button } from '@/components/ui/button'

import { ShoppingCart } from 'lucide-react'
import React, { useEffect } from 'react'

import useCart from '../hook/useCart'
import useAddToCart from '../hook/useAddToCart'
import useInvalidateCartQuery from '../hook/useInvalidateCartQuery'

export default function AddToCartButton({ quantity = 1, productId, token }: { quantity?: number, productId: number, token: string }) {
    const { data, isLoading } = useCart()

    const { invalidateCartQuery } = useInvalidateCartQuery()
    const { mutate, isError, isPending, isSuccess } = useAddToCart()
    useEffect(() => {
        console.log(data)
    }, [data])
    if (isError)
        console.log('error')
    if (isSuccess) {
        invalidateCartQuery()
        console.log('success')

    }

    const exists = data?.data?.items.some(i => i.product.id === productId)

    return (
        <Button className='uppercase disabled:cursor-not-allowed  ' variant={'outline'} disabled={isLoading || exists || isPending} onClick={() => {
            mutate({ quantity, productId, token })
        }}>
            <ShoppingCart />
            {exists ? 'already in cart ' : isPending ? 'adding...' : 'add to cart'}


        </Button>
    )
}
