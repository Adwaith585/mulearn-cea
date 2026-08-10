import { useState, useEffect, useCallback } from 'react';

export type EventFields = {
    title: string;
    description: string;
    date: string;
    location: string;
    imageUrl: string;
    linkUrl?: string;
    status: 'upcoming' | 'ongoing' | 'completed';
};

export type Event = EventFields & {
    id: string;
};

const STORAGE_KEY = 'mulearn_events';

export function getEvents(): Event[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveEvents(events: Event[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export function useEvents() {
    const [events, setEvents] = useState<Event[]>([]);

    const fetchEvents = useCallback(() => {
        setEvents(getEvents());
    }, []);

    useEffect(() => {
        fetchEvents();
        window.addEventListener('storage', fetchEvents);
        return () => window.removeEventListener('storage', fetchEvents);
    }, [fetchEvents]);

    const addEvent = (eventData: EventFields) => {
        const eventsList = getEvents();
        const newEvent: Event = {
            ...eventData,
            id: 'evt_' + Date.now().toString(),
        };
        const updated = [...eventsList, newEvent];
        saveEvents(updated);
        setEvents(updated);
        // Fire custom event for same-tab updates
        window.dispatchEvent(new window.Event('storage'));
        return newEvent;
    };

    const deleteEvent = (id: string) => {
        const eventsList = getEvents();
        const updated = eventsList.filter(evt => evt.id !== id);
        saveEvents(updated);
        setEvents(updated);
        window.dispatchEvent(new window.Event('storage'));
    };

    return {
        events,
        addEvent,
        deleteEvent,
        refresh: fetchEvents
    };
}
