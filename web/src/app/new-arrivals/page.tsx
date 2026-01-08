'use client';

import CategoryNavbar from '@/components/CategoryNavbar';
import CategoryHero from '@/components/CategoryHero';
import CategoryProductSection from '@/components/CategoryProductSection';
import Footer from '@/components/Footer';

const NEW_ARRIVAL_CATEGORIES = [
    { label: 'All New', iconName: 'Grid' },
    { label: 'This Week', iconName: 'Calendar' },
    { label: 'Clothing', iconName: 'Shirt' }
];

export default function NewArrivalsPage() {
    return (
        <main>
            <CategoryNavbar />
            <CategoryHero title="NEW ARRIVALS" />
            <CategoryProductSection categories={NEW_ARRIVAL_CATEGORIES} />
            <Footer />
        </main>
    );
}
