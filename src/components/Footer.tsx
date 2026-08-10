"use client"
import Link from 'next/link'

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-background/80 backdrop-blur-md pt-12 pb-8 mt-20">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
                        <Link href="/" className="flex flex-col items-center md:items-start group">
                            <div className="flex items-center text-3xl font-bold font-sans tracking-tight leading-none group-hover:scale-105 transition-transform origin-left">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-[#9b59b6] to-purple-400 mr-[1px]">µ</span>
                                <span className="text-white">learn</span>
                            </div>
                            <span className="text-[0.65rem] font-bold text-primary tracking-[0.45em] uppercase mt-1 ml-[1.6rem] opacity-90 group-hover:text-purple-400 transition-colors">
                                CEA
                            </span>
                        </Link>
                        <p className="text-text-muted text-sm max-w-sm leading-relaxed">
                            The official Campus Chapter at College of Engineering Adoor. Building a robust peer-to-peer learning network.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-3">
                        <div className="flex items-center gap-6 text-sm text-text-muted font-medium">
                            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                            <Link href="/join" className="hover:text-primary transition-colors">Join Us</Link>
                            <Link href="/admin" className="hover:text-karma transition-colors">Admin</Link>
                            <a href="https://mulearn.org" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">mulearn.org</a>
                        </div>
                        <p className="text-sm text-text-muted mt-4 md:mt-0 font-medium">
                            Powered by <a href="https://mulearn.org" target="_blank" rel="noreferrer" className="text-primary hover:underline font-bold">µLearn</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
