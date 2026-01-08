'use client';

import CategoryNavbar from '@/components/CategoryNavbar';
import Footer from '@/components/Footer';

export default function WishlistPage() {
    return (
        <main style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh' }}>
            <CategoryNavbar />
            <div style={{ paddingTop: '140px', paddingBottom: '4rem', maxWidth: '1400px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
                <h1 style={{ fontFamily: 'var(--font-anton)', fontSize: '3rem', color: 'var(--color-text-primary)' }}>WISHLIST</h1>
                <p style={{ fontFamily: 'var(--font-roboto-mono)', color: 'var(--color-text-secondary)', marginTop: '2rem' }}>
                    Your wishlist is empty.
                </p>
                <div style={{ marginTop: '2rem' }}>
                    <a href="/" style={{ textDecoration: 'underline', color: 'var(--color-text-primary)', fontFamily: 'var(--font-roboto-mono)' }}>Explore Collections</a>
                </div>
            </div>
            <Footer />
        </main>
    );
}
