import styles from './InfoSection.module.css';
import { Truck, Package, Box, RefreshCw } from 'lucide-react';

export default function InfoSection() {
    return (
        <section className={styles.infoSection}>
            <div className={styles.item}>
                <div className={styles.iconCircle}>
                    <Truck size={32} strokeWidth={1.5} />
                </div>
                <h3 className={styles.heading}>Shipping Within 48 Hours</h3>
                <p className={styles.desc}>Your order will be shipped within 48 hours from order placement.</p>
            </div>

            <div className={styles.item}>
                <div className={styles.iconCircle}>
                    <Package size={32} strokeWidth={1.5} />
                </div>
                <h3 className={styles.heading}>5% OFF || Free Delivery</h3>
                <p className={styles.desc}>5% OFF on Pre-paid orders.</p>
            </div>

            <div className={styles.item}>
                <div className={styles.iconCircle}>
                    <Box size={32} strokeWidth={1.5} /> {/* Using Box for Made in India placeholder */}
                </div>
                <h3 className={styles.heading}>Made In India</h3>
                <p className={styles.desc}>Our products are 100% made in India. From raw fabric to final product.</p>
            </div>

            <div className={styles.item}>
                <div className={styles.iconCircle}>
                    <RefreshCw size={32} strokeWidth={1.5} />
                </div>
                <h3 className={styles.heading}>Easy Returns</h3>
                <p className={styles.desc}>Hassle free returns within 7 days.</p>
            </div>
        </section>
    );
}
