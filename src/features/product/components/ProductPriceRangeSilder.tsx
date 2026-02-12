'use client'
import { Slider } from '@/components/ui/slider'
import React, { useState } from 'react'

export default function ProductPriceRangeSilder() {
    const [value, setValue] = useState([1000000])

    return (
        <div className='flex flex-col gap-2 '>
            <span>Max Price: {value[0]}</span>
            <Slider value={value} onValueChange={setValue} max={1000000} />
        </div>
    )
}
