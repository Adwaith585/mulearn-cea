"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApplications } from '@/lib/use-members';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User, Image as ImageIcon, X, Link, Globe, Camera } from 'lucide-react';

const INTEREST_GROUPS = [
    "Cyber Security", "Game Dev", "Web Development", "Product Management", "Devops", "No Or Low Code",
    "Entrepreneurship", "Ar Vr Mr", "Ui Ux", "Mobile Development", "Data Analytics", "Space", "AI",
    "Comics", "Digital Marketing", "MuV", "Generative AI", "Data Structures and Algorithm", "Blender",
    "Human Resources", "Blockchain", "Data Science", "Project Management", "Quantum Technologies",
    "Strategic Leadership", "Civil", "IOT And Robotics", "Creative Design",
    "Beckn", "Quality Assurance"
];

export default function ApplyPage() {
    const router = useRouter();
    const { addApplication } = useApplications();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        imageUrl: '',
        github: '',
        linkedin: '',
        instagram: '',
        domains: [] as string[],
        karma: 0
    });

    const toggleDomain = (domain: string) => {
        setFormData(prev => {
            if (prev.domains.includes(domain)) {
                return { ...prev, domains: prev.domains.filter(d => d !== domain) };
            }
            if (prev.domains.length >= 3) {
                return prev;
            }
            return { ...prev, domains: [...prev.domains, domain] };
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check size (e.g. max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert("File size exceeds 2MB limit.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate network
        await new Promise(res => setTimeout(res, 800));
        addApplication(formData);
        setIsSubmitting(false);
        setSuccess(true);
    };

    if (success) {
        return (
            <div className="container mx-auto px-4 py-24 max-w-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-karma/20 text-karma rounded-full flex items-center justify-center mx-auto mb-8">
                    <User className="w-10 h-10" />
                </div>
                <h1 className="text-4xl font-heading font-bold text-text-primary">Application Submitted!</h1>
                <p className="text-xl text-text-muted">
                    Your profile has been submitted and is pending admin approval. You will appear on the members board once approved.
                </p>
                <div className="pt-8 flex gap-4 justify-center">
                    <Button onClick={() => router.push('/members')} className="bg-primary hover:bg-primary/90 text-background px-8">
                        View Members
                    </Button>
                    <Button onClick={() => router.push('/members/profile')} variant="outline" className="px-8">
                        View Profile
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-24 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <section className="text-center mb-12 space-y-4">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary">Join the Ranks</h1>
                <p className="text-xl text-text-muted">Create your profile to be featured on the members board.</p>
            </section>

            <form onSubmit={handleSubmit} className="space-y-8">
                <Card className="bg-surface/40 hover:border-border transition-colors">
                    <CardHeader className="border-b border-border bg-black/5 dark:bg-white/10">
                        <CardTitle className="text-xl">Basic Info</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-text-muted uppercase tracking-wider block">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted/50" />
                                    <input
                                        required
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-background border border-border rounded-xl py-3 pl-11 pr-4 text-text-primary focus:outline-none focus:border-primary/50 transition-colors"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-text-muted uppercase tracking-wider block">Profile Image</label>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full border border-border overflow-hidden flex-shrink-0 bg-background flex items-center justify-center">
                                        {formData.imageUrl ? (
                                            <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="w-5 h-5 text-text-muted/50" />
                                        )}
                                    </div>
                                    <div className="relative flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="w-full bg-background border border-border rounded-xl py-2 px-3 text-sm text-text-muted file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-border">
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-text-muted uppercase tracking-wider block">GitHub URL</label>
                                <div className="relative">
                                    <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted/50" />
                                    <input
                                        type="url"
                                        placeholder="github.com/..."
                                        className="w-full bg-background border border-border rounded-xl py-3 pl-11 pr-4 text-text-primary focus:outline-none focus:border-primary/50 transition-colors"
                                        value={formData.github}
                                        onChange={e => setFormData({ ...formData, github: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-text-muted uppercase tracking-wider block">LinkedIn URL</label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted/50" />
                                    <input
                                        type="url"
                                        placeholder="linkedin.com/in/..."
                                        className="w-full bg-background border border-border rounded-xl py-3 pl-11 pr-4 text-text-primary focus:outline-none focus:border-primary/50 transition-colors"
                                        value={formData.linkedin}
                                        onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-text-muted uppercase tracking-wider block">Instagram URL</label>
                                <div className="relative">
                                    <Camera className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted/50" />
                                    <input
                                        type="url"
                                        placeholder="instagram.com/..."
                                        className="w-full bg-background border border-border rounded-xl py-3 pl-11 pr-4 text-text-primary focus:outline-none focus:border-primary/50 transition-colors"
                                        value={formData.instagram}
                                        onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-border space-y-4">
                            <label className="text-sm font-bold text-text-muted uppercase tracking-wider block">Claimed Karma Points (Optional)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="Enter your current karma points..."
                                    className="w-full bg-background border border-border rounded-xl py-3 px-4 text-text-primary focus:outline-none focus:border-karma/50 transition-colors font-mono"
                                    value={formData.karma || ''}
                                    onChange={e => setFormData({ ...formData, karma: parseInt(e.target.value) || 0 })}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted text-sm font-bold font-mono">KP</span>
                            </div>
                            <p className="text-xs text-text-muted">This will be verified and approved by the admins before displaying publicly.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-surface/40 hover:border-primary/30 transition-colors">
                    <CardHeader className="border-b border-border bg-black/5 dark:bg-white/10 flex flex-row items-center justify-between">
                        <CardTitle className="text-xl">Interest Groups (Max 3)</CardTitle>
                        <div className="text-sm font-mono bg-primary/20 text-primary px-3 py-1 rounded-full">{formData.domains.length}/3 Selected</div>
                    </CardHeader>
                    <CardContent className="pt-8">
                        <div className="flex flex-wrap gap-3">
                            {INTEREST_GROUPS.map(group => {
                                const isSelected = formData.domains.includes(group);
                                const isDisabled = !isSelected && formData.domains.length >= 3;
                                return (
                                    <button
                                        key={group}
                                        type="button"
                                        disabled={isDisabled}
                                        onClick={() => toggleDomain(group)}
                                        className={`px-4 py-2 text-sm font-bold rounded-full border transition-all ${isSelected
                                            ? 'bg-primary border-primary text-text-primary shadow-[0_0_15px_rgba(108,92,231,0.3)]'
                                            : isDisabled
                                                ? 'bg-background/50 border-border text-text-muted/30 cursor-not-allowed'
                                                : 'bg-background border-border text-text-muted hover:border-border hover:text-text-primary'
                                            }`}
                                    >
                                        {group} {isSelected && <X className="inline-block ml-1 w-3 h-3" />}
                                    </button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                <div className="text-right">
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting || formData.domains.length === 0}
                        className="bg-primary hover:bg-primary/90 text-background min-w-[200px]"
                    >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
