import CategoryNavbar from '../../components/CategoryNavbar';
import CategoryHero from '../../components/CategoryHero';
import CategoryProductSection from '../../components/CategoryProductSection';
import Footer from '../../components/Footer';

const MEN_CATEGORIES = [
    { label: 'HATS & CAPS', iconName: 'User' },
    { label: 'TSHIRTS', iconName: 'Shirt' },
    { label: 'WALLETS', iconName: 'Wallet' },
    { label: 'SHIRTS', iconName: 'Shirt' },
    { label: 'BOTTOMS', iconName: 'Layers' },
    { label: 'ACCESSORIES', iconName: 'Briefcase' },
    { label: 'BACKPACK', iconName: 'Backpack' },
    { label: 'JACKETS', iconName: 'Package' },
    { label: 'HOODIES', iconName: 'Box' },
    { label: 'SKATEBOARDS', iconName: 'MousePointer2' },
];

export default function MenPage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#FFF7F1' }}>
            <CategoryNavbar />
            <CategoryHero title="MEN'S COLLECTION" />
            <CategoryProductSection categories={MEN_CATEGORIES} />
            <Footer />
        </main>
    );
}
