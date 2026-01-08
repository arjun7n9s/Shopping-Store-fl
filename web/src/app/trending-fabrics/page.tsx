'use client';

import CategoryNavbar from '../../components/CategoryNavbar';
import CategoryHero from '../../components/CategoryHero';
import CategoryProductSection from '../../components/CategoryProductSection';
import Footer from '../../components/Footer';

const FABRIC_CATEGORIES = [
    { label: 'Cotton', iconName: 'Layers' },
    { label: 'Linen', iconName: 'Grid' },
    { label: 'Silk', iconName: 'Sparkles' }
];

export default function FabricsPage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#FFF7F1' }}>
            <CategoryNavbar />
            <CategoryHero title="TRENDING FABRICS" />
            <CategoryProductSection categories={FABRIC_CATEGORIES} />
            <Footer />
        </main>
    );
}
