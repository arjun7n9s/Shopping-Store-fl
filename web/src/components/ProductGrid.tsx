'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProductGrid.module.css';
import { PRODUCTS, Product } from '@/data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
    products?: Product[];
}

export default function ProductGrid({ products = PRODUCTS }: ProductGridProps) {
    const [liked, setLiked] = useState<string[]>([]);

    const toggleLike = (id: string, e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation
        // e.stopPropagation() is handled in ProductCard now but good to keep safe 
        setLiked(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <div className={styles.container}>
            <motion.div layout className={styles.grid}>
                <AnimatePresence>
                    {products.map((prod, index) => (
                        <motion.div
                            layout
                            key={prod.id}
                            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)', y: 20 }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            <ProductCard
                                product={prod}
                                isLiked={liked.includes(prod.id)}
                                onToggleLike={toggleLike}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            <button className={styles.viewMoreBtn}>VIEW MORE</button>
        </div>
    );
}
