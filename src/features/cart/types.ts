import { Product } from "../product/types/product"

export type CartItem = {
    id: number
    quantity: number
    price: string
    total_price: number
    product: Product
}
export type Cart = {
    id: number,
    total_price: string,
    items: CartItem[]
}