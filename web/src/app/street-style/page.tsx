'use client';

import CategoryNavbar from '../../components/CategoryNavbar'; // Default "Men's" style links fit Street Style well
import CategoryHero from '../../components/CategoryHero';
import CategoryProductSection from '../../components/CategoryProductSection';
import Footer from '../../components/Footer';

const STREET_CATEGORIES = [
    { label: 'Hoodies', iconName: 'Layers' },
    { label: 'Oversized', iconName: 'Shirt' },
    { label: 'Joggers', iconName: 'Grid' },
    { label: 'Caps', iconName: 'Circle' } // Using Circle for Hats/Caps
];

export default function StreetStylePage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#FFF7F1' }}>
            <CategoryNavbar />
            <CategoryHero title="STREET STYLE" />
            <CategoryProductSection categories={STREET_CATEGORIES} />
            <Footer />
        </main>
    );
}
