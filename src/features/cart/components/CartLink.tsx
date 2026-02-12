'use client'
import { LiItem } from '@/components/Navbar/Navbar'
import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import useCart from '../hook/useCart'
import useGetUserSession from '@/lib/auth/useGetUserSession'

export default function CartLink() {
    const pathname = usePathname()
    const { data: session, status } = useGetUserSession()
    const router = useRouter()
    if (status === 'unauthenticated')
        router.push('/auth/sign-in')
    const { data } = useCart()
    return (
        <Link href={'/cart'} className='relative '>
            <LiItem isActive={pathname === '/cart'} >
                <ShoppingCartIcon color='#27425D' className={`${pathname === '/cart' ? '' : "opacity-60"}`} />
                <span className='absolute top-0 right-1  text-red-600 rounded-2xl px-1 text-sm font-semibold'>{data?.data?.items.length ?? 0}</span>
            </LiItem>
        </Link>
    )
}
