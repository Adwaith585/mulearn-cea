import * as React from "react"
import { cn } from "@/lib/utils"

interface StatBlockProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string
    value: string | number
    highlight?: boolean
}

export function StatBlock({ label, value, highlight, className, ...props }: StatBlockProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center p-6 border border-white/5 rounded-2xl bg-surface/40 backdrop-blur-sm", className)} {...props}>
            <span className={cn(
                "text-4xl md:text-5xl font-bold font-mono tracking-tight mb-2",
                highlight ? "text-karma drop-shadow-[0_0_15px_rgba(245,185,66,0.25)]" : "text-primary"
            )}>
                {value}
            </span>
            <span className="text-sm md:text-base font-semibold text-text-muted uppercase tracking-wider text-center">
                {label}
            </span>
        </div>
    )
}
