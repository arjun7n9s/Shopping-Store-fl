'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './SplitScreen.module.css';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const getAssetPath = (path: string) => {
    // For local dev, we might not need the base path, but for production we do.
    // Ideally this is handled by an env var, but hardcoding for the rapid fix.
    const basePath = '/Shopping-Store-fl';
    return `${basePath}${path}`;
};

export default function SplitScreen() {
    const menVideoRef = useRef<HTMLVideoElement>(null);
    const womenVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Ensure videos play so they are ready to be revealed
        if (menVideoRef.current) menVideoRef.current.play().catch(() => { });
        if (womenVideoRef.current) womenVideoRef.current.play().catch(() => { });
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
