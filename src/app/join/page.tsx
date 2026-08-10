import { Metadata } from 'next'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MessageSquare, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Join Us',
}

const faqs = [
    { q: "Is µLearn free to join?", a: "Yes, 100% free. The network is built for students, by students." },
    { q: "Do I need prior coding experience?", a: "Not at all. Learning Circles are designed exactly for this: to take you from zero to building your first project." },
    { q: "How do Karma Points work?", a: "You earn points for completing tasks, finishing courses, or building projects. These points serve as a public, immutable ledger of your skills." },
]

export default function JoinPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-24">
            <section className="text-center max-w-3xl mx-auto space-y-6">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">Join the Network</h1>
                <p className="text-xl text-text-muted leading-relaxed">
                    Ready to build your proof-of-work portfolio? Follow these steps to become an official member of the CEA chapter.
                </p>
            </section>

            {/* Step by Step */}
            <section className="max-w-4xl mx-auto space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="bg-surface/40 hover:border-primary/30 transition-colors">
                        <CardHeader className="flex flex-row items-center gap-4 border-b border-white/5 pb-4">
                            <div className="w-10 h-10 flex-shrink-0 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">1</div>
                            <CardTitle className="text-xl">Create Account</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <p className="text-text-muted leading-relaxed">Register on the official µLearn platform. Make sure to map your college to College of Engineering Adoor (CEA) during onboarding.</p>
                            <a href="https://app.mulearn.org" target="_blank" rel="noreferrer" className="inline-block w-full">
                                <Button variant="outline" className="w-full justify-between px-6 hover:border-primary/50 transition-colors">
                                    app.mulearn.org <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </a>
                        </CardContent>
                    </Card>

                    <Card className="bg-surface/40 hover:border-primary/30 transition-colors">
                        <CardHeader className="flex flex-row items-center gap-4 border-b border-white/5 pb-4">
                            <div className="w-10 h-10 flex-shrink-0 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">2</div>
                            <CardTitle className="text-xl">Join a Learning Circle</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <p className="text-text-muted leading-relaxed">Find peers interested in the same tech stack as you (Web, AI, Cyber, etc.). Only 5-6 members per circle—ensuring intimate, focused learning.</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-surface/40 hover:border-karma/40 transition-colors md:col-start-1 md:col-end-3 border-karma/10">
                        <CardHeader className="flex flex-row items-center gap-4 border-b border-white/5 pb-4">
                            <div className="w-10 h-10 flex-shrink-0 rounded-full bg-karma/20 text-karma flex items-center justify-center font-bold text-lg">3</div>
                            <CardTitle className="text-xl">Start Earning Karma</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <p className="text-text-muted leading-relaxed text-lg">Submit your weekly tasks and proof of work on the platform to earn Karma Points. Watch your rank grow on the campus leaderboard and unlock exclusive opportunities!</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Community CTAs */}
            <section className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[#5865F2]/10 to-surface border border-[#5865F2]/20 hover:border-[#5865F2]/40 transition-colors rounded-3xl p-8 flex flex-col items-center text-center gap-6 shadow-2xl">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 text-[#5865F2] font-bold mb-1 uppercase tracking-wider text-sm bg-[#5865F2]/10 px-3 py-1 rounded-full">
                            <MessageSquare className="w-4 h-4" /> Global Discord
                        </div>
                        <h2 className="text-2xl font-heading font-bold text-white">Statewide Network</h2>
                        <p className="text-text-muted leading-relaxed text-sm">
                            Join the main official µLearn Discord to access the 64,000+ strong state network.
                        </p>
                    </div>
                    <div className="w-full mt-auto">
                        <a href="https://discord.gg/gtech-mulearn-771670169691881483" target="_blank" rel="noreferrer" className="inline-block w-full">
                            <Button size="lg" className="w-full bg-[#5865F2] hover:bg-[#5865F2]/90 text-white border-0 shadow-[0_0_20px_rgba(88,101,242,0.3)] h-12">
                                Join Discord
                            </Button>
                        </a>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-[#25D366]/10 to-surface border border-[#25D366]/20 hover:border-[#25D366]/40 transition-colors rounded-3xl p-8 flex flex-col items-center text-center gap-6 shadow-2xl">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 text-[#25D366] font-bold mb-1 uppercase tracking-wider text-sm bg-[#25D366]/10 px-3 py-1 rounded-full">
                            <MessageSquare className="w-4 h-4" /> Whatsapp
                        </div>
                        <h2 className="text-2xl font-heading font-bold text-white">The Chapter HQ</h2>
                        <p className="text-text-muted leading-relaxed text-sm">
                            This is where everything happens locally: circle coordination, event announcements, and peer support.
                        </p>
                    </div>
                    <div className="w-full mt-auto">
                        <a href="https://chat.whatsapp.com/JOtRONslmpyJyMIYipZEiM" target="_blank" rel="noreferrer" className="inline-block w-full">
                            <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white border-0 shadow-[0_0_20px_rgba(37,211,102,0.3)] h-12">
                                Join WhatsApp
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-3xl mx-auto space-y-8">
                <h2 className="text-3xl font-heading font-bold text-center mb-10">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <Card key={i} className="bg-surface/30 border-white/5">
                            <CardContent className="p-6 md:p-8">
                                <h3 className="font-bold text-lg mb-3 text-white flex items-start gap-3">
                                    <span className="text-primary font-mono opacity-50">Q.</span>
                                    {faq.q}
                                </h3>
                                <p className="text-text-muted leading-relaxed pl-8">{faq.a}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    )
}
