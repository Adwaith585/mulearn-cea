import { useState, useEffect, useCallback } from 'react';

export type ProjectFields = {
    title: string;
    description: string;
    repoUrl: string;
    liveUrl?: string;
    imageUrl: string;
    techStack: string[];
    author: string;
};

export type Project = ProjectFields & {
    id: string;
};

const STORAGE_KEY = 'mulearn_projects';

export function getProjects(): Project[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveProjects(projects: Project[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);

    const fetchProjects = useCallback(() => {
        setProjects(getProjects());
    }, []);

    useEffect(() => {
        fetchProjects();
        window.addEventListener('storage', fetchProjects);
        return () => window.removeEventListener('storage', fetchProjects);
    }, [fetchProjects]);

    const addProject = (projectData: ProjectFields) => {
        const projectsList = getProjects();
        const newProject: Project = {
            ...projectData,
            id: 'proj_' + Date.now().toString(),
        };
        const updated = [...projectsList, newProject];
        saveProjects(updated);
        setProjects(updated);
        window.dispatchEvent(new window.Event('storage'));
        return newProject;
    };

    const deleteProject = (id: string) => {
        const projectsList = getProjects();
        const updated = projectsList.filter(proj => proj.id !== id);
        saveProjects(updated);
        setProjects(updated);
        window.dispatchEvent(new window.Event('storage'));
    };

    return {
        projects,
        addProject,
        deleteProject,
        refresh: fetchProjects
    };
}
