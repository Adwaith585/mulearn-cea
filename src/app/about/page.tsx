import { Metadata } from 'next'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Users, Trophy, Sparkles } from 'lucide-react'
import { PeerNetworkSticker, SkillChallengesSticker, ProofOfWorkSticker } from '@/components/Icons'

export const metadata: Metadata = {
    title: 'About',
}

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-24">
            {/* Header */}
            <section className="text-center max-w-3xl mx-auto space-y-6">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">About the Chapter</h1>
                <p className="text-xl text-text-muted leading-relaxed">
                    The official µLearn chapter at College of Engineering Adoor (CEA). A community of builders, learners, and dreamers.
                </p>
            </section>

            {/* Mission & Vision */}
            <section className="bg-surface/30 rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-karma"></div>
                <div className="max-w-4xl mx-auto space-y-6 text-center">
                    <h2 className="text-3xl font-heading font-bold">Mission & Vision</h2>
                    <p className="text-lg text-text-muted leading-relaxed">
                        We believe in learning by doing, prioritizing peer-over-hierarchy, and breaking out of academic echo chambers. Our goal is to transform passive students into active creators with a public portfolio (proof-of-work) to show for their effort.
                    </p>
                </div>
            </section>

            {/* College Info */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-heading font-bold leading-tight">College of Engineering Adoor</h2>
                    <p className="text-lg text-text-muted leading-relaxed">
                        Nestled in the heart of Kerala, CEA has always been a hub of engineering talent. By establishing the µLearn Chapter, we are connecting our campus to a 64,000+ strong network of tech enthusiasts statewide. We bring the industry closer to the classroom.
                    </p>
                </div>
                <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                    <img
                        src="/college-bg.jpg"
                        alt="College of Engineering Adoor"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-80" />
                </div>
            </section>

            {/* What We Do */}
            <section className="space-y-12">
                <div className="text-center">
                    <h2 className="text-3xl font-heading font-bold">What We Do</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="hover:border-primary/50 transition-colors bg-surface/40 pt-4">
                        <CardHeader>
                            <PeerNetworkSticker className="w-16 h-16 mb-4 drop-shadow-md origin-bottom-left transition-transform hover:scale-110" />
                            <CardTitle>Weekly Learning Circles</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-text-muted leading-relaxed">Small peer-led sessions where members gather to learn a specific tech stack together, without traditional teachers.</p>
                        </CardContent>
                    </Card>

                    <Card className="hover:border-karma/50 transition-colors bg-surface/40 pt-4">
                        <CardHeader>
                            <SkillChallengesSticker className="w-16 h-16 mb-4 drop-shadow-md origin-bottom-left transition-transform hover:scale-110" />
                            <CardTitle>Monthly Skill Challenges</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-text-muted leading-relaxed">Time-bound challenges where members build mini-projects and submit them as proof-of-work to earn Karma Points.</p>
                        </CardContent>
                    </Card>

                    <Card className="hover:border-primary/50 transition-colors bg-surface/40 pt-4">
                        <CardHeader>
                            <ProofOfWorkSticker className="w-16 h-16 mb-4 drop-shadow-md origin-bottom-left transition-transform hover:scale-110" />
                            <CardTitle>Quarterly Innovation Sprints</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-text-muted leading-relaxed">Larger, collaborative team efforts to solve a real-world problem or build a more complex system over a weekend.</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Why Join */}
            <section className="space-y-12">
                <div className="text-center">
                    <h2 className="text-3xl font-heading font-bold">Why You Should Join</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-4 p-6 bg-surface/40 rounded-2xl border border-white/5">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-karma/10 text-karma flex items-center justify-center font-bold">1</div>
                        <div>
                            <h3 className="text-lg font-bold mb-2 text-white">Visible Skill Record</h3>
                            <p className="text-sm text-text-muted leading-relaxed">Earn Karma Points by completing tasks. Your points serve as an immutable record of your effort from day one.</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 p-6 bg-surface/40 rounded-2xl border border-white/5">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">2</div>
                        <div>
                            <h3 className="text-lg font-bold mb-2 text-white">Proof-of-Work Portfolio</h3>
                            <p className="text-sm text-text-muted leading-relaxed">Stop relying just on your degree. Build real things and push them to GitHub. Start building a portfolio employers care about.</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 p-6 bg-surface/40 rounded-2xl border border-white/5">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">3</div>
                        <div>
                            <h3 className="text-lg font-bold mb-2 text-white">Peer-led Growth</h3>
                            <p className="text-sm text-text-muted leading-relaxed">Learn alongside friends in Learning Circles. No intimidating professors, just students helping students.</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 p-6 bg-surface/40 rounded-2xl border border-white/5">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-karma/10 text-karma flex items-center justify-center font-bold">4</div>
                        <div>
                            <h3 className="text-lg font-bold mb-2 text-white">Internships & Opportunities</h3>
                            <p className="text-sm text-text-muted leading-relaxed">Top Karma earners get exclusive access to internships, hackathons, and µLearn's Launchpad network.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Faculty Enabler Callout */}
            <section className="bg-gradient-to-br from-surface to-background border border-primary/20 rounded-3xl p-8 max-w-3xl mx-auto text-center md:text-left flex flex-col md:flex-row items-center gap-8 shadow-[0_0_40px_rgba(108,92,231,0.05)]">
                <div className="w-32 h-32 rounded-full flex-shrink-0 overflow-hidden border-4 border-primary/20 relative shadow-xl">
                    <img src="/faculty.jpg" alt="Prof. Reshma M" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Faculty Enabler</h3>
                    <h2 className="text-2xl font-bold font-heading mb-3">Prof. Reshma M</h2>
                    <p className="text-text-muted text-sm leading-relaxed">
                        Guiding the chapter's vision and ensuring smooth operations between the student body and college administration. Prof. Reshma empowers the leadership team to focus on community building.
                    </p>
                </div>
            </section>
        </div>
    )
}
