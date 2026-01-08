'use client';

import CategoryNavbar from '@/components/CategoryNavbar';
import Footer from '@/components/Footer';

export default function ReturnsPage() {
    return (
        <main style={{ backgroundColor: 'var(--color-base)', minHeight: '100vh' }}>
            <CategoryNavbar />
            <div style={{ paddingTop: '140px', paddingBottom: '4rem', maxWidth: '800px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
                <h1 style={{ fontFamily: 'var(--font-anton)', fontSize: '3rem', color: 'var(--color-text-primary)' }}>RETURNS & REFUNDS</h1>
                <div style={{ marginTop: '2rem', fontFamily: 'var(--font-roboto-mono)', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                    <p>
                        We offer a 30-day return policy for all unused items in their original packaging.
                        To initiate a return, please contact our support team or use the self-service portal in your account.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
