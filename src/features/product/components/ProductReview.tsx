import ReviewProgressCircle from '@/features/review/components/ReviewProgressCircle'
import { StarIcon } from 'lucide-react'
import React from 'react'
import { Product, Review } from '../types/product'
import { getTranslations } from 'next-intl/server'

export default async function ProductReview({ product }: { product: Product }) {
    const percentage = (product.average_rating / 5) * 100
    const t = await getTranslations('review')
    return (
        <div className=' mt-5  '>
            <div className='w-1/2 mx-auto h-[1px] bg-black/20 my-12' />
            <p className='text-4xl mb-12 w-full md:w-1/2 flex lg:justify-center  '>{t('title')}:</p>
            <div className='flex flex-col gap-8 md:0 md:flex-row justify-start md:justify-evenly md:items-center flex-wrap'>
                <ReviewProgressCircle className='self-start md:self-auto' percentage={percentage} strokeWidth={4} startAngle={90} size={100} label={product.average_rating} />
                <div className='flex flex-col gap-5 w-ful mt-12l md:w-1/3'>
                    <ReviewProgressItem label='5.0' max={product.total_reviews} count={product.rating_distribution.rate_5} value={product.rating_distribution.rate_5} />
                    <ReviewProgressItem label='4.0' max={product.total_reviews} count={product.rating_distribution.rate_4} value={product.rating_distribution.rate_4} />
                    <ReviewProgressItem label='3.0' max={product.total_reviews} count={product.rating_distribution.rate_3} value={product.rating_distribution.rate_3} />
                    <ReviewProgressItem label='2.0' max={product.total_reviews} count={product.rating_distribution.rate_2} value={product.rating_distribution.rate_2} />
                    <ReviewProgressItem label='1.0' max={product.total_reviews} count={product.rating_distribution.rate_1} value={product.rating_distribution.rate_1} />

                </div>
                <div className='basis-full  my-8 px-20 flex justify-center '>
                    <div className='flex flex-col gap-4  w-2/3    '>
                        {
                            product.reviews.map((review, i) => (
                                <ReviewItem key={i} reviews={review} />
                            ))
                        }
                    </div>

                </div>
            </div>

        </div>
    )
}
function ReviewItem({ reviews }: { reviews: Review }) {

    return (
        <div className='flex flex-col gap-3 border border-primary/50 p-4 rounded-2xl '>

            <div className='flex justify-between'>
                <p>{reviews.user_name}</p>
                <p className='opacity-80'>{reviews.created_at}</p>
            </div>
            <div className='flex gap-2'>
                {
                    Array.from({ length: 5 }).map((_, i) => {
                        if (i < reviews.rate)
                            return (<StarIcon key={i} size='1rem' fill='#f0b100' color='#f0b100' />)

                        else return (<StarIcon key={i} size='1rem' />)
                    })
                }

            </div>
            <p> {reviews.review}</p>
        </div>
    )
}
function ReviewProgressItem({ max, value, count, label }: { max: number, value: number, count: number, label: string }) {
    return (
        <div className='flex items-center gap-3 w-full '>
            <div className='flex gap-1'>
                <span>{label}</span>
                <StarIcon fill='#f0b100' color='#f0b100' />
            </div>
            <progress max={max} value={value} className='h-2 w-full'></progress>
            <span className=''>{count}</span>
        </div>
    )
}