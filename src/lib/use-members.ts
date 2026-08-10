// use-members.ts
import { useState, useEffect } from 'react';

export type ApplicationFields = {
    name: string;
    imageUrl: string;
    github: string;
    linkedin: string;
    instagram: string;
    domains: string[]; // max 3
    karma?: number;
};

export type Application = ApplicationFields & {
    id: string;
    status: "pending" | "approved";
    karma: number;
    pendingKarma?: number;
};

const STORAGE_KEY = 'mulearn_applications';

export function getApplications(): Application[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveApplications(apps: Application[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}

export function useApplications() {
    const [applications, setApplications] = useState<Application[]>([]);

    // We want a way to re-fetch easily or listen to changes across tabs
    const fetchApps = () => setApplications(getApplications());

    useEffect(() => {
        fetchApps();
        // Listen for storage events (if changed in other tabs)
        window.addEventListener('storage', fetchApps);
        return () => window.removeEventListener('storage', fetchApps);
    }, []);

    const addApplication = (appData: ApplicationFields) => {
        const apps = getApplications();
        // Ensure not overriding existing if they're applying again maybe we should check github. For now, generate new ID.
        const newApp: Application = {
            ...appData,
            id: 'app_' + Date.now().toString(),
            status: "pending",
            karma: 0,
            pendingKarma: appData.karma || 0
        };
        const updated = [...apps, newApp];
        saveApplications(updated);
        setApplications(updated);
        // Also simulate logging in this user as the current user
        localStorage.setItem('mulearn_current_user_id', newApp.id);
        return newApp;
    };

    const approveApplication = (id: string) => {
        const apps = getApplications();
        const updated = apps.map(app =>
            app.id === id
                ? { ...app, status: "approved" as const, karma: app.pendingKarma !== undefined ? app.pendingKarma : app.karma, pendingKarma: undefined }
                : app
        );
        saveApplications(updated);
        setApplications(updated);
    };

    const approveKarma = (id: string) => {
        const apps = getApplications();
        const updated = apps.map(app =>
            app.id === id
                ? { ...app, karma: app.pendingKarma !== undefined ? app.pendingKarma : app.karma, pendingKarma: undefined }
                : app
        );
        saveApplications(updated);
        setApplications(updated);
    };

    const rejectApplication = (id: string) => {
        const apps = getApplications();
        const updated = apps.filter(app => app.id !== id);
        saveApplications(updated);
        setApplications(updated);
    };

    const updateApplication = (id: string, updates: Partial<Application>) => {
        const apps = getApplications();
        const updated = apps.map(app => app.id === id ? { ...app, ...updates } : app);
        saveApplications(updated);
        setApplications(updated);
    }

    return {
        applications,
        addApplication,
        approveApplication,
        rejectApplication,
        updateApplication,
        approveKarma,
        refresh: fetchApps
    };
}
