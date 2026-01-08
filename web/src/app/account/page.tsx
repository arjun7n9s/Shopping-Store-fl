'use client';

import CategoryNavbar from '@/components/CategoryNavbar';
import Footer from '@/components/Footer';

export default function AccountPage() {
    return (
        <main style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh' }}>
            <CategoryNavbar />
            <div style={{ paddingTop: '140px', paddingBottom: '4rem', maxWidth: '1400px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
                <h1 style={{ fontFamily: 'var(--font-anton)', fontSize: '3rem', color: 'var(--color-text-primary)' }}>MY ACCOUNT</h1>
                <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem', flexDirection: 'column' }}>
                    <div style={{ padding: '2rem', border: '1px solid var(--color-border)', borderRadius: '4px' }}>
                        <h2 style={{ fontFamily: 'var(--font-roboto-mono)', fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>Login / Register</h2>
                        <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-roboto-mono)', marginBottom: '1.5rem' }}>Please log in to verify your identity.</p>
                        <button style={{
                            padding: '1rem 3rem',
                            backgroundColor: 'var(--color-text-primary)',
                            color: 'var(--color-base)',
                            fontFamily: 'var(--font-roboto-mono)',
                            fontWeight: 600,
                            borderRadius: '4px'
                        }}>LOGIN</button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
