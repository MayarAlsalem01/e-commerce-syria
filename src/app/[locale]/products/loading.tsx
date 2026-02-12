import React from 'react'
import Container from '@/components/ui/Container'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <Container className="py-10">
            <div className="flex gap-6">
                {/* Sidebar Skeleton */}
                <div className="hidden md:block w-64 space-y-6">
                    <Skeleton className="h-8 w-32" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                    </div>
                </div>

                {/* Content Skeleton */}
                <div className="flex-1 space-y-6">
                    <div className="flex justify-between items-center">
                        <Skeleton className="h-10 w-full max-w-md" />
                        <Skeleton className="h-10 w-32" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="border rounded-xl p-4 space-y-4">
                                <Skeleton className="aspect-square w-full rounded-lg" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <Skeleton className="h-6 w-20" />
                                    <Skeleton className="h-8 w-16" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    )
}
