import CategoryNavbar from '../../components/CategoryNavbar';
import CategoryHero from '../../components/CategoryHero';
import Footer from '../../components/Footer';
import ProductGrid from '../../components/ProductGrid';

export default function PartyWearPage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#FFF7F1' }}>
            <CategoryNavbar />
            <CategoryHero title="PARTY WEAR" />
            <div style={{ padding: '4rem 2rem' }}>
                <ProductGrid />
            </div>
            <Footer />
        </main>
    );
}
