'use client'
import { useCallback, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Filters = Record<string, string | undefined>

export function useProductFilters() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  // parse relevant filter[...] params into an object
  const filters = useMemo<Filters>(() => {
    const out: Filters = {}
    if (!searchParams) return out

    for (const [k, v] of Array.from(searchParams.entries())) {
      const m = k.match(/^filter\[(.+)\]$/)
      if (m) out[m[1]] = v
    }



    return out
    // depend on stringified params so we only recompute when the query changes
  }, [searchParams?.toString()])

  // page from params (string -> number)
  const page = useMemo(() => {
    const p = searchParams?.get('page') ?? '1'
    return Math.max(1, parseInt(p, 10) || 1)
  }, [searchParams?.toString()])

  const buildHref = useCallback(
    (newFilters: Filters, setPageTo = 1) => {
      const params = new URLSearchParams(searchParams?.toString() ?? '')
      // reset page if requested (for new searches)
      if (setPageTo !== undefined) params.set('page', String(setPageTo))

      // update filter[...] entries
      for (const [k, v] of Object.entries(newFilters)) {
        const key = `filter[${k}]`
        if (v === undefined || v === '') params.delete(key)
        else params.set(key, String(v))
      }

      // also keep existing non-filter params untouched
      const qs = params.toString()
      return qs ? `${pathname}?${qs}` : pathname
    },
    [searchParams?.toString(), pathname]
  )

  const setFilters = useCallback(
    (newFilters: Filters, setPageTo = 1) => {
      const href = buildHref(newFilters, setPageTo)
      router.push(href)
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [buildHref, router]
  )

  return { filters, page, setFilters, buildHref }
}
