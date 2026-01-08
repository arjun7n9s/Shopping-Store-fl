'use client';

import CategoryNavbar from '@/components/CategoryNavbar';
import Footer from '@/components/Footer';

export default function SearchPage() {
    return (
        <main style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh' }}>
            <CategoryNavbar />
            <div style={{ paddingTop: '140px', paddingBottom: '4rem', maxWidth: '1400px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
                <h1 style={{ fontFamily: 'var(--font-anton)', fontSize: '3rem', color: 'var(--color-text-primary)' }}>SEARCH RESULTS</h1>
                <div style={{ marginTop: '2rem' }}>
                    <p style={{ fontFamily: 'var(--font-roboto-mono)', color: 'var(--color-text-secondary)' }}>Show results here...</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
