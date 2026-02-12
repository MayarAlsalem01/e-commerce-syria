import { Button } from '@/components/ui/button'
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import laptop from '../../../../public/images/pngwing.com.png'
import { CartItem as item } from '../types'
import DeleteCartItemButton from './DeleteCartItemButton'
import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'
export default function CartItem({ cartItem }: { cartItem: item }) {
    const t = useTranslations('cart')
    return (
        <div className='flex  flex-col gap-3 md:gap-0 md:flex-row justify-between border border-secondary bg-secondary/40 rounded-2xl px-8 py-4'>
            <div className='w-32 h-32 flex items-center justify-center  self-center md:self-auto border border-primary p-4 rounded-xl bg-white/20'>
                <Image src={laptop} alt='' className='w-full' />
            </div>
            {/* product details */}
            <div className='flex flex-col gap-2 ms-4'>
                <p className='font-bold text-lg'>{t('productName')} :</p>
                <p className=' text-lg'>{cartItem.product.name}</p>
                <p className='text-black/80 '>Phone</p>
                <p className='text-black font-bold text-3xl'>${Math.round(Number(cartItem.price))}</p>
            </div>
            {/* Quantity */}
            <div className='relative basis-1/3 border md:border-r border-l-0 border-r-0  md:my-0 py-3 md:py-0  md:border-l md:border-t-0 md:border-b-0 border-black/20'>
                <div className='flex flex-col items-center '>
                    <p className='font-semibold mx-2 text-lg '>{t('quantity')}</p>
                    {/* incremental */}
                    <div className='mt-8 flex gap-5 items-center'>
                        <Button variant={'secondary'} className='text-3xl '><MinusIcon /></Button>
                        <span>{cartItem.quantity}</span>
                        <Button className=''><PlusIcon /></Button>
                    </div>
                </div>

            </div>
            {/* total price  */}
            <div >
                <p className='font-semibold text-lg'>{t('totalPrice')} </p>
                <p className='bg-primary text-white flex justify-center rounded-2xl mt-8'>
                    ${Math.floor(cartItem.total_price)}
                </p>
            </div>
            <DeleteCartItemButton cartItemId={cartItem.id} />
        </div>
    )
}
