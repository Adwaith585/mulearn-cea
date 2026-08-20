"use client";

import { useState } from 'react';
import { useDocs } from '@/lib/use-docs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Trash2, Plus, Calendar, Edit } from 'lucide-react';

export function DocsManager() {
    const { docs, addDoc, deleteDoc, updateDoc } = useDocs();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [author, setAuthor] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content || !author) return;

        if (editingId) {
            updateDoc(editingId, {
                title,
                content,
                imageUrl: imageUrl || undefined,
                author
            });
        } else {
            addDoc({
                title,
                content,
                imageUrl: imageUrl || undefined,
                author
            });
        }

        // Reset
        setTitle("");
        setContent("");
        setImageUrl("");
        setAuthor("");
        setIsAdding(false);
        setEditingId(null);
    };

    const handleEdit = (doc: any) => {
        setEditingId(doc.id);
        setTitle(doc.title);
        setContent(doc.content);
        setImageUrl(doc.imageUrl || "");
        setAuthor(doc.author);
        setIsAdding(true);
        // smooth scroll to top where form is
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-surface/30 p-6 rounded-2xl border border-border">
                <div>
                    <h2 className="text-2xl font-bold font-heading text-text-primary">Documentation Hub</h2>
                    <p className="text-text-muted">Write activity logs and upload pictures of campus events.</p>
                </div>
                <Button
                    onClick={() => setIsAdding(!isAdding)}
                    className="bg-primary hover:bg-primary/90 text-background"
                >
                    {isAdding ? "Cancel" : <><Plus className="w-4 h-4 mr-2" /> New Document</>}
                </Button>
            </div>

            {isAdding && (
                <Card className="bg-surface/50 border-primary/20 shadow-[0_0_30px_rgba(108,92,231,0.1)]">
                    <CardHeader>
                        <CardTitle>{editingId ? "Edit Document" : "Create New Document"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-text-muted uppercase tracking-wider block">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Campus Hackathon Recap"
                                    className="w-full bg-background border border-border rounded-xl py-3 px-4 text-text-primary focus:outline-none focus:border-primary/50 transition-colors"
                                    required
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-text-muted uppercase tracking-wider block">Author Name</label>
                                    <input
                                        type="text"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        placeholder="e.g. John Doe"
                                        className="w-full bg-background border border-border rounded-xl py-3 px-4 text-text-primary focus:outline-none focus:border-primary/50 transition-colors"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-text-muted uppercase tracking-wider block">Image URL (Optional)</label>
                                    <input
                                        type="url"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        placeholder="https://..."
                                        className="w-full bg-background border border-border rounded-xl py-3 px-4 text-text-primary focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-text-muted uppercase tracking-wider block">Content Body</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Write your article or log here..."
                                    rows={6}
                                    className="w-full bg-background border border-border rounded-xl py-3 px-4 text-text-primary focus:outline-none focus:border-primary/50 transition-colors resize-y"
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-background mt-4">
                                {editingId ? "Save Changes" : "Publish Document"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                {docs.map(doc => (
                    <Card key={doc.id} className="bg-surface/30 border-border flex flex-col h-full overflow-hidden">
                        {doc.imageUrl && (
                            <div className="w-full h-48 bg-background border-b border-border">
                                <img src={doc.imageUrl} alt={doc.title} className="w-full h-full object-cover" />
                            </div>
                        )}
                        <CardHeader className="flex-grow">
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(doc.date).toLocaleDateString()}
                                    </div>
                                    <CardTitle className="text-lg leading-tight mb-2">{doc.title}</CardTitle>
                                    <p className="text-sm font-medium text-text-muted">By {doc.author}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(doc)}
                                        className="p-2 rounded-lg bg-surface hover:bg-black/5 dark:hover:bg-white/10 text-text-muted hover:text-text-primary transition-colors border border-border"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => deleteDoc(doc.id)}
                                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-text-primary transition-colors border border-red-500/20"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-text-muted text-sm line-clamp-3 overflow-hidden">{doc.content}</p>
                        </CardContent>
                    </Card>
                ))}

                {docs.length === 0 && (
                    <div className="col-span-full py-12 text-center text-text-muted border border-dashed border-border rounded-2xl bg-surface/20">
                        <p>No documents found. Start writing your first log!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
