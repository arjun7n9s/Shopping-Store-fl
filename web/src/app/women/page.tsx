'use client';

import CategoryNavbar from '../../components/CategoryNavbar';
import CategoryHero from '../../components/CategoryHero';
import CategoryProductSection from '../../components/CategoryProductSection';
import Footer from '../../components/Footer';

// Define Women's Categories
const WOMEN_CATEGORIES = [
    { label: 'DRESSES', iconName: 'Shirt' },
    { label: 'TOPS', iconName: 'Shirt' },
    { label: 'BAGS', iconName: 'ShoppingBag' },
    { label: 'JEWELRY', iconName: 'Gem' },
    { label: 'WATCHES', iconName: 'Watch' },
    { label: 'PREMIUM', iconName: 'Crown' },
    { label: 'NEW IN', iconName: 'Sparkles' },
];

const WOMEN_NAV_LINKS = [
    { label: 'NEW ARRIVALS' },
    { label: 'TRENDING' },
    { label: 'WINTER EDI' },
    { label: 'CLOTHING', hasDropdown: true },
    { label: 'BAGS & SHOES', hasDropdown: true },
    { label: 'ACCESSORIES' },
    { label: 'SALE' }
];

export default function WomenPage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#FFF7F1' }}>
            <CategoryNavbar links={WOMEN_NAV_LINKS} />
            <CategoryHero title="WOMEN'S COLLECTION" />
            <CategoryProductSection categories={WOMEN_CATEGORIES} />
            <Footer />
        </main>
    );
}
