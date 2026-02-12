'use client'
import { SessionProvider as SessionProv } from 'next-auth/react'
import React, { ReactNode } from 'react'
export default function SessionProvider({ children, }: { children: ReactNode }) {
    console.log('sessionProvider')
    return (
        <SessionProv refetchInterval={0} refetchOnWindowFocus={false} refetchWhenOffline={false}  >
            {children}
        </SessionProv>
    )
}
