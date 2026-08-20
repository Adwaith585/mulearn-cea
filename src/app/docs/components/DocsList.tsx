"use client";

import { useDocs } from '@/lib/use-docs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { FileText, Calendar, User } from 'lucide-react';

export function DocsList() {
    const { docs, refresh } = useDocs();

    if (docs.length === 0) {
        return (
            <div className="py-20 text-center border border-dashed border-border rounded-3xl bg-surface/20 flex flex-col items-center">
                <FileText className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-xl font-heading font-medium text-text-primary mb-2">No documents yet.</p>
                <p className="text-text-muted">Stay tuned for updates from the chapter.</p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {docs.map(doc => (
                <Card key={doc.id} className="bg-surface/30 border-border overflow-hidden transition-all hover:border-primary/30 group">
                    {doc.imageUrl && (
                        <div className="w-full h-64 md:h-96 bg-background">
                            <img src={doc.imageUrl} alt={doc.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                    )}
                    <CardHeader className="p-8 pb-4">
                        <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-primary mb-4">
                            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(doc.date).toLocaleDateString()}</span>
                            <span className="text-text-primary/20">|</span>
                            <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {doc.author}</span>
                        </div>
                        <CardTitle className="text-3xl md:text-4xl font-heading font-bold mb-4">{doc.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                        <div className="prose prose-invert max-w-none text-text-muted text-lg leading-loose whitespace-pre-wrap">
                            {doc.content}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
