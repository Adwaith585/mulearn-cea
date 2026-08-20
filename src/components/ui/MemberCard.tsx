import * as React from "react"
import { cn } from "@/lib/utils"

const Github = ({ size = 24 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
)
const Linkedin = ({ size = 24 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
)
const Instagram = ({ size = 24 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
)
export interface MemberProps {
    id: string
    name: string
    role: string
    domains: string[]
    karma: number
    imageUrl: string
    github?: string
    linkedin?: string
    instagram?: string
    isCore?: boolean
}

export function MemberCard({ member, className, onClick }: { member: MemberProps, className?: string, onClick?: () => void }) {
    // Simple calculation for karma progress ring (max ~5000 for visual full circle)
    const strokeLength = 289
    const progress = Math.min((member.karma / 5000) * strokeLength, strokeLength)
    const offset = strokeLength - progress

    return (
        <div
            onClick={onClick}
            className={cn(
                "group relative flex flex-col items-center p-6 rounded-2xl border bg-surface/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 cursor-pointer overflow-hidden",
                member.isCore ? "border-primary/40 shadow-[0_0_20px_rgba(108,92,231,0.15)]" : "border-border",
                className
            )}
        >
            {/* Circle Progress / Avatar Ring Background */}
            <div className="relative w-24 h-24 mb-4">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="48" cy="48" r="46" fill="transparent" stroke="var(--color-background)" strokeWidth="2" />
                    <circle
                        cx="48" cy="48" r="46"
                        fill="transparent"
                        stroke="var(--color-karma)"
                        strokeLinecap="round"
                        strokeWidth="3"
                        strokeDasharray={strokeLength}
                        strokeDashoffset={offset}
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                <div className="absolute inset-1 rounded-full overflow-hidden border-4 border-background bg-surface flex items-center justify-center">
                    {member.imageUrl ? (
                        <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="font-heading font-bold text-2xl text-text-muted">{member.name.charAt(0)}</span>
                    )}
                </div>
            </div>

            <h3 className="text-lg font-bold text-text-primary text-center mb-1">{member.name}</h3>
            <p className="text-sm font-semibold text-primary mb-3 text-center">{member.role}</p>

            <div className="flex flex-wrap gap-1.5 justify-center mb-5">
                {member.domains.slice(0, 2).map((domain) => (
                    <span key={domain} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-sm bg-black/5 dark:bg-white/10 text-text-muted">
                        {domain}
                    </span>
                ))}
                {member.domains.length > 2 && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-sm bg-black/5 dark:bg-white/10 text-text-muted">
                        +{member.domains.length - 2}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-1.5 mt-auto pt-4 border-t border-border w-full justify-center">
                <span className="font-mono text-karma font-bold text-xl">{member.karma.toLocaleString()}</span>
                <span className="text-[10px] text-text-muted uppercase tracking-widest font-semibold mt-0.5">KP</span>
            </div>

            {/* Hover Socials Overlay */}
            <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-5 z-10">
                {member.github && (
                    <a href={member.github} target="_blank" rel="noreferrer" className="text-text-primary hover:text-black dark:hover:text-white transition-colors p-3 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 rounded-full" onClick={(e) => e.stopPropagation()}>
                        <Github size={28} />
                    </a>
                )}
                {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-text-primary hover:text-[#0077b5] transition-colors p-3 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 rounded-full" onClick={(e) => e.stopPropagation()}>
                        <Linkedin size={28} />
                    </a>
                )}
                {member.instagram && (
                    <a href={member.instagram} target="_blank" rel="noreferrer" className="text-text-primary hover:text-[#E1306C] transition-colors p-3 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 rounded-full" onClick={(e) => e.stopPropagation()}>
                        <Instagram size={28} />
                    </a>
                )}
            </div>
        </div>
    )
}
