import { useSession } from 'next-auth/react'
import React from 'react'

export default function useGetUserSession() {
    return useSession()
}
