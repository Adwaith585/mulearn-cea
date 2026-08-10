import { useState, useEffect } from 'react';

export interface DocPost {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    date: string;
    author: string;
}

const STORAGE_KEY = 'mulearn_docs';

const INITIAL_DOCS: DocPost[] = [
    {
        id: '1',
        title: 'Launch of µLearn CEA Chapter',
        content: 'We officially kicked off the µLearn chapter at College of Engineering Adoor today! Over 100 students joined our orientation session to learn about the power of peer networking, karma points, and proof-of-work. This is just the beginning.',
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
        date: new Date('2026-08-01T10:00:00Z').toISOString(),
        author: 'Adwaith S A'
    }
];

export function useDocs() {
    const [docs, setDocs] = useState<DocPost[]>([]);

    const fetchDocs = () => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    setDocs(JSON.parse(stored));
                } catch (e) {
                    console.error("Failed to parse docs", e);
                    setDocs(INITIAL_DOCS);
                }
            } else {
                setDocs(INITIAL_DOCS);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DOCS));
            }
        }
    };

    useEffect(() => {
        fetchDocs();
        const handler = () => fetchDocs();
        window.addEventListener('docs-updated', handler);
        return () => window.removeEventListener('docs-updated', handler);
    }, []);

    const addDoc = (doc: Omit<DocPost, 'id' | 'date'>) => {
        const newDoc: DocPost = {
            ...doc,
            id: Math.random().toString(36).substr(2, 9),
            date: new Date().toISOString()
        };
        const updated = [newDoc, ...docs];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setDocs(updated);
        window.dispatchEvent(new Event('docs-updated'));
    };

    const deleteDoc = (id: string) => {
        const updated = docs.filter(d => d.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setDocs(updated);
        window.dispatchEvent(new Event('docs-updated'));
    };

    return { docs, addDoc, deleteDoc, refresh: fetchDocs };
}
