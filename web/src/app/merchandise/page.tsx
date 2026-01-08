'use client';

import CategoryNavbar from '../../components/CategoryNavbar';
import CategoryHero from '../../components/CategoryHero';
import CategoryProductSection from '../../components/CategoryProductSection';
import Footer from '../../components/Footer';

const MERCH_CATEGORIES = [
    { label: 'Marvel', iconName: 'Star' },
    { label: 'Anime', iconName: 'Flame' },
    { label: 'Bands', iconName: 'Sparkles' }
];

export default function MerchandisePage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#FFF7F1' }}>
            <CategoryNavbar />
            <CategoryHero title="MERCHANDISE" />
            <CategoryProductSection categories={MERCH_CATEGORIES} />
            <Footer />
        </main>
    );
}
