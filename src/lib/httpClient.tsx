import axios from "axios";
export const baseUrl = 'https://tech-commerce.fractalsgroup.net'
export const httpClient = axios.create({
    baseURL: baseUrl
})
export const endpoints = {
    signUp: '/api/register',
    products: '/api/product',
    productById: '/api/product',
    cart: '/api/cart',
    category: '/api/category',
    categoryById: '/api/category',
    subcategory: '/api/subcategory',
    subcategoryById: '/api/subcategory',
}