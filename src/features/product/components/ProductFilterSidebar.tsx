'use client'
import { Button } from '@/components/ui/button'
import { Sidebar } from '@/components/ui/sidebar'
import React, { createContext, ReactNode, useContext, useState } from 'react'

export default function ProductFilterSidebar({ className }: { className: string }) {
    const { isOpen } = useSidebar()
    return (
        <SidebarProvider>

            <aside className={`  ${className} bg-black/40 fixed top-0 left-0 lg:sticky lg:top-20 lg:h-[80vh] w-full h-[100svh] rounded-2xl z-50 ${isOpen ? 'block' : 'hidden'}`}>
                <div className='w-3/4 lg:w-full h-full bg-secondary rounded-2xl'>

                </div>
            </aside>
        </SidebarProvider>
    )
}
const sidebarContext = createContext({ setIsOpen: () => { }, isOpen: false })
function SidebarProvider({ children }: { children: ReactNode }) {
    const { isOpen, setIsOpen } = useSidebar()
    return (
        <sidebarContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </sidebarContext.Provider>
    )
}
function useSidebar() {
    const context = useContext(sidebarContext)
    if (!context)
        throw new Error('wrap with sidebar provider')
    return context
}
function sidebarTrigger() {
    const {setIsOpen}=useSidebar()
    return (
        <Button>open</Button>
    )
}