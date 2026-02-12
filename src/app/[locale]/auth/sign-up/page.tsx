
import SignUpForm from '@/features/auth/components/forms/SignUpForm'
import getUserSession from '@/lib/auth/getUserSession'
import React from 'react'

export default async function page() {
    return (
        <div>
            <div className='h-screen flex flex-col justify-center items-center'>
                <h1 className='text-3xl font-semibold'>
                    Sign Up
                </h1>
                <SignUpForm />
            </div>
        </div>
    )
}
