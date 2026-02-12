'use client'
import React from 'react'
import ProductSearchBar from './ProductSearchBar'
import ProductCard from './ProductCard'
import PaginationDemo from '@/components/Pagination'
import Container from '@/components/ui/Container'
import { useProductFilters } from '@/hooks/useProductFilters'
import useFetchProduct from '../hook/useFetchProduct'

export default function ProductList() {
    const { filters, page } = useProductFilters()
    const { data, isLoading, isError, error } = useFetchProduct({
        page: page, per_page: 10, filters
    })

    if (isLoading) return <p>Loading…</p>
    if (isError) return (
        <Container>
            <p className='text-red-600'>{error.message}</p>
        </Container>
    )
    if (data?.data.length === 0) {
        return (
            <Container>
                <ProductSearchBar />

                <p>No product Found</p>
            </Container>
        )
    }
    return (
        <div>
            <ProductSearchBar />
            <div className=' w-full flex justify-end'>
            </div>
            <div className=' relative'>
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-3   ">
                    {data?.data?.map((p) => (
                        <ProductCard product={p} key={p.id} className="col-span-1 h-fit" />
                    ))}
                </div>

            </div>
            <div className="mt-6">
                <PaginationDemo meta={data?.meta} />
            </div>
        </div>
    )
}
