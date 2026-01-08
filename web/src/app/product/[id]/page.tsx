'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext'; // We'll add this context too
import CategoryNavbar from '@/components/CategoryNavbar';
import Footer from '@/components/Footer';
import CategoryFilter from '@/components/CategoryFilter'; // Reusing for suggestions? Or separate grid.
import ProductGrid from '@/components/ProductGrid'; // Reusing for "You May Also Like"
import styles from './ProductPage.module.css';
import { Check, Star, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const { isAuthenticated, login } = useAuth();

    // Find product
    const product = PRODUCTS.find(p => p.id === params.id) || PRODUCTS[0]; // Fallback to first if not found (or handle 404)

    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '#000');
    const [activeImg, setActiveImg] = useState(product.images[0]);

    const handleAddToCart = () => {
        addToCart(product, selectedSize, selectedColor);
    };

    const handleBuyNow = () => {
        if (!isAuthenticated) {
            // Mock Login Prompt
            const shouldLogin = confirm("Please Sign In to complete your purchase.\n(Click OK to Mock Login)");
            if (shouldLogin) {
                login();
                alert("Logged In! Proceeding to Custom Checkout...");
                // router.push('/checkout'); // In real app
            }
        } else {
            alert("Proceeding to Checkout...");
        }
    };

    if (!product) return <div>Product Not Found</div>;

    return (
        <main className={styles.main}>
            <CategoryNavbar />

            <div className={styles.productContainer}>
                {/* Left: Gallery */}
                <div className={styles.gallerySection}>
                    <div className={styles.thumbnailList}>
                        {product.images.map((img, idx) => (
                            <div
                                key={idx}
                                className={`${styles.thumbnail} ${activeImg === img ? styles.activeThumb : ''}`}
                                onClick={() => setActiveImg(img)}
                            >
                                {/* Placeholder since we don't have real imgs yet */}
                                <div className={styles.placeholderThumb}>{idx + 1}</div>
                                {/* <Image src={img} alt="thumb" fill style={{ objectFit: 'cover' }} /> */}
                            </div>
                        ))}
                    </div>
                    <div className={styles.mainImage}>
                        <div className={styles.placeholderMain}>IMG: {product.name}</div>
                        {/* <Image src={activeImg} alt={product.name} fill style={{ objectFit: 'cover' }} /> */}
                    </div>
                </div>

                {/* Right: Info */}
                <div className={styles.infoSection}>
                    <div className={styles.breadcrumbs}>Home / {product.category} / {product.name}</div>

                    <h1 className={styles.title}>{product.name}</h1>

                    <div className={styles.priceRow}>
                        <span className={styles.price}>₹{product.price.toLocaleString()}</span>
                        <div className={styles.rating}>
                            <Star size={16} fill="black" />
                            <Star size={16} fill="black" />
                            <Star size={16} fill="black" />
                            <Star size={16} fill="black" />
                            <Star size={16} fill="#ccc" />
                            <span className={styles.reviewCount}>(42 Reviews)</span>
                        </div>
                    </div>

                    <p className={styles.description}>{product.description}</p>

                    <div className={styles.selectors}>
                        {/* Sizes */}
                        <div className={styles.selectorGroup}>
                            <label>SELECT SIZE</label>
                            <div className={styles.sizeOptions}>
                                {product.sizes?.map(size => (
                                    <button
                                        key={size}
                                        className={`${styles.sizeBtn} ${selectedSize === size ? styles.selectedSize : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Colors */}
                        <div className={styles.selectorGroup}>
                            <label>SELECT COLOR</label>
                            <div className={styles.colorOptions}>
                                {product.colors?.map(color => (
                                    <button
                                        key={color}
                                        className={`${styles.colorBtn} ${selectedColor === color ? styles.selectedColor : ''}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setSelectedColor(color)}
                                    >
                                        {selectedColor === color && <Check size={12} color={color === '#FFFFFF' ? 'black' : 'white'} />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                            ADD TO CART
                        </button>
                        <button className={styles.buyNowBtn} onClick={handleBuyNow}>
                            BUY IT NOW
                        </button>
                    </div>

                    <div className={styles.trustBadges}>
                        <div className={styles.badgeItem}><ShieldCheck size={18} /> Generic Secure Payment</div>
                        <div className={styles.badgeItem}><ShoppingBag size={18} /> Free Shipping Returns</div>
                    </div>
                </div>
            </div>

            <div className={styles.recommendations}>
                <h2>YOU MAY ALSO LIKE</h2>
                <ProductGrid />
            </div>

            <Footer />
        </main>
    );
}
