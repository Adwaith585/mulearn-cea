import { Metadata } from 'next';
import { DocsList } from './components/DocsList';

export const metadata: Metadata = {
    title: 'Documentation',
}

export default function DocsPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16">
            <section className="text-center max-w-3xl mx-auto space-y-6">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">Campus Documentation</h1>
                <p className="text-xl text-text-muted leading-relaxed">
                    Read the latest updates, logs, and activity records from the µLearn CEA Chapter.
                </p>
            </section>

            <section className="max-w-4xl mx-auto">
                <DocsList />
            </section>
        </div>
    );
}
