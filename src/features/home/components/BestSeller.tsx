'use client'
import { CarouselSize } from '@/components/HomeCarousel/CarouselSize'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingCartIcon, StarIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import useFetchProduct from '@/features/product/hook/useFetchProduct'
import { CarouselItem } from '@/components/ui/carousel'
import ProductCard from '@/features/product/components/ProductCard'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

export default function BestSeller() {
    const { data, isLoading } = useFetchProduct({ page: 1, per_page: 10, filters: { 'best_selling': true } })
    useEffect(() => {
        console.log(data?.data)
    }, [data])
    if (isLoading) {
        return (
            <CarouselSize className=" mt-5">
                {
                    // data.data.map((p, i) => (
                    //     <CarouselItem key={i} className='basis-[93%] md:basis-[44%] lg:basis-[30%] xl:basis-[23%] select-none'>
                    //         <ProductCard product={p} />
                    //     </CarouselItem>
                    // ))
                    <CarouselSize >
                        {Array.from({ length: 5 }).map((_, i) => (
                            <CarouselItem key={i} className='basis-[93%] md:basis-[44%] lg:basis-[30%] xl:basis-[23%]'>
                                <Card className="  pt-3 pb-0 bg-[#87A7D0]/10 gap-2">
                                    <CardHeader className="px-3 ">
                                        <div className="w-full h-52 bg-[#7A8A90] rounded flex justify-center items-center ">
                                            <Skeleton className='w-full h-full bg-primary/50' />
                                        </div>
                                        <CardTitle className="pt-2 flex justify-between items-center">
                                            <Skeleton className='w-40 bg-primary/20 h-8' />
                                            <span className="flex items-center gap-1 ">
                                                <StarIcon fill="#dbc712" color="#dbc712" />
                                                <span className=" text-sm"><Skeleton /></span>
                                            </span>
                                        </CardTitle>
                                        <CardDescription><Skeleton className='w-1/4 h-5 bg-primary/20' /></CardDescription>

                                    </CardHeader >
                                    <CardContent className="px-3 ">
                                        <p><Skeleton className='w-full h-8 bg-primary/20' /></p>
                                    </CardContent>
                                    <CardFooter className="p-0 pl-3 flex justify-between">
                                        <p className="text-2xl font-bold"><Skeleton className='w-24 h-8 bg-primary/20' /></p>
                                        <div className="w-10 h-10 flex items-center justify-center rounded-tl-lg rounded-br-xl bg-primary">
                                            <ShoppingCartIcon color='#ffffff' />
                                        </div>
                                    </CardFooter>
                                </Card >
                            </CarouselItem >
                        ))
                        }
                    </CarouselSize >
                }
            </CarouselSize >
        )
    }
    if (data)
        return (
            <CarouselSize className=" mt-5">
                {
                    data.data.map((p, i) => (
                        <CarouselItem key={i} className='basis-[93%] md:basis-[44%] lg:basis-[30%] xl:basis-[23%] select-none'>

                            <ProductCard product={p} />
                        </CarouselItem>
                    ))

                }
            </CarouselSize >
        )
}
