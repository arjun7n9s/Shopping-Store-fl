import { useRef } from 'react';
import Link from 'next/link';
import styles from './SplitScreen.module.css';

export default function SplitScreen() {
    const menVideoRef = useRef<HTMLVideoElement>(null);
    const womenVideoRef = useRef<HTMLVideoElement>(null);

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
        // Loop 2 seconds before the end
        if (video.currentTime > video.duration - 2) {
            video.currentTime = 0;
            video.play();
        }
    };

    return (
        <div className={styles.splitContainer}>
            <Link href="/men" className={`${styles.section} ${styles.men}`}>
                <video
                    ref={menVideoRef}
                    className={styles.backgroundVideo}
                    src="/videos/Men.mp4"
                    autoPlay
                    muted
                    loop={false} // Custom loop logic
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                />
                <h2 className={styles.label}>SHOP MEN</h2>
            </Link>
            <Link href="/women" className={`${styles.section} ${styles.women}`}>
                <video
                    ref={womenVideoRef}
                    className={styles.backgroundVideo}
                    src="/videos/Women.mp4"
                    autoPlay
                    muted
                    loop={false} // Custom loop logic
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                />
                <h2 className={styles.label}>SHOP WOMEN</h2>
            </Link>
        </div>
    );
}
