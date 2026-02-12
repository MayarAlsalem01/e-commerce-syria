import React, { ReactNode } from 'react'

export default function Section({ children, title }: { children: ReactNode, title: string }) {
    return (
        <section className="mt-5">
            <div className="w-full flex justify-between">
                <p className="font-semibold text-xl">{title} :</p>
                <p className="text-lg">See all</p>
            </div>
            {children}
        </section>
    )
}
