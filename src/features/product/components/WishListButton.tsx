'use client'
import { HeartIcon } from 'lucide-react'
import React from 'react'

export default function WishListButton() {

    return (
        <button className=' p-1 absolute top-2 right-2 bg-white/30 rounded-full w-6 h-6 overflow-hidden cursor-pointer'>
            <HeartIcon className='' fill={'#f00410'} color={'#f00410'} size={'1rem'} />

        </button>
    )
}
