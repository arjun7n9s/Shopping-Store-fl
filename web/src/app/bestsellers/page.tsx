import CategoryNavbar from '../../components/CategoryNavbar';
import CategoryHero from '../../components/CategoryHero';
import Footer from '../../components/Footer';
import ProductGrid from '../../components/ProductGrid';

export default function BestsellersPage() {
    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#FFF7F1' }}>
            <CategoryNavbar />
            <CategoryHero title="BEST SELLERS" />
            <div style={{ padding: '4rem 2rem' }}>
                {/* 
                  ProductGrid typically shows all products. 
                  If it supports props, we should pass filter="Bestseller".
                  For now, listing standard grid. 
                */}
                <ProductGrid />
            </div>
            <Footer />
        </main>
    );
}
