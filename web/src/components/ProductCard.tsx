'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProductCard.module.css';
import { Product } from '@/data/products';

interface ProductCardProps {
    product: Product;
    isLiked: boolean;
    onToggleLike: (id: string, e: React.MouseEvent) => void;
}

// ProductCard.tsx
// Updated to support real images and color swatches

// Fallback/Premium shades for slideshow if images aren't available
const slides = [
    { id: 1, color: '#EDE6DB', label: 'Image 1' }, // Beige/Bone
    { id: 2, color: '#D3D3D3', label: 'Image 2' }, // Light Gray
    { id: 3, color: '#C8B6A6', label: 'Image 3' }, // Taupe
];


export default function ProductCard({ product, isLiked, onToggleLike }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0); // 0 = main image

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let interval: NodeJS.Timeout;

        if (isHovered) {
            // Wait 0.5s before starting slideshow
            timer = setTimeout(() => {
                setActiveSlide(1);

                interval = setInterval(() => {
                    setActiveSlide(prev => {
                        // Cycle 1 -> 2 -> 3 -> 1
                        if (prev >= 3) return 1;
                        return prev + 1;
                    });
                }, 1000);
            }, 500);
        } else {
            // Reset immediately on leave
            setActiveSlide(0);
        }

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [isHovered]);

    const MotionLink = motion.create(Link);

    return (
        <MotionLink href={`/product/${product.id}`} className={styles.card}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ display: 'block' }} // Ensure it behaves like a block for layout
        >
            <div className={styles.imageWrapper}>
                {product.isNew && <span className={`${styles.badge} ${styles.badgeNew}`}>NEW ARRIVAL</span>}
                {/* ... rest of the content ... */}
                {!product.isNew && product.isBestSeller && <span className={`${styles.badge} ${styles.badgeBestSeller}`}>BEST SELLER</span>}
                {!product.isNew && !product.isBestSeller && product.isMostLiked && <span className={`${styles.badge} ${styles.badgeMostLiked}`}>MOST LIKED</span>}

                <button
                    className={styles.likeBtn}
                    onClick={(e) => onToggleLike(product.id, e)}
                >
                    <Heart
                        size={18}
                        fill={isLiked ? 'black' : 'none'}
                        color={isLiked ? 'black' : '#666'}
                    />
                </button>

                {/* Main Content (Base layer) */}
                {/* Main Content (Base layer) */}
                <div className={styles.productImageWrapper}>
                    {/* Placeholder for base image (Text/Gray) since we don't have real images yet */}
                    <div className={styles.placeholderImage}>
                        {product.name}
                    </div>

                    {/* Slideshow Overlay for Hover Effect */}
                    <AnimatePresence>
                        {activeSlide > 0 && (
                            <motion.div
                                key={activeSlide}
                                className={styles.slideOverlay}
                                style={{ backgroundColor: slides[activeSlide - 1].color }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {slides[activeSlide - 1].label}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className={styles.details}>
                <h3 className={styles.name}>{product.name}</h3>

                <div className={styles.priceRow}>
                    <p className={styles.price}>₹{product.price.toLocaleString()}</p>

                    {/* Color Swatches */}
                    {product.colors && product.colors.length > 0 && (
                        <div className={styles.swatches}>
                            {product.colors.slice(0, 6).map((color, i) => (
                                <span
                                    key={i}
                                    className={styles.swatch}
                                    style={{ backgroundColor: color, border: color.toLowerCase() === '#ffffff' ? '1px solid #eee' : 'none' }}
                                />
                            ))}
                            {product.colors.length > 6 && <span className={styles.moreColors}>+</span>}
                        </div>
                    )}
                </div>
            </div>
        </MotionLink>
    );
}
