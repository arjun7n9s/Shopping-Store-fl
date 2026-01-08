'use client';

import CategoryNavbar from '@/components/CategoryNavbar';
import Footer from '@/components/Footer';

export default function TrackOrderPage() {
    return (
        <main style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh' }}>
            <CategoryNavbar />
            <div style={{ paddingTop: '140px', paddingBottom: '4rem', maxWidth: '800px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
                <h1 style={{ fontFamily: 'var(--font-anton)', fontSize: '3rem', color: 'var(--color-text-primary)' }}>TRACK ORDER</h1>
                <div style={{ marginTop: '3rem' }}>
                    <p style={{ fontFamily: 'var(--font-roboto-mono)', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                        Enter your order ID to track your package.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <input
                            type="text"
                            placeholder="Order ID (e.g., #12345)"
                            style={{
                                padding: '1rem',
                                border: '1px solid var(--color-border)',
                                backgroundColor: 'transparent',
                                flex: 1,
                                fontFamily: 'var(--font-roboto-mono)'
                            }}
                        />
                        <button style={{
                            padding: '1rem 2rem',
                            backgroundColor: 'var(--color-text-primary)',
                            color: 'var(--color-base)',
                            fontFamily: 'var(--font-roboto-mono)',
                            fontWeight: 600,
                            border: 'none',
                            cursor: 'pointer'
                        }}>TRACK</button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
