'use client'
import Image from "next/image";
import { Product, ProductImage } from "../types/product";
import { useState } from "react";
import { getImagePath } from "@/utils/getImagePath";

export default function ProductColumn({ product }: { product: Product }) {
    const [primaryImage, setPrimaryImage] = useState<ProductImage | null>(product.images ? product.images[0] : null)
    return (
        <div className=' basis-1/2 lg:basis-1/4  flex flex-col gap-4'>
            {
                primaryImage && <div className='min-w-full min-h-96 max-h-96 bg-secondary/80 rounded-xl p-4'>
                    <Image src={getImagePath(primaryImage.image)} alt={product.name} width={232} height={
                        234
                    } className='w-full h-full max-h-80  object-contain ' />
                </div>
            }
            <div className='flex gap-4'>
                {
                    product.images.map((image, i) => (
                        <div
                            key={i}
                            className={`w-18 h-24 flex items-center justify-center rounded-xl bg-secondary/80 cursor-pointer ${primaryImage?.image === image.image ? 'border border-primary' : undefined}`}
                            onClick={() => {
                                if (primaryImage?.image !== image.image) {
                                    setPrimaryImage(image)
                                }
                            }}
                        >
                            <Image src={getImagePath(image.image)} width={232} height={
                                234
                            } alt={product.name} className='object-contain w-full h-full' />
                        </div>
                    ))
                }

            </div>
        </div>
    )
}