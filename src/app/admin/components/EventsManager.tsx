"use client";

import { useState } from 'react';
import { useEvents } from '@/lib/use-events';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar, X, Image as ImageIcon, Link as LinkIcon, Plus } from 'lucide-react';

export function EventsManager() {
    const { events, addEvent, deleteEvent } = useEvents();
    const [isAdding, setIsAdding] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        imageUrl: "",
        linkUrl: "",
        status: "upcoming" as const
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addEvent(formData);
        setIsAdding(false);
        setFormData({ title: "", description: "", date: "", location: "", imageUrl: "", linkUrl: "", status: "upcoming" });
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold font-heading text-text-primary flex items-center gap-2">
                    Manage Events <span className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full">{events.length}</span>
                </h2>
                <Button onClick={() => setIsAdding(!isAdding)} className="bg-primary text-background">
                    {isAdding ? "Cancel" : <><Plus className="w-4 h-4 mr-2" /> Add Event</>}
                </Button>
            </div>

            {isAdding && (
                <Card className="bg-surface/40 border-primary/30">
                    <CardHeader className="border-b border-border pb-4">
                        <CardTitle className="text-xl text-primary">New Event</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-text-muted">Event Title</label>
                                    <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-background border border-border rounded-xl py-2 px-3 text-text-primary" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-text-muted">Date & Time</label>
                                    <input required type="text" placeholder="e.g. Oct 24, 10:00 AM" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full bg-background border border-border rounded-xl py-2 px-3 text-text-primary" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-text-muted">Location</label>
                                    <input required type="text" placeholder="e.g. College Seminar Hall" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="w-full bg-background border border-border rounded-xl py-2 px-3 text-text-primary" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-text-muted">Status</label>
                                    <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as any })} className="w-full bg-background border border-border rounded-xl py-2 px-3 text-text-primary">
                                        <option value="upcoming">Upcoming</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm text-text-muted">Description</label>
                                    <textarea required rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-background border border-border rounded-xl py-2 px-3 text-text-primary" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-text-muted">Event Image</label>
                                    <div className="flex gap-4">
                                        {formData.imageUrl && <img src={formData.imageUrl} className="w-10 h-10 rounded object-cover" />}
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full bg-background border border-border rounded-xl py-1 px-3 text-sm text-text-muted" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-text-muted">Link URL (Optional)</label>
                                    <input type="url" placeholder="https://..." value={formData.linkUrl} onChange={e => setFormData({ ...formData, linkUrl: e.target.value })} className="w-full bg-background border border-border rounded-xl py-2 px-3 text-text-primary" />
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-primary text-background">Save Event</Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                    <Card key={event.id} className="bg-surface/30">
                        {event.imageUrl && <img src={event.imageUrl} alt={event.title} className="w-full h-32 object-cover rounded-t-xl" />}
                        <CardContent className="p-4">
                            <h3 className="font-bold text-lg text-text-primary mb-2">{event.title}</h3>
                            <p className="text-sm text-text-muted mb-4 line-clamp-2">{event.description}</p>
                            <div className="flex justify-between items-center text-xs text-text-muted mb-4 font-mono bg-background p-2 rounded-lg border border-border">
                                <span>{event.date}</span>
                                <span className="uppercase text-primary">{event.status}</span>
                            </div>
                            <Button variant="outline" size="sm" className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10" onClick={() => deleteEvent(event.id)}>
                                <X className="w-4 h-4 mr-2" /> Delete
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {events.length === 0 && !isAdding && (
                <div className="text-center py-12 text-text-muted border border-dashed border-border rounded-xl bg-surface/20">
                    No events listed. Click Add Event to create one.
                </div>
            )}
        </div>
    );
}
