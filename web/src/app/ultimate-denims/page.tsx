'use client';

import CategoryNavbar from '../../components/CategoryNavbar';
import CategoryHero from '../../components/CategoryHero';
import CategoryProductSection from '../../components/CategoryProductSection';
import Footer from '../../components/Footer';

const DENIM_CATEGORIES = [
    { label: 'Skinny', iconName: 'Layers' },
    { label: 'Slim Fit', iconName: 'Grid' },
    { label: 'Ripped', iconName: 'Sparkles' }
];

export default function DenimsPage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#FFF7F1' }}>
            <CategoryNavbar />
            <CategoryHero title="ULTIMATE DENIMS" />
            <CategoryProductSection categories={DENIM_CATEGORIES} />
            <Footer />
        </main>
    );
}
