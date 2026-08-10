"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Members', href: '/members' },
    { name: 'Events', href: '/events' },
    { name: 'Projects', href: '/projects' },
    { name: 'Docs', href: '/docs' },
    { name: 'Join Us', href: '/join' },
    { name: 'Admin', href: '/admin' },
]

export function Navbar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={cn(
            'fixed top-0 w-full z-50 transition-all duration-300 border-b',
            scrolled ? 'bg-background/80 backdrop-blur-md border-white/10 py-3' : 'bg-transparent border-transparent py-5'
        )}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex flex-col items-start group">
                        <div className="flex items-center text-3xl font-bold font-sans tracking-tight leading-none group-hover:scale-105 transition-transform origin-left">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-[#9b59b6] to-purple-400 mr-[1px]">µ</span>
                            <span className="text-white">learn</span>
                        </div>
                        <span className="text-[0.65rem] font-bold text-primary tracking-[0.45em] uppercase mt-1 ml-[1.6rem] opacity-90 group-hover:text-purple-400 transition-colors">
                            CEA
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {links.map((link) => {
                            const isActive = pathname === link.href
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                                        isActive
                                            ? 'bg-white/10 text-white'
                                            : 'text-text-muted hover:text-white hover:bg-white/5'
                                    )}
                                >
                                    {link.name}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-text-muted hover:text-white transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-surface/95 backdrop-blur-xl border-b border-white/10 shadow-2xl pb-4 pt-2">
                    <nav className="flex flex-col container mx-auto px-4 gap-2">
                        {links.map((link) => {
                            const isActive = pathname === link.href
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        'px-4 py-3 rounded-xl text-base font-medium transition-colors',
                                        isActive
                                            ? 'bg-primary/20 text-primary'
                                            : 'text-text-primary hover:bg-white/5'
                                    )}
                                >
                                    {link.name}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            )}
        </header>
    )
}
