'use client';

import CategoryNavbar from '@/components/CategoryNavbar';
import CategoryHero from '@/components/CategoryHero';
import CategoryProductSection from '@/components/CategoryProductSection';
import Footer from '@/components/Footer';

const ACCESSORIES_LINKS = [
    { label: 'NEW ARRIVALS' },
    { label: 'BAGS' },
    { label: 'JEWELLERY' },
    { label: 'SUNGLASSES' },
    { label: 'BELTS' },
    { label: 'HATS' },
    { label: 'SALE' }
];

const ACCESSORIES_CATEGORIES = [
    { label: 'All', iconName: 'Grid' },
    { label: 'Bags', iconName: 'ShoppingBag' },
    { label: 'Jewellery', iconName: 'Gem' },
    { label: 'Sunglasses', iconName: 'Glasses' },
    { label: 'Belts', iconName: 'Circle' }
];

export default function AccessoriesPage() {
    return (
        <main>
            <CategoryNavbar links={ACCESSORIES_LINKS} />
            <CategoryHero title="ACCESSORIES EDIT" />
            <CategoryProductSection categories={ACCESSORIES_CATEGORIES} />
            <Footer />
        </main>
    );
}
