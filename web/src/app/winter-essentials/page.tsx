'use client';

import CategoryNavbar from '../../components/CategoryNavbar';
import CategoryHero from '../../components/CategoryHero';
import CategoryProductSection from '../../components/CategoryProductSection';
import Footer from '../../components/Footer';

const WINTER_CATEGORIES = [
    { label: 'Jackets', iconName: 'Layers' },
    { label: 'Sweaters', iconName: 'Shirt' },
    { label: 'Thermals', iconName: 'Grid' }
];

export default function WinterPage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#FFF7F1' }}>
            <CategoryNavbar />
            <CategoryHero title="WINTER ESSENTIALS" />
            <CategoryProductSection categories={WINTER_CATEGORIES} />
            <Footer />
        </main>
    );
}
