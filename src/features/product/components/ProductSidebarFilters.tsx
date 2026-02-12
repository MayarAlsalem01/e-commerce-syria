'use client'
import React from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useProductFilters } from '@/hooks/useProductFilters'
import useFetchCategories from '@/features/category/hook/useFetchCategories'
import useFetchSubCategories from '@/features/product/hook/useFetchSubCategories'
import { useLocale } from 'next-intl'
import Container from '@/components/ui/Container'
import ProductList from './ProductList'

export default function ProductSidebarFilters() {
    const { filters, setFilters } = useProductFilters()
    const { data: categoriesData } = useFetchCategories()
    const { data: subCategoriesData } = useFetchSubCategories(filters.category_id)
    const locale = useLocale()

    const handleFilterChange = (key: string, value: string | undefined) => {
        setFilters({ ...filters, [key]: value })
    }

    return (
        <SidebarProvider className={`${locale === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
            <Sidebar variant='inset'>
                <div className='bg-secondary/70 rounded-2xl w-full h-full top-20 relative py-4 px-2 overflow-y-auto'>
                    <SidebarHeader>
                        <h2 className='text-lg font-bold px-2'>Filters</h2>
                    </SidebarHeader>
                    <SidebarContent className='gap-6'>
                        <SidebarGroup className='gap-2'>
                            <Label className='px-2'>Category</Label>
                            <Select
                                value={filters.category_id || "all"}
                                onValueChange={(val) => {
                                    const categoryId = val === "all" ? undefined : val;
                                    setFilters({ ...filters, category_id: categoryId, sub_category_id: undefined })
                                }}
                            >
                                <SelectTrigger className='w-full border border-primary/20 rounded-lg bg-background'>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categoriesData?.data.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </SidebarGroup>

                        <SidebarGroup className='gap-2'>
                            <Label className='px-2'>Sub-Category</Label>
                            <Select
                                value={filters.sub_category_id || "all"}
                                onValueChange={(val) => handleFilterChange('sub_category_id', val === "all" ? undefined : val)}
                                disabled={!filters.category_id}
                            >
                                <SelectTrigger className='w-full border border-primary/20 rounded-lg bg-background'>
                                    <SelectValue placeholder="Select SubCategory" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All SubCategories</SelectItem>
                                    {subCategoriesData?.data.map((sub) => (
                                        <SelectItem key={sub.id} value={sub.id.toString()}>{sub.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </SidebarGroup>

                        <SidebarGroup className='gap-2'>
                            <div className='flex justify-between px-2'>
                                <Label>Max Price</Label>
                                <span className='text-xs font-mono'>{filters.max_price || 5000}</span>
                            </div>
                            <Slider
                                defaultValue={[parseInt(filters.max_price || '5000')]}
                                max={5000}
                                step={10}
                                onValueCommit={(val) => handleFilterChange('max_price', val[0].toString())}
                            />
                        </SidebarGroup>

                        <SidebarGroup className='gap-2'>
                            <Label className='px-2'>Min Rating</Label>
                            <Select
                                value={filters.min_rate || "0"}
                                onValueChange={(val) => handleFilterChange('min_rate', val === "0" ? undefined : val)}
                            >
                                <SelectTrigger className='w-full border border-primary/20 rounded-lg bg-background'>
                                    <SelectValue placeholder="Select Rating" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Any Rating</SelectItem>
                                    <SelectItem value="4">4 Stars & Above</SelectItem>
                                    <SelectItem value="3">3 Stars & Above</SelectItem>
                                    <SelectItem value="2">2 Stars & Above</SelectItem>
                                </SelectContent>
                            </Select>
                        </SidebarGroup>

                        <SidebarGroup className='flex-row items-center justify-between px-2 py-1'>
                            <Label htmlFor="featured">Featured</Label>
                            <Switch
                                id="featured"
                                checked={filters.featured === 'true'}
                                onCheckedChange={(checked: boolean) => handleFilterChange('featured', checked ? 'true' : undefined)}
                            />
                        </SidebarGroup>

                        <SidebarGroup className='flex-row items-center justify-between px-2 py-1'>
                            <Label htmlFor="best_selling">Best Selling</Label>
                            <Switch
                                id="best_selling"
                                checked={filters.best_selling === 'true'}
                                onCheckedChange={(checked: boolean) => handleFilterChange('best_selling', checked ? 'true' : undefined)}
                            />
                        </SidebarGroup>
                    </SidebarContent>
                </div>
            </Sidebar>
            <Container className='w-full'>
                <SidebarInset className='bg-background top-2 w-full'>
                    <div className='flex items-center gap-2 p-2'>
                        <SidebarTrigger />
                    </div>
                    <ProductList />
                </SidebarInset>
            </Container>
        </SidebarProvider>
    )
}
