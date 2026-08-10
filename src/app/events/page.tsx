"use client";

import { useEvents } from '@/lib/use-events';
import { AnimatedMotif } from '@/components/AnimatedMotif';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

export default function EventsPage() {
    const { events } = useEvents();

    if (events.length === 0) {
        return (
            <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
                <AnimatedMotif />
                <div className="relative z-10 text-center max-w-2xl mx-auto px-4 space-y-8 animate-in fade-in zoom-in-95 duration-500">
                    <span className="inline-block text-karma text-sm font-bold tracking-widest uppercase bg-karma/10 px-4 py-2 rounded-full border border-karma/20 shadow-[0_0_15px_rgba(245,185,66,0.1)]">Coming Soon</span>
                    <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight">Events</h1>
                    <p className="text-xl text-text-muted leading-relaxed">
                        We're planning skill challenges, innovation sprints, and weekly circles. Jump into Discord to get notified when our first event drops!
                    </p>
                    <div className="flex justify-center gap-4 pt-4">
                        <Link href="/join">
                            <Button size="lg">Join Discord</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-24 max-w-6xl space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <section className="text-center space-y-4 max-w-2xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight">Events</h1>
                <p className="text-xl text-text-muted leading-relaxed">
                    Join our upcoming meetups, workshops, and build sprints.
                </p>
            </section>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                    <Card key={event.id} className="bg-surface/40 hover:border-karma/30 transition-all hover:shadow-[0_0_30px_rgba(245,185,66,0.1)] hover:-translate-y-1 hover:bg-surface/80">
                        {event.imageUrl && (
                            <div className="w-full h-48 overflow-hidden rounded-t-xl">
                                <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                            </div>
                        )}
                        <CardContent className="p-6 space-y-4">
                            <div className="flex justify-between items-start gap-4">
                                <h3 className="text-2xl font-bold font-heading text-white">{event.title}</h3>
                                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded text-background ${event.status === 'upcoming' ? 'bg-primary' :
                                        event.status === 'ongoing' ? 'bg-karma' : 'bg-text-muted'
                                    }`}>
                                    {event.status}
                                </span>
                            </div>

                            <p className="text-text-muted line-clamp-3 leading-relaxed">{event.description}</p>

                            <div className="space-y-2 pt-4 border-t border-white/5 font-mono text-sm">
                                <div className="flex items-center text-text-muted">
                                    <Calendar className="w-4 h-4 mr-3 text-primary" /> {event.date}
                                </div>
                                <div className="flex items-center text-text-muted">
                                    <MapPin className="w-4 h-4 mr-3 text-karma" /> {event.location}
                                </div>
                            </div>

                            {event.linkUrl && (
                                <div className="pt-4">
                                    <a href={event.linkUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-bold text-primary hover:text-white transition-colors">
                                        View Details <ExternalLink className="w-4 h-4 ml-1" />
                                    </a>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
