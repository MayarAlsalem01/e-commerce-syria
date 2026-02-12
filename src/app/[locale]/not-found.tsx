import React from 'react'

export default async function NotFound() {
    return (
        <div className='text-red-600 h-[calc(100vh-5rem)]  w-full flex flex-col items-center justify-center'>
            <p className='text-8xl'>404</p>
            <p className='text-4xl '>Not Found</p>
        </div>
    )
}
