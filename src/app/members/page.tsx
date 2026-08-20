"use client";

import { useState, useEffect, useMemo } from 'react';
import { StatBlock } from '@/components/ui/StatBlock';
import { MemberCard, MemberProps } from '@/components/ui/MemberCard';
import { Search, SlidersHorizontal, Users } from 'lucide-react';
import { SkillChallengesSticker } from '@/components/Icons';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function MembersPage() {
    const { applications } = require('@/lib/use-members').useApplications();
    const [members, setMembers] = useState<MemberProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const domains = useMemo(() => {
        const allDomains = members.flatMap(m => m.domains);
        return ["All", ...Array.from(new Set(allDomains))];
    }, [members]);

    useEffect(() => {
        // Simulate API fetch delay
        const fetchMembers = async () => {
            await new Promise(resolve => setTimeout(resolve, 800));

            // Map the approved applications to MemberProps format
            const dynamicMembers: MemberProps[] = (applications || []).filter((app: any) => app.status === 'approved').map((app: any) => ({
                id: app.id,
                name: app.name,
                role: app.role || "Member",
                domains: app.domains,
                karma: app.karma || 0,
                imageUrl: app.imageUrl,
                isCore: app.isCore || false,
                github: app.github,
                linkedin: app.linkedin,
                instagram: app.instagram
            }));

            setMembers(dynamicMembers);
            setLoading(false);
        };
        fetchMembers();
    }, [applications]);

    const filteredMembers = members.filter(m => {
        const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = activeFilter === "All" || m.domains.includes(activeFilter);
        return matchesSearch && matchesFilter;
    });

    const totalKarma = members.reduce((acc, curr) => acc + curr.karma, 0);
    const topMembers = [...members].sort((a, b) => b.karma - a.karma).slice(0, 5);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16">
            <section className="text-center max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary leading-tight">Meet the Members.</h1>
                <p className="text-xl text-text-muted leading-relaxed">
                    The minds driving the CEA µLearn chapter forward. Search by name, filter by domain, or check out the leaderboard.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <Link href="/members/apply">
                        <Button className="bg-primary hover:bg-primary/90 text-background">Join the Ranks</Button>
                    </Link>
                    <Link href="/members/profile">
                        <Button variant="outline" className="border-border hover:bg-black/5 dark:hover:bg-white/10">My Profile</Button>
                    </Link>
                </div>
            </section>

            {/* Live Stats Row */}
            <section className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
                <StatBlock label="Total Members" value={loading ? "..." : members.length} />
                <StatBlock label="Core Team" value={loading ? "..." : members.filter(m => m.isCore).length} />
                <StatBlock label="Collective Karma" value={loading ? "..." : totalKarma.toLocaleString()} highlight className="col-span-2 md:col-span-1" />
            </section>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-4 gap-8">

                {/* Leaderboard Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="bg-surface/40 hover:border-karma/30 transition-colors sticky top-28">
                        <CardHeader className="border-b border-border pb-4 bg-karma/5 rounded-t-2xl">
                            <CardTitle className="flex items-center gap-2 text-karma text-lg font-heading">
                                <SkillChallengesSticker className="w-8 h-8 drop-shadow-md" /> Top Earners
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-5">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="flex gap-4 items-center animate-pulse">
                                        <div className="w-10 h-10 rounded-full bg-background border border-border"></div>
                                        <div className="space-y-2">
                                            <div className="h-3 bg-surface rounded w-24"></div>
                                            <div className="h-2 bg-surface rounded w-16"></div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                topMembers.map((m, i) => (
                                    <div key={m.id} className="flex items-center gap-3">
                                        <span className={`font-mono text-xs w-4 font-bold ${i < 3 ? 'text-karma' : 'text-text-muted'}`}>{i + 1}.</span>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 border-2 ${i < 3 ? 'border-karma/50 bg-karma/10' : 'border-border bg-background'}`}>
                                            {m.imageUrl ? (
                                                <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="font-heading font-bold text-xs">{m.name.charAt(0)}</span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold truncate text-text-primary">{m.name}</p>
                                            <p className="text-xs text-karma font-mono mt-0.5">{m.karma.toLocaleString()} KP</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Member Grid */}
                <div className="lg:col-span-3 space-y-8">

                    {/* Controls */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-2xl bg-surface/30 border border-border">
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-background border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:border-primary/50 transition-colors placeholder:text-text-muted"
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide py-1">
                            <SlidersHorizontal className="w-4 h-4 text-text-muted flex-shrink-0 md:hidden" />
                            {domains.map(domain => (
                                <button
                                    key={domain}
                                    onClick={() => setActiveFilter(domain)}
                                    className={`flex-shrink-0 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full border transition-all ${activeFilter === domain
                                        ? "bg-primary border-primary text-text-primary shadow-[0_0_15px_rgba(108,92,231,0.3)]"
                                        : "bg-background border-border text-text-muted hover:border-border hover:text-text-primary"
                                        }`}
                                >
                                    {domain}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {loading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="h-[320px] rounded-2xl bg-surface/30 animate-pulse border border-border flex flex-col items-center p-6">
                                    <div className="w-24 h-24 rounded-full bg-background mb-4"></div>
                                    <div className="h-4 w-32 bg-background rounded mb-2"></div>
                                    <div className="h-3 w-20 bg-background rounded mb-4"></div>
                                    <div className="flex gap-2 w-full justify-center mb-6"><div className="h-4 w-12 bg-background rounded-full"></div><div className="h-4 w-12 bg-background rounded-full"></div></div>
                                    <div className="h-6 w-24 bg-background rounded mt-auto"></div>
                                </div>
                            ))
                        ) : filteredMembers.length > 0 ? (
                            filteredMembers.map((member, i) => (
                                <div key={member.id} className="animate-in fade-in zoom-in-95 duration-500" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}>
                                    <MemberCard member={member} />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center text-text-muted border border-dashed border-border rounded-2xl bg-surface/20 flex flex-col items-center justify-center">
                                <Users className="w-12 h-12 mb-4 opacity-20" />
                                <p className="text-lg font-medium text-text-primary mb-1">No members found</p>
                                <p className="text-sm">Try adjusting your filters or search term.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
