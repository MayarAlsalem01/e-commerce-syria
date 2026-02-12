import { Button } from '@/components/ui/button'
import { ShoppingCart, StarIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import laptop from '../../../../public/images/pngwing.com.png'
import { baseUrl, endpoints } from '@/lib/httpClient'
import { ResponseResult } from '@/types/ResponseResult'
import { Product } from '../types/product'
import ProductColumn from './ProductColumn'
import ProductDescrption from './ProductDescrption'
import { notFound } from 'next/navigation'
import ReviewProgressCircle from '@/features/review/components/ReviewProgressCircle'
import ProductReview from './ProductReview'


export default async function ProductDetails({ productId }: { productId: number }) {
    const res = await fetch(`${baseUrl}${endpoints.productById}/${productId}`, {
    })
    console.log(res)

    if (!res.ok) {
        return notFound()
    }
    const product = await res.json() as ResponseResult<Product>
    console.log(product.data)
    return (
        <div className='w-full  '>
            <div className=' flex flex-col md:flex-row justify-center gap-12 '>

                <ProductColumn product={product.data} />
                {/* descrption */}
                <ProductDescrption product={product.data} />
            </div>
            {/* review */}
            <ProductReview product={product.data} />
        </div>
    )
}


