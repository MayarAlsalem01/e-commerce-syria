'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import CartItem from './CartItem'
import useCart from '../hook/useCart'
import { useTranslations } from 'next-intl'

export default function CartList() {
    const t = useTranslations('cart')
    const { data: res, isLoading } = useCart()
    if (isLoading)
        return <p>loading</p>
    console.log(res)
    if (res && res.data.items.length <= 0) {
        return (
            <div className='w-full  h-[calc(100vh-6rem)] flex items-center justify-center'>
                <p className='text-3xl'>Your cart is empty..</p>
            </div>
        )
    }

    if (res)
        return (
            <div className='mt-5'>

                <p className='text-3xl font-bold mb-5'>{t('title')} :</p>
                <div className='flex flex-col gap-5'>
                    {
                        res.data.items.map((cartItem, i) => (
                            <CartItem cartItem={cartItem} key={i} />
                        ))
                    }
                </div>
                <div className='w-full h-24 flex justify-center items-center bg-primary/60 backdrop-blur-xs fixed left-0 bottom-0 rounded-tl-4xl rounded-tr-4xl'>
                    <div className='w-2/3 flex justify-between'>
                        <p className='text-white text-3xl'>
                            {t('totalPrice')} : ${res.data.total_price}
                        </p>
                        <Button variant={'secondary'} className='bg-white text-2xl hover:bg-white/90 text-black' size={'lg'}>Payment</Button>
                    </div>
                </div>
            </div>
        )
}
