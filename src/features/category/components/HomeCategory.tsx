import React from 'react'
import HeadPhone from '../../../../public/images/Iphone.png'
import Image from 'next/image'
export default function HomeCategory() {
    return (
        <div className='mt-5 '>
            <div className='flex flex-col items-center w-fit gap-2'>
                <div className='bg-black/5 w-28 h-28 rounded-full flex justify-center items-center'>
                    <Image src={HeadPhone} alt='' className='object-cover w-24  ' />
                </div>
                <p className='text-lg'>Mobile</p>
            </div>
        </div>
    )
}
