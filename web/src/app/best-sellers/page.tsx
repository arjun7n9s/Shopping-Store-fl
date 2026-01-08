'use client';

import CategoryNavbar from '@/components/CategoryNavbar';
import CategoryHero from '@/components/CategoryHero';
import CategoryProductSection from '@/components/CategoryProductSection';
import Footer from '@/components/Footer';

// Use same category structure but maybe simplified for specific collections
const BEST_SELLER_CATEGORIES = [
    { label: 'All Best Sellers', iconName: 'Grid' },
    { label: 'Trending Now', iconName: 'Flame' },
    { label: 'Top Rated', iconName: 'Star' }
];

export default function BestSellersPage() {
    return (
        <main>
            <CategoryNavbar />
            <CategoryHero title="BEST SELLERS" />
            <CategoryProductSection categories={BEST_SELLER_CATEGORIES} />
            <Footer />
        </main>
    );
}
