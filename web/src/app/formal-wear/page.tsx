'use client';

import CategoryNavbar from '../../components/CategoryNavbar';
import CategoryHero from '../../components/CategoryHero';
import CategoryProductSection from '../../components/CategoryProductSection';
import Footer from '../../components/Footer';

const FORMAL_CATEGORIES = [
    { label: 'Suits', iconName: 'Briefcase' },
    { label: 'Blazers', iconName: 'Shirt' },
    { label: 'Trousers', iconName: 'Layers' },
    { label: 'Shirts', iconName: 'Shirt' }
];

export default function FormalWearPage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#FFF7F1' }}>
            <CategoryNavbar />
            <CategoryHero title="FORMAL WEAR" />
            <CategoryProductSection categories={FORMAL_CATEGORIES} />
            <Footer />
        </main>
    );
}
