import styles from './VideoReels.module.css';
import { Play } from 'lucide-react';

export default function VideoReels() {
    const reels = [1, 2, 3, 4];

    return (
        <section className={styles.reelSection}>
            <h2 className={styles.title}>Explore The Collection</h2>
            <div className={styles.grid}>
                {reels.map((id) => (
                    <div key={id} className={styles.reelCard}>
                        <div className={styles.placeholder}>
                            <Play size={48} color="white" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
