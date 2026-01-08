'use client';

import CategoryNavbar from '@/components/CategoryNavbar';
import Footer from '@/components/Footer';

interface InfoPageProps {
    params: { slug: string };
}

export default function InfoPage({ params }: InfoPageProps) {
    // This is a dynamic route placeholder, but for now we might trigger it manually or just make a generic page
    // Actually, creating a generic page.tsx in /info might be better if we want to catch all, but let's make a specific 'terms' page for now as example or generic
    return (
        <main style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh' }}>
            <CategoryNavbar />
            <div style={{ paddingTop: '140px', paddingBottom: '4rem', maxWidth: '800px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
                <h1 style={{ fontFamily: 'var(--font-anton)', fontSize: '3rem', color: 'var(--color-text-primary)', textTransform: 'uppercase' }}>INFORMATION</h1>
                <div style={{ marginTop: '2rem', fontFamily: 'var(--font-roboto-mono)', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                    <p>Sample content for policy pages.</p>
                </div>
            </div>
            <Footer />
        </main>
    )
}
