import CategoryNavbar from '../../components/CategoryNavbar';
import CategoryHero from '../../components/CategoryHero';
import Footer from '../../components/Footer';
import ProductGrid from '../../components/ProductGrid';

export default function OversizedFitsPage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#FFF7F1' }}>
            <CategoryNavbar />
            <CategoryHero title="OVERSIZED FITS" />
            <div style={{ padding: '4rem 2rem' }}>
                <ProductGrid />
            </div>
            <Footer />
        </main>
    );
}
