import SignInForm from '@/features/auth/components/forms/SignInForm'
import React from 'react'

export default function page() {
    return (
        <div>
            <div className='h-[calc(100vh-8rem)]  flex justify-center items-center flex-col gap-8'>
                <h1 className='text-3xl '>Sign In </h1>
                <SignInForm />
            </div>
        </div>
    )
}
