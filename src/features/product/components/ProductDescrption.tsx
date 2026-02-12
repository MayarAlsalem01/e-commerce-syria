import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { Product } from "../types/product";
import SafeHtml from "@/components/SafeHtml";
import AddToCartButton from "@/features/cart/components/AddToCartButton";

import getUserSession from "@/lib/auth/getUserSession";

export default async function ProductDescrption({ product }: { product: Product }) {
    const session = await getUserSession()
    console.log(session.user.token)
    return (
        <div className='basis-1/2 lg:basis-1/3'>
            <div className='flex flex-col'>
                <h1 className='font-bold text-xl'>
                    {product?.name}
                </h1>
                <div className='flex justify-between items-center mt-2'>
                    <span className='text-xl font-semibold'>${product?.price}</span>
                    {
                        product.average_rating && (
                            <span className='flex items-center gap-1'><StarIcon color='#f0b100' fill='#f0b100' /> {product.average_rating}</span>
                        )
                    }
                </div>
                <div className='bg-black/20 w-full h-[1px] block my-6' />
            </div>
            <p className='text-lg text-black'>Description</p>
            <SafeHtml html={product.description} />
            {/* colors */}
            <div className='my-6 flex flex-col gap-4'>
                <p className='text-lg opacity-80 '>Color:</p>
                {
                    product.images ? <div className='flex gap-4 justify-start'>

                        {
                            product.images.map((image) => (
                                <div className={`w-8 h-8 rounded-full `} style={{
                                    backgroundColor: image.color
                                }} />
                            ))
                        }

                    </div> : undefined
                }
            </div>
            <div className='flex gap-2'>
                <Button className='uppercase'>Checkout</Button>
                {
                    session?.user && <AddToCartButton token={session.user.token} productId={product.id} quantity={1} />
                }
            </div>
        </div>
    )
}
