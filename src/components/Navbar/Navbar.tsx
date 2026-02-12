'use client'
import { HeartIcon, HomeIcon, LucideProps, MenuIcon, SettingsIcon, ShoppingCartIcon, ShoppingBagIcon } from 'lucide-react'
import Image from 'next/image'
import React, { ReactNode, useEffect, useState } from 'react'
import drTechLogo from '../../../public/images/logo/drTech.png'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'
import CartLink from '@/features/cart/components/CartLink'
import { useTranslations } from 'next-intl'
import useGetUserSession from '@/lib/auth/useGetUserSession'
type NavbarLinkProps = {
    item: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>,
    href: string,
    text: string
}
export default function Navbar() {
    const t = useTranslations('HomePage.navbar')
    const authT = useTranslations('auth')

    const links: NavbarLinkProps[] = [
        { item: HomeIcon, href: '/', text: t('home') },
        { item: ShoppingBagIcon, href: '/products', text: t('products') },
        { item: HeartIcon, href: '/favorite', text: t('favorite') },
        { item: SettingsIcon, href: 'settings', text: t('settings') },
    ]
    const pathname = usePathname()
    const isMobile = useMediaQuery({ query: '(max-width: 480px)' })
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        console.log(isMobile)
    }, [isMobile])
    const { data, status } = useGetUserSession()
    return (
        <div className="w-full  mt-2  px-5 sticky top-0.5 z-[999] h-18 ">
            <nav className="w-full flex justify-between items-center  pe-5 rounded-2xl bg-secondary/60 backdrop-blur-md  relative z-20">
                <div>
                    <Link href={'/'}>
                        <Image src={drTechLogo} alt="doctor tech" />
                    </Link>
                </div>

                {
                    status !== 'loading' ?
                        data ? isMobile ? <div className='flex gap-3'>
                            <button onClick={() => setIsOpen(!isOpen)}><MenuIcon /></button>
                            <ul>
                                <CartLink />
                            </ul>
                            <MobileNavbar links={links} className={`${!isOpen ? 'start-[-120%]' : ''}`} />
                        </div> : <ul className={`flex w-2/3 md:w-1/3 lg:w-1/6 justify-between `}>
                            {

                                links.map((link, index) => (
                                    <Link href={link.href} key={index}>
                                        <LiItem className='opacity-60' isActive={pathname === link.href} key={index}><link.item color='#27425D' /></LiItem>
                                    </Link>
                                ))
                            }
                            <CartLink />
                        </ul>
                            : <div className='flex gap-2'>
                                <Link href='/auth/sign-in' className='p-2'>{authT('signIn')}</Link>
                                <Link href='/auth/sign-up' className='p-2'>{authT('signUp')}</Link>
                            </div>
                        : ''
                }
            </nav>
        </div>
    )
}
export function LiItem({ children, isActive = false, className }: { children: ReactNode, isActive?: boolean, className?: string }) {
    return (
        <li className={` p-2 hover:bg-primary/20  rounded-full transition-colors cursor-pointer   ${isActive ? 'opacity-100 bg-primary/20 ' : undefined} ${className}`}>
            {children}
        </li>
    )
}
function NavLink({ children, href, isActive, className }: { children: ReactNode, href: string, isActive: boolean, className?: string }) {
    return (
        <LiItem isActive={isActive} className={`!rounded-2xl ${isActive ? '!bg-primary' : 'text-black'}`}>
            <Link href={href} className=' w-full py-2 block'>
                {children}
            </Link>
        </LiItem>
    )
}
function MobileNavbar({ links, className }: { links: NavbarLinkProps[], className?: string }) {
    const pathname = usePathname()

    return (
        <ul className={`w-full flex flex-col gap-4 absolute top-[105%] start-0 bg-[#d4d8dd]/90 backdrop-blur-xs text-white z-10 rounded-2xl px-1 py-2 transition-all ${className}`}>
            {links.map((link, i) => (
                <NavLink key={i} href={link.href} isActive={pathname === link.href}>
                    {link.text}
                </NavLink>
            ))}


        </ul>
    )
}