"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApplications, Application } from '@/lib/use-members';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { X, Check } from 'lucide-react';

const INTEREST_GROUPS = [
    "Cyber Security", "Game Dev", "Web Development", "Product Management", "Devops", "No Or Low Code",
    "Entrepreneurship", "Ar Vr Mr", "Ui Ux", "Mobile Development", "Data Analytics", "Space", "AI",
    "Comics", "Digital Marketing", "MuV", "Generative AI", "Data Structures and Algorithm", "Blender",
    "Human Resources", "Blockchain", "Data Science", "Project Management", "Quantum Technologies",
    "Strategic Leadership", "Civil", "Internet Of Things (IOT) And Robotics", "Creative Design",
    "Beckn", "Quality Assurance"
];

export default function ProfilePage() {
    const router = useRouter();
    const { applications, updateApplication, refresh } = useApplications();
    const [user, setUser] = useState<Application | null>(null);
    const [editingDomains, setEditingDomains] = useState<string[]>([]);
    const [editingKarma, setEditingKarma] = useState<number>(0);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('mulearn_current_user_id');
        if (userId) {
            const foundUser = applications.find(app => app.id === userId);
            if (foundUser) {
                setUser(foundUser);
                setEditingDomains(foundUser.domains);
                setEditingKarma(foundUser.pendingKarma !== undefined ? foundUser.pendingKarma : foundUser.karma);
            }
        }
    }, [applications]);

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <h1 className="text-3xl font-heading font-bold text-white mb-4">Profile Not Found</h1>
                <p className="text-text-muted mb-8">You need to apply first to have a profile.</p>
                <Button onClick={() => router.push('/members/apply')}>Apply Now</Button>
            </div>
        );
    }

    const toggleDomain = (domain: string) => {
        setEditingDomains(prev => {
            if (prev.includes(domain)) {
                return prev.filter(d => d !== domain);
            }
            if (prev.length >= 3) {
                return prev;
            }
            return [...prev, domain];
        });
    };

    const handleSave = () => {
        setIsSaving(true);
        updateApplication(user.id, {
            domains: editingDomains,
            pendingKarma: editingKarma !== user.karma ? editingKarma : undefined
        });
        setTimeout(() => {
            setIsSaving(false);
            refresh();
        }, 500);
    };

    const hasChanges = JSON.stringify(editingDomains.sort()) !== JSON.stringify(user.domains.sort()) || editingKarma !== (user.pendingKarma !== undefined ? user.pendingKarma : user.karma);

    return (
        <div className="container mx-auto px-4 py-24 max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <section className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left mb-8">
                <div className="w-24 h-24 rounded-full border-2 border-primary/50 bg-surface/50 overflow-hidden flex-shrink-0">
                    {user.imageUrl ? (
                        <img src={user.imageUrl} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="w-full h-full flex items-center justify-center font-heading text-2xl font-bold">{user.name.charAt(0)}</span>
                    )}
                </div>
                <div>
                    <h1 className="text-4xl font-heading font-bold text-white">{user.name}</h1>
                    <p className="text-lg text-text-muted capitalize">Status: <span className={user.status === 'approved' ? 'text-karma' : 'text-yellow-500'}>{user.status}</span></p>
                </div>
            </section>

            <Card className="bg-surface/40 hover:border-primary/30 transition-colors">
                <CardHeader className="border-b border-white/5 bg-white/5 flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-xl">My Interest Groups</CardTitle>
                        <p className="text-sm text-text-muted mt-1">You can change these at any time without admin approval (Max 3).</p>
                    </div>
                    <div className="text-sm font-mono bg-primary/20 text-primary px-3 py-1 rounded-full">{editingDomains.length}/3 Selected</div>
                </CardHeader>
                <CardContent className="pt-8">
                    <div className="flex flex-wrap gap-3 mb-8">
                        {INTEREST_GROUPS.map(group => {
                            const isSelected = editingDomains.includes(group);
                            const isDisabled = !isSelected && editingDomains.length >= 3;
                            return (
                                <button
                                    key={group}
                                    type="button"
                                    disabled={isDisabled}
                                    onClick={() => toggleDomain(group)}
                                    className={`px-4 py-2 text-sm font-bold rounded-full border transition-all ${isSelected
                                        ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(108,92,231,0.3)]'
                                        : isDisabled
                                            ? 'bg-background/50 border-white/5 text-text-muted/30 cursor-not-allowed'
                                            : 'bg-background border-white/10 text-text-muted hover:border-white/30 hover:text-white'
                                        }`}
                                >
                                    {group} {isSelected && <X className="inline-block ml-1 w-3 h-3" />}
                                </button>
                            );
                        })}
                    </div>

                    <div className="pt-6 border-t border-white/5 space-y-4 mb-8">
                        <label className="text-sm font-bold text-text-muted uppercase tracking-wider block">Update Karma Points</label>
                        <div className="relative">
                            <input
                                type="number"
                                min="0"
                                placeholder="Enter your current karma points..."
                                className="w-full bg-background border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-karma/50 transition-colors font-mono"
                                value={editingKarma || ''}
                                onChange={e => setEditingKarma(parseInt(e.target.value) || 0)}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted text-sm font-bold font-mono">KP</span>
                        </div>
                        {user.pendingKarma !== undefined && user.pendingKarma !== user.karma && (
                            <p className="text-xs text-yellow-500">Your requested karma update ({user.pendingKarma} KP) is pending admin approval.</p>
                        )}
                        {!user.pendingKarma && (
                            <p className="text-xs text-text-muted">Awaiting karma updates will require admin verification.</p>
                        )}
                    </div>

                    <div className="border-t border-white/5 pt-6 flex justify-end">
                        <Button
                            onClick={handleSave}
                            disabled={!hasChanges || isSaving || editingDomains.length === 0}
                            className="bg-primary hover:bg-primary/90 text-white min-w-[150px]"
                        >
                            {isSaving ? "Saving..." : <><Check className="w-4 h-4 mr-2" /> Save Changes</>}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
