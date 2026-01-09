'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './SplitScreen.module.css';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// Helper to get correct path with basePath
const getAssetPath = (path: string) => {
    const basePath = '/Shopping-Store-fl';
    return `${basePath}${path}`;
};

export default function SplitScreen() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    const menVideoRef = useRef<HTMLVideoElement>(null);
    const womenVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Ensure videos play when component mounts/is in view
        if (menVideoRef.current) menVideoRef.current.play().catch(e => console.log("Autoplay blocked", e));
        if (womenVideoRef.current) womenVideoRef.current.play().catch(e => console.log("Autoplay blocked", e));
    }, []);

    return (
        <section className={styles.splitScreen} ref={containerRef}>
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
                        poster={getAssetPath("/videos/men-poster.jpg")} // Optional poster if you have one
                    >
                        <source src={getAssetPath("/videos/Men.mp4")} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className={styles.overlay} />
                </div>

                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <h2 className={styles.title}>FOR HIM</h2>
                    <Link href="/men" className={styles.link}>
                        SHOP MEN <ArrowRight className={styles.icon} />
                    </Link>
                </motion.div>
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
                        Your browser does not support the video tag.
                    </video>
                    <div className={styles.overlay} />
                </div>

                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                    <h2 className={styles.title}>FOR HER</h2>
                    <Link href="/women" className={styles.link}>
                        SHOP WOMEN <ArrowRight className={styles.icon} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
