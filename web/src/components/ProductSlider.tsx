import styles from './ProductSlider.module.css';

import { PRODUCTS } from '@/data/products';
import FadeIn from './animations/FadeIn';

interface ProductSliderProps {
    title: string;
    gender?: 'Men' | 'Women';
    filter?: 'Bestseller' | 'New' | 'All';
}

export default function ProductSlider({ title, gender, filter = 'All' }: ProductSliderProps) {
    const products = PRODUCTS.filter(p => {
        if (gender && p.category !== gender) return false;
        if (filter === 'New' && !p.isNew) return false;
        return true;
    }).slice(0, 10); // Limit to 10 items for slider

    // Duplicate for infinite scroll effect if needed, or just map standard if carousel logic changes
    // The CSS module seems to imply a marquee or continuous scroll. 
    // Let's just render the products.

    return (
        <section className={styles.sliderContainer}>
            <header className={styles.header}>
                <FadeIn direction="up">
                    <h2 className={styles.heading}>{title}</h2>
                </FadeIn>
            </header>

            <FadeIn direction="up" delay={0.2}>
                <div className={styles.carousel}>
                    <div className={styles.track}>
                        {/* Render products twice for smooth infinite loop if CSS is set up that way */}
                        {[...products, ...products].map((p, i) => (
                            <div key={`${p.id}-${i}`} className={styles.card}>
                                {/* Use first image or placeholder */}
                                <div className={styles.image} style={{ backgroundImage: `url(${p.images[0]})` }}></div>
                                <div className={styles.info}>
                                    <h3 className={styles.productName}>{p.name}</h3>
                                    <p className={styles.productPrice}>Rs. {p.price.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </FadeIn>
        </section>
    );
}
