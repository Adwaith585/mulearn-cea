"use client";

import { useState } from 'react';
import { useApplications } from '@/lib/use-members';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Check, X, ShieldAlert, User, Link, Globe, Camera, Lock, Users, Calendar, LayoutDashboard, FileText } from 'lucide-react';
import { verifyAdminPassword } from './actions';
import { EventsManager } from './components/EventsManager';
import { ProjectsManager } from './components/ProjectsManager';
import { DocsManager } from './components/DocsManager';

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isChecking, setIsChecking] = useState(false);
    const [activeTab, setActiveTab] = useState<'members' | 'events' | 'projects' | 'docs'>('members');

    const { applications, approveApplication, rejectApplication, updateApplication, approveKarma } = useApplications();
    const pendingApps = applications.filter(app => app.status === 'pending');
    const approvedApps = applications.filter(app => app.status === 'approved');

    if (!isAuthenticated) {
        return (
            <div className="container mx-auto px-4 py-32 max-w-md animate-in fade-in zoom-in-95 duration-500">
                <Card className="bg-surface/40 hover:border-primary/30 transition-colors">
                    <CardHeader className="text-center border-b border-border pb-6">
                        <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-2xl font-bold font-heading">Admin Login</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            setIsChecking(true);
                            setError("");
                            const isValid = await verifyAdminPassword(password);
                            setIsChecking(false);
                            if (isValid) {
                                setIsAuthenticated(true);
                            } else {
                                setError("Invalid admin password");
                            }
                        }} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-text-muted uppercase tracking-wider block">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter admin password..."
                                    className="w-full bg-background border border-border rounded-xl py-3 px-4 text-text-primary focus:outline-none focus:border-primary/50 transition-colors"
                                />
                                {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
                            </div>
                            <Button type="submit" disabled={isChecking} className="w-full bg-primary hover:bg-primary/90 text-background mt-4">
                                {isChecking ? "Checking..." : "Login"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-24 max-w-6xl space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <section className="text-center space-y-6">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto">
                    <ShieldAlert className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-2">Admin Dashboard</h1>
                    <p className="text-xl text-text-muted">Manage website content and applications.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 p-1 bg-surface/30 rounded-xl border border-border mx-auto max-w-fit">
                    <button onClick={() => setActiveTab('members')} className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center transition-all ${activeTab === 'members' ? 'bg-primary text-background shadow-lg shadow-primary/20' : 'text-text-muted hover:text-text-primary'}`}>
                        <Users className="w-4 h-4 mr-2" /> Members
                    </button>
                    <button onClick={() => setActiveTab('events')} className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center transition-all ${activeTab === 'events' ? 'bg-primary text-background shadow-lg shadow-primary/20' : 'text-text-muted hover:text-text-primary'}`}>
                        <Calendar className="w-4 h-4 mr-2" /> Events
                    </button>
                    <button onClick={() => setActiveTab('projects')} className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center transition-all ${activeTab === 'projects' ? 'bg-primary text-background shadow-lg shadow-primary/20' : 'text-text-muted hover:text-text-primary'}`}>
                        <LayoutDashboard className="w-4 h-4 mr-2" /> Projects
                    </button>
                    <button onClick={() => setActiveTab('docs')} className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center transition-all ${activeTab === 'docs' ? 'bg-primary text-background shadow-lg shadow-primary/20' : 'text-text-muted hover:text-text-primary'}`}>
                        <FileText className="w-4 h-4 mr-2" /> Docs
                    </button>
                </div>
            </section>

            {activeTab === 'members' && (
                <div className="space-y-12 animate-in fade-in zoom-in-95 duration-300">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold font-heading text-text-primary flex items-center gap-2">
                            Pending Approvals <span className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full">{pendingApps.length}</span>
                        </h2>
                        {pendingApps.length === 0 ? (
                            <Card className="bg-surface/20 border-dashed border-border text-center py-12">
                                <CardContent>
                                    <p className="text-text-muted">No pending applications at the moment.</p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-6">
                                {pendingApps.map(app => (
                                    <Card key={app.id} className="bg-surface/40 hover:border-primary/30 transition-colors">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="w-12 h-12 rounded-full border border-border overflow-hidden flex-shrink-0 bg-background text-text-muted flex items-center justify-center font-bold text-lg font-heading">
                                                    {app.imageUrl ? <img src={app.imageUrl} alt={app.name} className="w-full h-full object-cover" /> : app.name.charAt(0)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-text-primary text-lg truncate">{app.name}</h3>
                                                    <div className="flex gap-2 mt-2 text-text-muted">
                                                        {app.github && <Link className="w-4 h-4 cursor-pointer hover:text-text-primary" />}
                                                        {app.linkedin && <Globe className="w-4 h-4 cursor-pointer hover:text-text-primary" />}
                                                        {app.instagram && <Camera className="w-4 h-4 cursor-pointer hover:text-text-primary" />}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-6">
                                                <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Interest Groups</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {app.domains.map(d => (
                                                        <span key={d} className="text-xs px-2 py-1 bg-background border border-border rounded-md text-text-muted">{d}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-400" onClick={() => rejectApplication(app.id)}>
                                                    <X className="w-4 h-4 mr-2" /> Reject
                                                </Button>
                                                <Button className="bg-karma hover:bg-karma/90 text-text-primary" onClick={() => approveApplication(app.id)}>
                                                    <Check className="w-4 h-4 mr-2" /> Approve {app.pendingKarma ? `(${app.pendingKarma} KP)` : ''}
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-16 border-t border-border pt-12">
                        <h2 className="text-2xl font-bold font-heading text-text-primary flex items-center gap-2 mb-6">
                            Approved Members <span className="text-sm bg-karma/20 text-karma px-3 py-1 rounded-full">{approvedApps.length}</span>
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {approvedApps.map(app => (
                                <Card key={app.id} className="bg-surface/30 hover:border-karma/30 transition-colors border-border">
                                    <CardContent className="p-5 flex flex-col h-full">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full overflow-hidden bg-background border border-border flex items-center justify-center text-xs font-bold shrink-0">
                                                    {app.imageUrl ? <img src={app.imageUrl} alt={app.name} className="w-full h-full object-cover" /> : app.name.charAt(0)}
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="font-bold text-text-primary text-base truncate">{app.name}</h3>
                                                    <p className="text-xs text-text-muted mt-0.5 truncate">{app.domains.join(', ')}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to remove this member?')) rejectApplication(app.id);
                                                }}
                                                className="p-2 text-text-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors shrink-0"
                                                title="Delete Member"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                                            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Karma</span>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateApplication(app.id, { karma: Math.max(0, (app.karma || 0) - 100) })}
                                                    className="w-7 h-7 rounded-md bg-background border border-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-border transition-colors"
                                                >-</button>
                                                <input
                                                    type="number"
                                                    value={app.karma || 0}
                                                    onChange={(e) => updateApplication(app.id, { karma: parseInt(e.target.value) || 0 })}
                                                    className="w-16 bg-transparent text-karma font-mono text-center text-sm font-bold focus:outline-none focus:border-b focus:border-karma/50"
                                                />
                                                <button
                                                    onClick={() => updateApplication(app.id, { karma: (app.karma || 0) + 100 })}
                                                    className="w-7 h-7 rounded-md bg-background border border-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-border transition-colors"
                                                >+</button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            )
            }

            {activeTab === 'events' && <div className="animate-in fade-in zoom-in-95 duration-300"><EventsManager /></div>}

            {activeTab === 'projects' && <div className="animate-in fade-in zoom-in-95 duration-300"><ProjectsManager /></div>}

            {activeTab === 'docs' && (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                    <DocsManager />
                </div>
            )}

        </div >
    );
}
