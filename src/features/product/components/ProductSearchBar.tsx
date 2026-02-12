'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useProductFilters } from '@/hooks/useProductFilters'
import { SearchIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

export default function ProductSearchBar() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')
    const { setFilters, filters } = useProductFilters()

    return (
        <div className='flex items-center border border-primary/60 ps-4 rounded-lg relative mt-2 mb-4'>
            <SearchIcon />
            <Input type='text' className='focus-visible:ring-0 border-none' placeholder='search..' onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    const params = new URLSearchParams(searchParams.toString() ?? '')
                    params.set('page', '1')
                    params.set('name', searchQuery)
                    const qs = params.toString()
                    setFilters({ 'name': searchQuery })
                    // router.push(`${pathname}?${qs ? qs : ''}`)
                }
            }} />
            <Button>Search</Button>
        </div>
    )
}
