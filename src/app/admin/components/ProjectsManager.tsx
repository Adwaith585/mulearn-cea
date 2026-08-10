"use client";

import { useState } from 'react';
import { useProjects } from '@/lib/use-projects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LayoutDashboard, X, Plus } from 'lucide-react';

export function ProjectsManager() {
    const { projects, addProject, deleteProject } = useProjects();
    const [isAdding, setIsAdding] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        repoUrl: "",
        liveUrl: "",
        imageUrl: "",
        techStack: [] as string[],
        author: ""
    });

    const [techInput, setTechInput] = useState("");

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

    const addTech = () => {
        if (techInput.trim()) {
            setFormData(prev => ({ ...prev, techStack: [...prev.techStack, techInput.trim()] }));
            setTechInput("");
        }
    };

    const removeTech = (i: number) => {
        setFormData(prev => ({ ...prev, techStack: prev.techStack.filter((_, index) => index !== i) }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addProject(formData);
        setIsAdding(false);
        setFormData({ title: "", description: "", repoUrl: "", liveUrl: "", imageUrl: "", techStack: [], author: "" });
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
                    Manage Projects <span className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full">{projects.length}</span>
                </h2>
                <Button onClick={() => setIsAdding(!isAdding)} className="bg-primary text-white">
                    {isAdding ? "Cancel" : <><Plus className="w-4 h-4 mr-2" /> Add Project</>}
                </Button>
            </div>

            {isAdding && (
                <Card className="bg-surface/40 border-primary/30">
                    <CardHeader className="border-b border-white/5 pb-4">
                        <CardTitle className="text-xl text-primary">New Project</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-text-muted">Project Name</label>
                                    <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-background border border-white/10 rounded-xl py-2 px-3 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-text-muted">Author / Team</label>
                                    <input required type="text" value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} className="w-full bg-background border border-white/10 rounded-xl py-2 px-3 text-white" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm text-text-muted">Description</label>
                                    <textarea required rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-background border border-white/10 rounded-xl py-2 px-3 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-text-muted">Repository URL</label>
                                    <input required type="url" value={formData.repoUrl} onChange={e => setFormData({ ...formData, repoUrl: e.target.value })} className="w-full bg-background border border-white/10 rounded-xl py-2 px-3 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-text-muted">Live Demo URL</label>
                                    <input type="url" value={formData.liveUrl} onChange={e => setFormData({ ...formData, liveUrl: e.target.value })} className="w-full bg-background border border-white/10 rounded-xl py-2 px-3 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-text-muted">Hero Image</label>
                                    <div className="flex gap-4">
                                        {formData.imageUrl && <img src={formData.imageUrl} className="w-10 h-10 rounded object-cover" />}
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full bg-background border border-white/10 rounded-xl py-1 px-3 text-sm text-text-muted" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-text-muted">Tech Stack (press Add)</label>
                                    <div className="flex gap-2">
                                        <input type="text" placeholder="React, Node, etc." value={techInput} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }} onChange={e => setTechInput(e.target.value)} className="flex-1 bg-background border border-white/10 rounded-xl py-2 px-3 text-white" />
                                        <Button type="button" variant="outline" onClick={addTech}>Add</Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.techStack.map((tech, i) => (
                                            <span key={i} className="text-xs px-2 py-1 bg-background border border-white/10 rounded-md text-text-muted flex items-center">
                                                {tech} <X className="w-3 h-3 ml-1 cursor-pointer hover:text-white" onClick={() => removeTech(i)} />
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-primary text-white" disabled={formData.techStack.length === 0}>Save Project</Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                    <Card key={project.id} className="bg-surface/30">
                        {project.imageUrl && <img src={project.imageUrl} alt={project.title} className="w-full h-32 object-cover rounded-t-xl" />}
                        <CardContent className="p-4">
                            <h3 className="font-bold text-lg text-white">{project.title}</h3>
                            <p className="text-xs text-primary mb-2">By {project.author}</p>
                            <p className="text-sm text-text-muted mb-4 line-clamp-2">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="text-[10px] px-2 py-0.5 bg-background border border-white/5 rounded text-text-muted uppercase font-mono">{tech}</span>
                                ))}
                            </div>
                            <Button variant="outline" size="sm" className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10" onClick={() => deleteProject(project.id)}>
                                <X className="w-4 h-4 mr-2" /> Delete
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {projects.length === 0 && !isAdding && (
                <div className="text-center py-12 text-text-muted border border-dashed border-white/10 rounded-xl bg-surface/20">
                    No projects listed. Click Add Project to create one.
                </div>
            )}
        </div>
    );
}
