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

// Sample shades for slideshow (premium/muted tones)
// We'll mimic "img1, img2, img3" with colored slides
const slides = [
    { id: 1, color: '#EDE6DB', label: 'img1' }, // Beige/Bone
    { id: 2, color: '#D3D3D3', label: 'img2' }, // Light Gray
    { id: 3, color: '#C8B6A6', label: 'img3' }, // Taupe
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
                // Determine next slide immediately so user sees change at 0.5s mark?
                // Or wait for interval? User said "hover for more than 0.5sec it should start playing"
                // Let's switch to 1st slide at 0.5s, then cycle.
                setActiveSlide(1);

                interval = setInterval(() => {
                    setActiveSlide(prev => {
                        if (prev >= 3) return 1; // Loop back to 1 (not 0, 0 is main img)
                        return prev + 1;
                    });
                }, 1000); // 1.0s per slide
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

    return (
        <Link href={`/product/${product.id}`} className={styles.card}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={styles.imageWrapper}>
                {product.isNew && <span className={styles.badge}>NEW ARRIVAL</span>}

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
                <div style={{ width: '100%', height: '100%', background: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '0.8rem' }} className={styles.productImage}>
                    {/* Real image would go here, using text placeholder as per existing code */}
                    {product.name}
                </div>

                {/* Slideshow Overlay */}
                <AnimatePresence>
                    {activeSlide > 0 && (
                        <motion.div
                            key={activeSlide} // Key change triggers animation
                            className={styles.slideOverlay}
                            style={{ backgroundColor: slides[activeSlide - 1].color }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }} // Smooth fade
                        >
                            {slides[activeSlide - 1].label}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className={styles.details}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.price}>₹{product.price.toLocaleString()}</p>
            </div>
        </Link>
    );
}
