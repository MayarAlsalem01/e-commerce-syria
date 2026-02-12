import React from 'react'
import Image from "next/image";
import HeadPhone from '../../../../public/images/headphones.png'

export default function SpecialProductCard() {
    return (
        <div>
            <div className="">
                <div className="flex bg-gradient-to-r from-[#86739D] to-[#3B405C] w-full h-44 rounded-2xl relative pb-2 ">
                    <Image src={HeadPhone} alt="headphone" className="w-32 " />
                    <div className="flex flex-col items-start justify-start text-primary-foreground gap-2 pr-2 pt-5">
                        <p className="font-bold tracking-wide text-lg">Get Special Offer </p>
                        <div className="flex justify-between w-full ">
                            <span className="font-semibold">Up to</span>
                            <span className="text-5xl font-bold">50%</span>
                        </div>
                        <p className="text-sm leading-relaxed pl-1 opacity-80  ">Lorem ipsum dolor sit amet consectetur adipisicing elit.

                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
