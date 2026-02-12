'use server'

import { authOptions } from "@/app/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function getUserSession() {
    const session = await getServerSession(authOptions)
    if (!session)
        redirect('/')
    return session
}