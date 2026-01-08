'use client';

import CategoryNavbar from '../../components/CategoryNavbar';
import CategoryHero from '../../components/CategoryHero';
import CategoryProductSection from '../../components/CategoryProductSection';
import Footer from '../../components/Footer';

const TRADITIONAL_CATEGORIES = [
    { label: 'Kurtas', iconName: 'Shirt' },
    { label: 'Sherwanis', iconName: 'Crown' },
    { label: 'Jackets', iconName: 'Layers' }
];

export default function TraditionalsPage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#FFF7F1' }}>
            <CategoryNavbar />
            <CategoryHero title="TRADITIONALS" />
            <CategoryProductSection categories={TRADITIONAL_CATEGORIES} />
            <Footer />
        </main>
    );
}
