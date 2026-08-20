import Link from "next/link";
import { AnimatedMotif } from "@/components/AnimatedMotif";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { WebAppSticker, AIMLSticker, CyberSticker, IoTCloudSticker, SkillChallengesSticker, PeerNetworkSticker, ProofOfWorkSticker } from "@/components/Icons";

export default function Home() {
  return (
    <div className="relative flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <AnimatedMotif />
        {/* Glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/10 border border-border text-sm font-medium text-text-muted mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#6C5CE7]" />
              Officially live at College of Engineering Adoor
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading tracking-tighter text-text-primary mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
              Learn by doing.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-orange-500 dark:to-karma">Proof over hierarchy.</span>
            </h1>

            <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both leading-relaxed">
              Join CEA's premier peer-to-peer tech community. Build real-world projects, collaborate with like-minded peers, and accelerate your career in technology.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
              <Link href="/join" className="w-full sm:w-auto">
                <Button size="lg" className="w-full group bg-primary hover:bg-primary/90 text-background shadow-[0_0_20px_rgba(108,92,231,0.3)] transition-all">
                  Join µLearn <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/leads" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full border-border hover:bg-black/5 dark:hover:bg-white/10 hover:text-text-primary transition-colors bg-black/5 dark:bg-white/10">
                  Meet the Leads
                </Button>
              </Link>
              <Link href="/members" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full border-border hover:bg-black/5 dark:hover:bg-white/10 hover:text-text-primary transition-colors">
                  Members
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Focus/Domains - Bento Style */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-700 fill-mode-both text-center md:text-left pt-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 px-2">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-2">Our Tech Domains</h2>
            <p className="text-text-muted">Master the future through hands-on learning.</p>
          </div>
          <Link href="/events" className="text-primary hover:text-primary/80 font-medium flex items-center gap-2 group text-sm">
            Explore Events <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border bg-gradient-to-br from-surface to-surface/50 hover:border-primary/50 transition-all hover:-translate-y-1">
            <CardHeader>
              <WebAppSticker className="w-14 h-14 mb-4" />
              <CardTitle className="text-xl">Web & App</CardTitle>
            </CardHeader>
            <CardContent className="text-text-muted text-sm">
              Full-stack development, modern frameworks, and responsive design.
            </CardContent>
          </Card>

          <Card className="border-border bg-gradient-to-br from-surface to-surface/50 hover:border-karma/50 transition-all hover:-translate-y-1">
            <CardHeader>
              <AIMLSticker className="w-14 h-14 mb-4" />
              <CardTitle className="text-xl">AI & ML</CardTitle>
            </CardHeader>
            <CardContent className="text-text-muted text-sm">
              Machine learning, neural networks, and generative AI.
            </CardContent>
          </Card>

          <Card className="border-border bg-gradient-to-br from-surface to-surface/50 hover:border-blue-500/50 transition-all hover:-translate-y-1">
            <CardHeader>
              <CyberSticker className="w-14 h-14 mb-4" />
              <CardTitle className="text-xl">Cybersecurity</CardTitle>
            </CardHeader>
            <CardContent className="text-text-muted text-sm">
              Ethical hacking, network security, and cryptography.
            </CardContent>
          </Card>

          <Card className="border-border bg-gradient-to-br from-surface to-surface/50 hover:border-pink-500/50 transition-all hover:-translate-y-1">
            <CardHeader>
              <IoTCloudSticker className="w-14 h-14 mb-4" />
              <CardTitle className="text-xl">IoT & Cloud</CardTitle>
            </CardHeader>
            <CardContent className="text-text-muted text-sm">
              Hardware integration, AWS, and cloud-native architectures.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Join Us - Features */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-karma/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20 mb-2">
            <Sparkles className="w-3 h-3" /> The µLearn Advantage
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-text-primary">Why Join Our Community?</h2>
          <p className="text-text-muted leading-relaxed text-lg">A community driven by skill challenges, innovation sprints, and real proof of work.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative z-10">
          <Link href="/events" className="block group">
            <Card className="h-full border-border hover:border-primary/50 transition-colors group-hover:shadow-[0_0_30px_rgba(108,92,231,0.1)] bg-surface/50">
              <CardHeader>
                <div className="mb-4 group-hover:scale-110 transition-transform group-hover:-translate-y-2 origin-bottom-left">
                  <SkillChallengesSticker className="w-[72px] h-[72px] drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]" />
                </div>
                <CardTitle>Skill Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-muted leading-relaxed">Participate in monthly hackathons and coding sprints to test your abilities and win exclusive swags.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/members" className="block group">
            <Card className="h-full border-border hover:border-primary/50 transition-colors group-hover:shadow-[0_0_30px_rgba(108,92,231,0.1)] bg-surface/50">
              <CardHeader>
                <div className="mb-4 group-hover:scale-110 transition-transform group-hover:-translate-y-2 origin-bottom-left">
                  <PeerNetworkSticker className="w-[72px] h-[72px] drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]" />
                </div>
                <CardTitle>Peer Networking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-muted leading-relaxed">Connect with top student developers in CEA. Build your foundational network before you even graduate.</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/projects" className="block group">
            <Card className="h-full border-border hover:border-karma/50 transition-colors group-hover:shadow-[0_0_30px_rgba(245,185,66,0.1)] bg-surface/50">
              <CardHeader>
                <div className="mb-4 group-hover:scale-110 transition-transform group-hover:-translate-y-2 origin-bottom-left">
                  <ProofOfWorkSticker className="w-[72px] h-[72px] drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]" />
                </div>
                <CardTitle>Proof of Work</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-muted leading-relaxed">Stop relying on just certificates. Build real-world projects that recruiters actually care about.</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 my-8">
        <div className="rounded-[2.5rem] border border-border bg-surface p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden backdrop-blur-xl shadow-2xl">
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-primary/40 rounded-full blur-[80px] z-10 pointer-events-none" />

          <div className="absolute inset-0 z-0 pointer-events-none">
            <img src="/college-bg.jpg" alt="College of Engineering Adoor" className="w-full h-full object-cover opacity-30 mix-blend-luminosity hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-primary/20" />
          </div>

          <div className="relative z-10 max-w-2xl text-center md:text-left space-y-4">
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-text-primary leading-tight">Ready to level up your tech journey?</h3>
            <p className="text-text-muted text-lg">Join dozens of students already building the future. Get your karma points rolling and showcase your real skills.</p>
          </div>

          <div className="relative z-10 w-full md:w-auto shrink-0 mt-4 md:mt-0">
            <Link href="/join" className="block">
              <Button size="lg" className="w-full md:w-auto bg-primary text-white hover:bg-primary/90 group text-base px-8 py-7 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.1)] font-bold">
                Start Building Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
