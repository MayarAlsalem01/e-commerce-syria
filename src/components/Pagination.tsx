'use client'
import React, { useMemo } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

type Meta = {
    pagination: {
        total: number
        per_page: number
        count: number
        current_page: number
    }
}

type Props = {
    meta?: Meta | null
    windowSize?: number // how many page buttons to show around current
}

export default function PaginationDemo({ meta, windowSize = 2 }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const current = meta?.pagination?.current_page ?? 1
    const perPage = meta?.pagination?.per_page ?? 1
    const total = meta?.pagination?.total ?? 0
    const totalPages = Math.max(1, Math.ceil(total / perPage))

    // compute pages to render (simple sliding window + first/last + ellipsis)
    const pages = useMemo(() => {
        const pagesSet = new Set<number>()

        // always include first and last
        pagesSet.add(1)
        pagesSet.add(totalPages)

        // include window around current
        for (let i = current - windowSize; i <= current + windowSize; i++) {
            if (i >= 1 && i <= totalPages) pagesSet.add(i)
        }

        const arr = Array.from(pagesSet).sort((a, b) => a - b)
        return arr
    }, [current, totalPages, windowSize])

    function buildHrefForPage(page: number) {
        const params = new URLSearchParams(searchParams?.toString() ?? '')
        params.set('page', String(page))
        const qs = params.toString()
        return `${pathname}${qs ? `?${qs}` : ''}`
    }

    function goToPage(page: number) {
        // normalize
        const p = Math.max(1, Math.min(totalPages, page))
        const href = buildHrefForPage(p)
        router.push(href)
        // small UX nicety
        if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (!meta) return null

    return (
        <Pagination aria-label="Products pagination">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={buildHrefForPage(Math.max(1, current - 1))}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onClick={(e: any) => {
                            e.preventDefault()
                            if (current > 1) goToPage(current - 1)
                        }}
                        aria-disabled={current <= 1}
                    />
                </PaginationItem>

                {/* render page items with ellipsis where gaps exist */}
                {pages.map((p, i) => {
                    const prev = pages[i - 1]
                    const isGap = prev !== undefined && p - prev > 1

                    return (
                        <React.Fragment key={p}>
                            {isGap && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            <PaginationItem>
                                <PaginationLink
                                    href={buildHrefForPage(p)}
                                    isActive={p === current}
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    onClick={(e: any) => {
                                        e.preventDefault()
                                        if (p !== current) goToPage(p)
                                    }}
                                >
                                    {p}
                                </PaginationLink>
                            </PaginationItem>
                        </React.Fragment>
                    )
                })}

                <PaginationItem >
                    <PaginationNext
                        href={buildHrefForPage(Math.min(totalPages, current + 1))}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onClick={(e: any) => {
                            e.preventDefault()
                            if (current < totalPages) goToPage(current + 1)
                        }}
                        aria-disabled={current >= totalPages}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
