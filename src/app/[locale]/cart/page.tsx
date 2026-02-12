import Container from '@/components/ui/Container'
import CartList from '@/features/cart/components/CartList'
import React from 'react'
import getUserSession from '@/lib/auth/getUserSession'

export default async function page() {
    await getUserSession()

    return (
        <Container>
            <CartList />
        </Container>
    )
}
