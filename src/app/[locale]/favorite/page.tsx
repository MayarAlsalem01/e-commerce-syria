import Container from '@/components/ui/Container'
import ProductCard from '@/features/product/components/ProductCard'
import { Product } from '@/features/product/types/product'
import { baseUrl, endpoints } from '@/lib/httpClient'
import { ResponseResult } from '@/types/ResponseResult'
import React from 'react'
import getUserSession from '@/lib/auth/getUserSession'
import { getTranslations } from 'next-intl/server'

export default async function page() {
    await getUserSession()
    const t = await getTranslations('HomePage.navbar')
    const res = await fetch(`${baseUrl}${endpoints.productById}/51`, {
        // next: { revalidate: 3600 },
    })
    const data = await res.json() as ResponseResult<Product>
    return (
        <Container >
            <p className='text-3xl my-4'> {t('favorite')} :</p>
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-8 gap-x-4'>
                {
                    Array.from({ length: 20 }).map((_, i) => (
                        <div className='col-span-1'>
                            <ProductCard product={data.data} isFav />
                        </div>
                    ))
                }
            </div>
        </Container>
    )
}
