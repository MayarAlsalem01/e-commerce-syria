'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import Container from '@/components/ui/Container'
import ProductCard from '@/features/product/components/ProductCard'
import useFetchProduct from '@/features/product/hook/useFetchProduct'
import PaginationDemo from '@/components/Pagination'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

// ------------------------------
// FilterBar.tsx (re-usable component)
// ------------------------------
export type FiltersObject = Record<string, string | undefined>

export type FilterBarProps = {
    /** initial filters coming from URL or parent state */
    initialFilters?: FiltersObject
    /** called when the user triggers a search or applies filters */
    onSearch: (filters: FiltersObject) => void
    /** optional label for the search input */
    placeholder?: string
}

export function FilterBar({ initialFilters = {}, onSearch, placeholder = 'search' }: FilterBarProps) {
    // keep a controlled input for the main search box
    const [search, setSearch] = useState(initialFilters.search ?? '')

    // if parent changes initialFilters (navigation/back), sync local input
    useEffect(() => {
        setSearch(initialFilters.search ?? '')
    }, [initialFilters.search])

    // Build a FiltersObject from local fields - easily extensible later
    function gatherFilters() {
        const out: FiltersObject = { ...initialFilters }

        // update the main search filter
        if (search && search.trim() !== '') out.search = search.trim()
        else delete out.search

        return out
    }

    function handleSubmit() {
        const f = gatherFilters()
        onSearch(f)
    }

    return (
        <div className="flex items-center gap-2 border border-primary/60 p-2 rounded-md">
            <SearchIcon />
            <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        handleSubmit()
                    }
                }}
                className="shadow-none focus:outline-0 focus:shadow-none focus-visible:ring-0 border-0"
                placeholder={placeholder}
            />
            <Button onClick={handleSubmit}>Search</Button>
            <Button
                variant="ghost"
                onClick={() => {
                    setSearch('')
                    // apply with cleared search (parent will decide what to remove in URL)
                    onSearch({ ...initialFilters, search: undefined })
                }}
            >
                Clear
            </Button>
        </div>
    )
}

// ------------------------------
// Page.tsx — imports and uses FilterBar
// ------------------------------


