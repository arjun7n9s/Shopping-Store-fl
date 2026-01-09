'use client';

import CategoryNavbar from '../../components/CategoryNavbar';
import CategoryHero from '../../components/CategoryHero';
import CategoryProductSection from '../../components/CategoryProductSection';
import Footer from '../../components/Footer';

// Define Women's Categories (Strictly Clothing)
const WOMEN_CATEGORIES = [
    { label: 'DRESSES', iconName: 'Shirt' },
    { label: 'TOPS', iconName: 'Shirt' },
    { label: 'BOTTOMS', iconName: 'Layers' },
    { label: 'JACKETS', iconName: 'Package' },
    { label: 'CO-ORDS', iconName: 'Crown' },
    { label: 'ACTIVEWEAR', iconName: 'Flame' },
];

const WOMEN_NAV_LINKS = [
    { label: 'NEW ARRIVALS' },
    { label: 'TRENDING' },
    { label: 'WINTERWEAR', hasDropdown: true, href: '/winter-essentials' },
    { label: 'CLOTHING', hasDropdown: true },
    { label: 'SALE' }
];

export default function WomenPage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#FFF7F1' }}>
            <CategoryNavbar links={WOMEN_NAV_LINKS} gender="Women" />
            <CategoryHero title="WOMEN'S COLLECTION" />
            <CategoryProductSection categories={WOMEN_CATEGORIES} gender="Women" />
            <Footer />
        </main>
    );
}
