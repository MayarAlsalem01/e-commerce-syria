import Container from '@/components/ui/Container'

import React from 'react'

import ProductDetails from '@/features/product/components/ProductDetails'
export default async function page({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params
    return (
        <div>
            <section className='mt-5'>
                <Container >
                    <ProductDetails productId={id} />
                </Container>
            </section>
        </div >
    )
}
