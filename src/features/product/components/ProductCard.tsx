'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { HeartIcon, ShoppingCartIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import lap from '../../../../public/images/pngwing.com.png'
import { Product } from '../types/product'
import WishListButton from './WishListButton'
import Link from 'next/link'
export default function ProductCard({ product, isFav, className }: { product: Product, isFav?: boolean, className?: string }) {

    return (
        <Card className={` pt-3 pb-0 bg-[#87A7D0]/10 gap-2 ${className}`}>
            <CardHeader className="px-3 ">
                <div className="w-full h-52 bg-[#7A8A90] rounded flex justify-center items-center relative">
                    <Image src={lap} alt="" className="object-contain w-full h-full " />
                    {product.in_wish_list ? <WishListButton /> : undefined}
                    {isFav && (<div className='absolute top-2 right-1 bg-primary p-1 rounded-full '>
                        <HeartIcon size={'1.4rem'} fill='#f83030' color='#f83030' />
                    </div>)}
                </div>
                <CardTitle className="pt-2 flex justify-between items-center">
                    <p>{product.name}</p>
                    <span className="flex items-center gap-1 ">
                        <StarIcon fill="#dbc712" color="#dbc712" />
                        <span className=" text-sm">{product.average_rating}</span>
                    </span>
                </CardTitle>
                <CardDescription>{product.category}</CardDescription>

            </CardHeader>
            <CardContent className="px-3 ">
                <p>{product.short_description}</p>
            </CardContent>
            <CardFooter className="p-0 pl-3 flex justify-between">
                <p className="text-2xl font-bold">${product.price}</p>
                <div className="w-fit px-2 h-10 flex items-center justify-center rounded-tl-lg rounded-br-xl bg-primary">
                    {/* <ShoppingCartIcon color='#ffffff' /> */}
                    <Link href={`/products/${product.id}`} className='text-white'>Details</Link>
                </div>
            </CardFooter>
        </Card>
    )
}
