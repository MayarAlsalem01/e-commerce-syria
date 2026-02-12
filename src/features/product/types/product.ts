export type Product = {
    id: number
    sub_category_id: number
    sub_category: string
    name: string
    description: string
    price: string
    category: string
    type_discount: string
    discount: string
    quantity: number
    new_price: string
    stock: string
    featured: number
    best_selling: number
    in_wish_list: boolean
    images: ProductImage[]
    total_reviews: number
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    rating_distribution: RatingDistribution
    average_rating: number
    reviews: Review[]
    short_description: string
}
export interface Review {
    rate: number
    review: string
    product_name: string
    user_name: string
    created_at: string
}
export interface RatingDistribution {
    rate_5: number
    rate_4: number
    rate_3: number
    rate_2: number
    rate_1: number
}
export type ProductImage = {
    image: string
    color: string
}
