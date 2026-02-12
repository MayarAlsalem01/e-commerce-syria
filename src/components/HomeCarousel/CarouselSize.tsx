import * as React from "react"

import {
    Carousel,
    CarouselContent,
} from "@/components/ui/carousel"
export function CarouselSize({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full  "
        >
            <CarouselContent>


                {children}


            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
        </Carousel>
    )
}
