import { PRODUCTS } from '@/data/products';
import ProductUI from './ProductUI';

// 1. Generate Static Params at Build Time
export function generateStaticParams() {
    return PRODUCTS.map((product) => ({
        id: product.id,
    }));
}

// 2. Server Component Implementation
export default function ProductPage({ params }: { params: { id: string } }) {
    // Correctly find product using the id
    const product = PRODUCTS.find((p) => p.id === params.id) || PRODUCTS[0];

    return <ProductUI product={product} />;
}
