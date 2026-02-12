'use client'
import { TrashIcon } from 'lucide-react'
import React from 'react'
import useDeleteCartItem from '../hook/useDeleteCartItem'
import useInvalidateCartQuery from '../hook/useInvalidateCartQuery'

export default function DeleteCartItemButton({ cartItemId }: { cartItemId: number }) {
    const { mutate, isPending, isSuccess } = useDeleteCartItem()
    const { invalidateCartQuery } = useInvalidateCartQuery()
    if (isSuccess) {
        invalidateCartQuery()
        console.log('successed')
    }
    return (
        <button className='self-center cursor-pointer !p-0 !w-fit !h-fit bg-primary rounded-full disabled:bg-primary/80 disabled:pointer-events-none ' disabled={isPending} onClick={() => {
            mutate({ cartItemId })
        }}>
            <TrashIcon className=' p-1.5  text-white/80' size={'30px'} />
        </button>
    )
}
