import Link from 'next/link';
import styles from './SplitScreen.module.css';

export default function SplitScreen() {
    return (
        <div className={styles.splitContainer}>
            <Link href="/men" className={`${styles.section} ${styles.men}`}>
                <h2 className={styles.label}>SHOP MEN</h2>
            </Link>
            <Link href="/women" className={`${styles.section} ${styles.women}`}>
                <h2 className={styles.label}>SHOP WOMEN</h2>
            </Link>
        </div>
    );
}
