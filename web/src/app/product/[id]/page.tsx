'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import CategoryNavbar from '@/components/CategoryNavbar';
import Footer from '@/components/Footer';
import CategoryFilter from '@/components/CategoryFilter';
import ProductGrid from '@/components/ProductGrid';
import styles from './ProductPage.module.css';
import { Check, Star, ShoppingBag, ShieldCheck } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import MagneticButton from '@/components/animations/MagneticButton';

export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const { isAuthenticated, login } = useAuth();

    // Find product
    const product = PRODUCTS.find(p => p.id === params.id) || PRODUCTS[0];

    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '#000');
    const [activeImg, setActiveImg] = useState(product.images[0]);

    const handleAddToCart = () => {
        addToCart(product, selectedSize, selectedColor);
    };

    const handleBuyNow = () => {
        if (!isAuthenticated) {
            const shouldLogin = confirm("Please Sign In to complete your purchase.\n(Click OK to Mock Login)");
            if (shouldLogin) {
                login();
                alert("Logged In! Proceeding to Custom Checkout...");
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
                <FadeIn direction="right" delay={0.1} className={styles.gallerySection}>
                    <div className={styles.thumbnailList}>
                        {product.images.map((img, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                className={`${styles.thumbnail} ${activeImg === img ? styles.activeThumb : ''}`}
                                onClick={() => setActiveImg(img)}
                            >
                                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                    <Image src={img} alt="thumb" fill style={{ objectFit: 'cover' }} sizes="80px" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className={styles.mainImage}>
                        <motion.div
                            style={{ position: 'relative', width: '100%', height: '100%' }}
                            whileHover={{ scale: 1.1 }} // Zoom effect
                            transition={{ duration: 0.4 }}
                        >
                            <Image
                                src={activeImg}
                                alt={product.name}
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </motion.div>
                    </div>
                </FadeIn>

                {/* Right: Info */}
                <div className={styles.infoSection}>
                    <FadeIn direction="up" delay={0.2}>
                        <div className={styles.breadcrumbs}>Home / {product.category} / {product.name}</div>
                    </FadeIn>

                    <FadeIn direction="up" delay={0.3}>
                        <h1 className={styles.title}>{product.name}</h1>
                    </FadeIn>

                    <FadeIn direction="up" delay={0.4}>
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
                    </FadeIn>

                    <FadeIn direction="up" delay={0.5}>
                        <p className={styles.description}>{product.description}</p>
                    </FadeIn>

                    <FadeIn direction="up" delay={0.6}>
                        <div className={styles.selectors}>
                            {/* Sizes */}
                            <div className={styles.selectorGroup}>
                                <label>SELECT SIZE</label>
                                <div className={styles.sizeOptions}>
                                    {product.sizes?.map(size => (
                                        <motion.button
                                            key={size}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`${styles.sizeBtn} ${selectedSize === size ? styles.selectedSize : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Colors */}
                            <div className={styles.selectorGroup}>
                                <label>SELECT COLOR</label>
                                <div className={styles.colorOptions}>
                                    {product.colors?.map(color => (
                                        <motion.button
                                            key={color}
                                            whileHover={{ scale: 1.2 }}
                                            className={`${styles.colorBtn} ${selectedColor === color ? styles.selectedColor : ''}`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => setSelectedColor(color)}
                                        >
                                            {selectedColor === color && <Check size={12} color={color === '#FFFFFF' ? 'black' : 'white'} />}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn direction="up" delay={0.7}>
                        <div className={styles.actions}>
                            <MagneticButton>
                                <button className={styles.addToCartBtn} onClick={handleAddToCart} style={{ width: '100%' }}>
                                    ADD TO CART
                                </button>
                            </MagneticButton>
                            <MagneticButton>
                                <button className={styles.buyNowBtn} onClick={handleBuyNow} style={{ width: '100%' }}>
                                    BUY IT NOW
                                </button>
                            </MagneticButton>
                        </div>
                    </FadeIn>

                    <FadeIn direction="up" delay={0.8}>
                        <div className={styles.trustBadges}>
                            <div className={styles.badgeItem}><ShieldCheck size={18} /> Generic Secure Payment</div>
                            <div className={styles.badgeItem}><ShoppingBag size={18} /> Free Shipping Returns</div>
                        </div>
                    </FadeIn>
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
