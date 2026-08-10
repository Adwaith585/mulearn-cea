"use client";

import { useProjects } from '@/lib/use-projects';
import { AnimatedMotif } from '@/components/AnimatedMotif';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';
import { Globe, Code2 } from 'lucide-react';

export default function ProjectsPage() {
    const { projects } = useProjects();

    if (projects.length === 0) {
        return (
            <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
                <AnimatedMotif />
                <div className="relative z-10 text-center max-w-2xl mx-auto px-4 space-y-8 animate-in fade-in zoom-in-95 duration-500">
                    <span className="inline-block text-karma text-sm font-bold tracking-widest uppercase bg-karma/10 px-4 py-2 rounded-full border border-karma/20 shadow-[0_0_15px_rgba(245,185,66,0.1)]">Coming Soon</span>
                    <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight">Projects</h1>
                    <p className="text-xl text-text-muted leading-relaxed">
                        The proof-of-work portfolio from CEA's learning circles is being compiled. Join the community to start building alongside us!
                    </p>
                    <div className="flex justify-center gap-4 pt-4">
                        <Link href="/join">
                            <Button size="lg">Start Building</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-24 max-w-7xl space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <section className="text-center space-y-4 max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code2 className="w-8 h-8" />
                </div>
                <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight">Student Projects</h1>
                <p className="text-xl text-text-muted leading-relaxed">
                    Explore the open-source projects, hacks, and tools built by students at College of Engineering Adoor.
                </p>
            </section>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <Card key={project.id} className="bg-surface/30 hover:border-primary/30 transition-all hover:shadow-[0_0_30px_rgba(108,92,231,0.15)] group">
                        {project.imageUrl && (
                            <div className="w-full h-48 overflow-hidden rounded-t-xl relative border-b border-white/5">
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute bottom-4 left-4 z-20">
                                    <h3 className="text-2xl font-bold font-heading text-white">{project.title}</h3>
                                    <p className="text-text-muted/80 text-sm">By {project.author}</p>
                                </div>
                            </div>
                        )}
                        <CardContent className="p-6 space-y-6">
                            {!project.imageUrl && (
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-bold font-heading text-white">{project.title}</h3>
                                    <p className="text-text-muted text-sm">By {project.author}</p>
                                </div>
                            )}

                            <p className="text-text-muted line-clamp-3 leading-relaxed text-sm">{project.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="text-xs px-2.5 py-1 bg-background border border-white/10 rounded-md text-text-muted font-mono">{tech}</span>
                                ))}
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-white/5">
                                {project.repoUrl && (
                                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-bold text-white hover:text-primary transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                                        Source Code
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-bold text-white hover:text-karma transition-colors">
                                        <Globe className="w-4 h-4 mr-2" /> Live Demo
                                    </a>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
