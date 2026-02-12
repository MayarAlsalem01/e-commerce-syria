'use server'
import { endpoints, httpClient } from "@/lib/httpClient";
import { ResponseResult } from "@/types/ResponseResult";
import { Cart } from "../types";
import getUserSession from "@/lib/auth/getUserSession";

export default async function getCart() {
    const session = await getUserSession()

    const res = await httpClient.get(endpoints.cart, {
        headers: {
            'Authorization': `bearer ${session.user.token}`
        }
    })
    return res.data as ResponseResult<Cart>
}