'use client';

import CategoryNavbar from '../../components/CategoryNavbar';
import CategoryHero from '../../components/CategoryHero';
import CategoryProductSection from '../../components/CategoryProductSection';
import Footer from '../../components/Footer';

const PREMIUM_CATEGORIES = [
    { label: 'Suits', iconName: 'Briefcase' },
    { label: 'Tuxedos', iconName: 'Crown' },
    { label: 'Blazers', iconName: 'Shirt' }
];

export default function PremiumPage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#FFF7F1' }}>
            <CategoryNavbar />
            <CategoryHero title="PREMIUM LUXURY" />
            <CategoryProductSection categories={PREMIUM_CATEGORIES} />
            <Footer />
        </main>
    );
}
