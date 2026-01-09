import CategoryNavbar from '../../components/CategoryNavbar';
import CategoryHero from '../../components/CategoryHero';
import CategoryProductSection from '../../components/CategoryProductSection';
import Footer from '../../components/Footer';

const MEN_CATEGORIES = [
    { label: 'T-SHIRT', iconName: 'Shirt' },
    { label: 'SHIRTS', iconName: 'Shirt' },
    { label: 'BOTTOMS', iconName: 'Layers' },
    { label: 'JACKETS', iconName: 'Package' },
    { label: 'HOODIE', iconName: 'Box' },
    { label: 'ACTIVEWEAR', iconName: 'Flame' },
];

export default function MenPage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#FFF7F1' }}>
            <CategoryNavbar gender="Men" />
            <CategoryHero title="MEN'S COLLECTION" />
            <CategoryProductSection categories={MEN_CATEGORIES} gender="Men" />
            <Footer />
        </main>
    );
}
