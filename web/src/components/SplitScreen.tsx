'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './SplitScreen.module.css';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const getAssetPath = (path: string) => {
    // For local dev, we might not need the base path, but for production we do.
    const basePath = '/Shopping-Store-fl';
    return `${basePath}${path}`;
};

export default function SplitScreen() {
    const menVideoRef = useRef<HTMLVideoElement>(null);
    const womenVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const handleTimeUpdate = (e: Event) => {
            const video = e.target as HTMLVideoElement;
            if (video.duration > 0 && video.currentTime >= video.duration - 2) {
                video.currentTime = 0;
                video.play().catch(() => { });
            }
        };

        const setupVideo = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
            const video = videoRef.current;
            if (video) {
                video.addEventListener('timeupdate', handleTimeUpdate);
                video.play().catch(() => { });
            }
            return () => {
                if (video) video.removeEventListener('timeupdate', handleTimeUpdate);
            };
        };

        const cleanupMen = setupVideo(menVideoRef);
        const cleanupWomen = setupVideo(womenVideoRef);

        return () => {
            cleanupMen();
            cleanupWomen();
        };
    }, []);

    return (
        <section className={styles.splitScreen}>
            {/* MEN SIDE */}
            <div className={`${styles.side} ${styles.menSide}`}>
                <div className={styles.videoWrapper}>
                    <video
                        ref={menVideoRef}
                        className={styles.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster={getAssetPath("/videos/men-poster.jpg")}
                    >
                        <source src={getAssetPath("/videos/Men.mp4")} type="video/mp4" />
                    </video>
                </div>
                <div className={styles.overlay} />

                <div className={styles.content}>
                    <h2 className={styles.title}>FOR HIM</h2>
                    <Link href="/men" className={styles.link}>
                        SHOP MEN <ArrowRight size={24} />
                    </Link>
                </div>
            </div>

            {/* WOMEN SIDE */}
            <div className={`${styles.side} ${styles.womenSide}`}>
                <div className={styles.videoWrapper}>
                    <video
                        ref={womenVideoRef}
                        className={styles.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src={getAssetPath("/videos/Women.mp4")} type="video/mp4" />
                    </video>
                </div>
                <div className={styles.overlay} />

                <div className={styles.content}>
                    <h2 className={styles.title}>FOR HER</h2>
                    <Link href="/women" className={styles.link}>
                        SHOP WOMEN <ArrowRight size={24} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
