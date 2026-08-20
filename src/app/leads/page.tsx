"use client";

import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from "framer-motion";
import { MouseEvent, useState } from "react";
import { Mail, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { AnimatedMotif } from "@/components/AnimatedMotif";

type LeadProps = {
    name: string;
    role: string;
    description: string;
    image: string;
    glowColor: string;
    socials: {
        github?: string;
        linkedin?: string;
        mail?: string;
    }
};

const leads: LeadProps[] = [
    {
        name: "Adwaith S A",
        role: "Campus Lead",
        description: "Visionary leader driving the µLearn CEA chapter. Expert in full-stack development, CyberSecurity, Game Development and community building.",
        image: "/leads/adwaithsa.png",
        glowColor: "rgba(108, 92, 231, 0.5)", // Primary
        socials: { github: "https://github.com/Adwaith585", linkedin: "https://linkedin.com/in/adwaith-sa" }
    },
    {
        name: "Abhishek S",
        role: "Co-Lead",
        description: "Community Co-Leader building and growing the µLearn community at our college. Passionate about Technology, AI/ML, Cybersecurity, Project building, and empowering students through collaboration.",
        image: "/leads/abhishek.jpeg",
        glowColor: "rgba(245, 185, 66, 0.5)", // Karma
        socials: { github: "https://github.com/abhishek-007a", linkedin: "https://www.linkedin.com/in/abhishek-sugathan" }
    },
    {
        name: "Deepthi Mohan",
        role: "Tech Lead",
        description: "Hands-on Tech enthusiast and Student leader. Actively involved in Project Development, Hackathons, and Technical Event coordination.",
        image: "/leads/deepthi.jpeg",
        glowColor: "rgba(79, 172, 254, 0.5)", // Blue
        socials: { github: "https://github.com/DeepM05", linkedin: "https://www.linkedin.com/in/deepthi-mohan-dm/" }
    },
    {
        name: "Abhin J Gomez",
        role: "Design Lead",
        description: "Creative master crafting our visual identity. Specializes in UI/UX and breathtaking graphic designs.",
        image: "/leads/abhinjgomez.jpg",
        glowColor: "rgba(255, 154, 158, 0.5)", // Pink
        socials: { github: "https://github.com/Abhin147", linkedin: "https://www.linkedin.com/in/abhin-j-gomez/" }
    },
    {
        name: "Ashwanth A",
        role: "Creative Lead",
        description: "Creative Leader for µLearn community at our college, passionate about technology, AI/ML, and cybersecurity. I focus on empowering students to build impactful projects through collaboration and creative design.",
        image: "/leads/ashwanth.png",
        glowColor: "rgba(161, 140, 209, 0.5)", // Purple
        socials: { github: "https://github.com/ashwanth-a", linkedin: "https://www.linkedin.com/in/ashwanth-a13-/" }
    },
    {
        name: "Adwaith P",
        role: "Media Lead",
        description: "Creative mind behind the media and digital presence of the µLearn CEA chapter. Passionate about cybersecurity and technology, with technical skills in full-stack development, programming, and creative content production.",
        image: "/leads/adwaithp.png",
        glowColor: "rgba(251, 194, 235, 0.5)", // Light Pink
        socials: { github: "https://github.com/AdwaithP-07", linkedin: "https://www.linkedin.com/in/adwaithp-cse/" }
    }
];

function LeadCard({ lead, index, onClick }: { lead: LeadProps, index: number, onClick: () => void }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 * index, type: "spring", bounce: 0.4 }}
            className="group relative max-w-sm w-full mx-auto cursor-pointer"
            onMouseMove={handleMouseMove}
            onClick={onClick}
        >
            {/* Interactive Glow Effect on Hover */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            400px circle at ${mouseX}px ${mouseY}px,
                            ${lead.glowColor},
                            transparent 40%
                        )
                    `,
                }}
            />

            <div className="relative flex flex-col h-full bg-background border border-border rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2 z-10 m-[1px]">
                <div
                    className="absolute -top-12 -right-12 w-48 h-48 blur-[80px] opacity-30 transition-opacity duration-500 group-hover:opacity-70 pointer-events-none"
                    style={{ backgroundColor: lead.glowColor.replace('0.5', '1') }}
                />

                <div
                    className="relative w-36 h-36 mx-auto mb-6 rounded-full overflow-hidden border-4 border-surface group-hover:border-border transition-colors z-10 shadow-2xl"
                >
                    <div
                        className="absolute inset-0 z-0 w-full h-full animate-pulse opacity-50 blur-xl"
                        style={{ backgroundColor: lead.glowColor }}
                    ></div>
                    <img
                        src={lead.image}
                        alt={lead.name}
                        className="relative z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 bg-surface"
                    />
                </div>

                <div className="text-center flex-1 flex flex-col z-10 items-center">
                    <h3 className="text-2xl font-bold font-heading text-text-primary mb-2 group-hover:text-primary transition-colors">{lead.name}</h3>
                    <p className="inline-block px-4 py-1.5 bg-surface border border-border shadow-inner rounded-full text-xs font-mono font-bold tracking-wider text-karma mb-5 uppercase hover:border-border transition-colors">
                        {lead.role}
                    </p>
                    <p className="text-text-muted text-sm leading-relaxed mb-8 flex-1 w-full relative">
                        <span className="absolute -left-2 -top-2 text-3xl font-heading text-text-primary/5">&quot;</span>
                        {lead.description}
                        <span className="absolute -right-2 -bottom-4 text-3xl font-heading text-text-primary/5">&quot;</span>
                    </p>

                    <div className="flex items-center justify-center gap-4 mt-auto">
                        {lead.socials.github && (
                            <div className="p-2.5 bg-surface hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors text-text-primary/50 hover:text-text-primary border border-border hover:border-border">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                            </div>
                        )}
                        {lead.socials.linkedin && (
                            <div className="p-2.5 bg-surface hover:bg-[#0A66C2]/20 rounded-full transition-colors text-text-primary/50 hover:text-[#0A66C2] border border-border hover:border-[#0A66C2]/50">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                            </div>
                        )}
                        {lead.socials.mail && (
                            <div className="p-2.5 bg-surface hover:bg-karma/20 rounded-full transition-colors text-text-primary/50 hover:text-karma border border-border hover:border-karma/50">
                                <Mail className="w-5 h-5" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function LeadsPage() {
    const [selectedLead, setSelectedLead] = useState<LeadProps | null>(null);

    return (
        <div className="relative min-h-screen pt-32 pb-24 overflow-hidden">
            <AnimatedMotif />

            {/* Ambient Background Blur */}
            <div className="absolute top-0 inset-x-0 h-96 bg-primary/5 blur-[150px] pointer-events-none" />

            {/* Header */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl mx-auto space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-surface border border-border text-xs font-bold uppercase tracking-widest text-primary mb-2 shadow-xl shadow-primary/10">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#6C5CE7]" />
                        The Core Team
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tighter text-text-primary drop-shadow-lg">
                        Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-[#F5B942] dark:to-karma">Leads</span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl mx-auto">
                        The visionary students working behind the scenes to make the CEA µLearn chapter an absolute powerhouse.
                    </p>
                </motion.div>
            </div>

            {/* Leads Grid Showcase */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 pb-16">
                    {leads.map((lead, index) => (
                        <LeadCard key={lead.name} lead={lead} index={index} onClick={() => setSelectedLead(lead)} />
                    ))}
                </div>

                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="flex justify-center mt-12"
                >
                    <Link href="/members" className="group flex items-center justify-center gap-3 px-8 py-4 bg-surface/50 border border-border rounded-full text-text-primary hover:bg-black/5 dark:hover:bg-white/10 transition-all text-sm font-bold backdrop-blur-md shadow-2xl hover:shadow-[0_0_30px_rgba(0,0,0,0.05)]">
                        <ArrowRight className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                        Back to All Members
                    </Link>
                </motion.div>
            </div>

            {/* Expended Card Modal with "Wow" Swirl Animation */}
            <AnimatePresence>
                {selectedLead && (
                    <motion.div
                        key="modal-overlay"
                        initial={{ opacity: 0, backdropFilter: "blur(0px)", pointerEvents: "auto" }}
                        animate={{ opacity: 1, backdropFilter: "blur(16px)", pointerEvents: "auto" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)", pointerEvents: "none" }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 cursor-pointer"
                        onClick={() => setSelectedLead(null)}
                    >
                        <motion.div
                            key="modal-card"
                            initial={{
                                rotateZ: 720,
                                rotateY: 180,
                                rotateX: 90,
                                scale: 0.1,
                                opacity: 0,
                            }}
                            animate={{
                                rotateZ: 0,
                                rotateY: 0,
                                rotateX: 0,
                                scale: 1,
                                opacity: 1,
                            }}
                            exit={{
                                rotateZ: -720,
                                rotateY: -180,
                                rotateX: -90,
                                scale: 0.1,
                                opacity: 0,
                            }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 90,
                                mass: 1
                            }}
                            className="relative w-full max-w-lg bg-surface border border-border rounded-[2.5rem] p-10 overflow-hidden shadow-[0_0_150px_rgba(0,0,0,0.8)] cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Ambient Light inside modal */}
                            <motion.div
                                initial={{ opacity: 0, rotate: -360 }}
                                animate={{ opacity: 0.5, rotate: 0 }}
                                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                                className="absolute -top-32 -right-32 w-96 h-96 blur-[120px] pointer-events-none"
                                style={{ backgroundColor: selectedLead.glowColor.replace('0.5', '1') }}
                            />

                            <button
                                onClick={() => setSelectedLead(null)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-text-muted hover:text-text-primary transition-colors z-20 border border-border hover:rotate-90 duration-300"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div
                                className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-border z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                            >
                                <img
                                    src={selectedLead.image}
                                    alt={selectedLead.name}
                                    className="w-full h-full object-cover bg-background"
                                />
                            </div>

                            <div className="text-center z-10 relative">
                                <h3 className="text-4xl font-bold font-heading text-text-primary mb-3 drop-shadow-md">
                                    {selectedLead.name}
                                </h3>

                                <p className="inline-block px-5 py-2 bg-background border border-border shadow-inner rounded-full text-sm font-mono font-bold tracking-wider text-karma mb-6 uppercase">
                                    {selectedLead.role}
                                </p>

                                <p className="text-text-muted text-lg leading-relaxed mb-10 w-full relative">
                                    <span className="absolute -left-4 -top-4 text-4xl font-heading text-text-primary/5">&quot;</span>
                                    {selectedLead.description}
                                    <span className="absolute -right-4 -bottom-6 text-4xl font-heading text-text-primary/5">&quot;</span>
                                </p>

                                <div className="flex items-center justify-center gap-6">
                                    {selectedLead.socials.github && (
                                        <Link href={selectedLead.socials.github} className="p-4 bg-background hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors text-text-primary/60 hover:text-text-primary border border-border shadow-lg hover:border-border hover:-translate-y-1 transform duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                                        </Link>
                                    )}
                                    {selectedLead.socials.linkedin && (
                                        <Link href={selectedLead.socials.linkedin} className="p-4 bg-background hover:bg-[#0A66C2]/20 rounded-full transition-colors text-text-primary/60 hover:text-[#0A66C2] border border-border shadow-lg hover:border-[#0A66C2]/50 hover:-translate-y-1 transform duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                                        </Link>
                                    )}
                                    {selectedLead.socials.mail && (
                                        <Link href={selectedLead.socials.mail} className="p-4 bg-background hover:bg-karma/20 rounded-full transition-colors text-text-primary/60 hover:text-karma border border-border shadow-lg hover:border-karma/50 hover:-translate-y-1 transform duration-300">
                                            <Mail className="w-6 h-6" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
