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
    isCore?: boolean;
    role?: string;
};

const STORAGE_KEY = 'mulearn_applications';

const defaultCoreMembers: Application[] = [
    { id: "1", name: "Adwaith S A", role: "Campus Lead", domains: ["Game Dev", "Cyber Security", "Web Development"], karma: 2790, imageUrl: "/leads/adwaithsa.png", isCore: true, status: "approved", github: "https://github.com/Adwaith585", linkedin: "https://linkedin.com/in/adwaith-sa", instagram: "" },
    { id: "2", name: "Abhishek S", role: "Co-Lead", domains: ["Cyber Security", "Generative AI", "Devops"], karma: 1627, imageUrl: "/leads/abhishek.jpeg", isCore: true, status: "approved", github: "https://github.com/abhishek-007a", linkedin: "https://www.linkedin.com/in/abhishek-sugathan", instagram: "" },
    { id: "3", name: "Deepthi Mohan", role: "Tech Lead", domains: ["Data Analytics", "Generative AI"], karma: 1698, imageUrl: "/leads/deepthi.jpeg", isCore: true, status: "approved", github: "https://github.com/DeepM05", linkedin: "https://www.linkedin.com/in/deepthi-mohan-dm/", instagram: "" },
    { id: "4", name: "Abhin J Gomez", role: "Design Lead", domains: ["IOT And Robotics"], karma: 2204, imageUrl: "/leads/abhinjgomez.jpg", isCore: true, status: "approved", github: "https://github.com/Abhin147", linkedin: "https://www.linkedin.com/in/abhin-j-gomez/", instagram: "" },
    { id: "5", name: "Ashwanth A", role: "Creative Lead", domains: ["Cyber Security", "Generative AI"], karma: 1426, imageUrl: "/leads/ashwanth.png", isCore: true, status: "approved", github: "https://github.com/ashwanth-a", linkedin: "https://www.linkedin.com/in/ashwanth-a13-/", instagram: "" },
    { id: "6", name: "Adwaith P", role: "Media Lead", domains: ["Cyber Security", "Digital Marketing", "Entrepreneurship"], karma: 1677, imageUrl: "/leads/adwaithp.png", isCore: true, status: "approved", github: "https://github.com/AdwaithP-07", linkedin: "https://www.linkedin.com/in/adwaithp-cse/", instagram: "" }
];

export function getApplications(): Application[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCoreMembers));
        return defaultCoreMembers;
    }
    const parsed = JSON.parse(data) as Application[];

    // Merge core members if they are totally missing (e.g., someone just added new users but deleted core)
    // We strictly merge based on strict ID
    let hasChanges = false;
    const existingIds = new Set(parsed.map(p => p.id));
    for (const core of defaultCoreMembers) {
        if (!existingIds.has(core.id)) {
            parsed.unshift(core);
            hasChanges = true;
        }
    }
    if (hasChanges) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
    return parsed;
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
