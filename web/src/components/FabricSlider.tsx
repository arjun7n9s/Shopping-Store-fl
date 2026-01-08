'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Hero.module.css'; // Reusing Hero styles for consistency

const slides = [
    {
        id: 1,
        title: "WINTER ESSENTIALS",
        subtitle: "STAY COZY",
        bgClass: "bg3",
        font: 'var(--font-playfair-display)',
        link: '/winter-essentials'
    },
    {
        id: 2,
        title: "ULTIMATE DENIMS",
        subtitle: "FIT FOR YOU",
        bgClass: "bg1",
        font: 'var(--font-anton)',
        link: '/ultimate-denims'
    },
    {
        id: 3,
        title: "TRENDING FABRICS",
        subtitle: "NEW TEXTURES",
        bgClass: "bg2",
        font: 'var(--font-yuji-boku)',
        link: '/trending-fabrics'
    },
];

export default function FabricSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000); // 3 seconds for this slider
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.hero} style={{ position: 'relative' }}>
            <div className={styles.slideContainer}>
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`${styles.slide} ${styles[slide.bgClass]} ${index === currentSlide ? styles.active : ''}`}
                    >
                        <div className={styles.content}>
                            <h2 className={styles.subtitle}>{slide.subtitle}</h2>
                            <h1
                                className={styles.title}
                                style={{ fontFamily: slide.font }}
                            >{slide.title}</h1>
                            <Link href={slide.link}>
                                <button className={styles.shopButton}>EXPLORE</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {/* Reduced navigation for this secondary slider, maybe just standard dots or none if auto-play is key */}
        </div>
    );
}
