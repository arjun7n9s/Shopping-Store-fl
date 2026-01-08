'use client';

import CategoryNavbar from '../../components/CategoryNavbar';
import CategoryHero from '../../components/CategoryHero';
import CategoryProductSection from '../../components/CategoryProductSection';
import Footer from '../../components/Footer';

const CASUAL_CATEGORIES = [
    { label: 'T-Shirts', iconName: 'Shirt' },
    { label: 'Jeans', iconName: 'Layers' },
    { label: 'Polos', iconName: 'Shirt' },
    { label: 'Shorts', iconName: 'Grid' }
];

export default function CasualWearPage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#FFF7F1' }}>
            <CategoryNavbar />
            <CategoryHero title="CASUAL WEAR" />
            <CategoryProductSection categories={CASUAL_CATEGORIES} />
            <Footer />
        </main>
    );
}
