// I should create the missing pages first before linking to avoid 404s.
// I'll defer this tool call and create the missing pages first.


import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import styles from './Hero.module.css';

const SLIDE_DURATION = 2000; // 2 seconds

const slides = [
    {
        id: 1,
        title: "CASUAL WEAR",
        bgClass: "bg1", // Gradients defined in CSS for now
        font: 'var(--font-roboto-mono)',
        link: '/casual-wear'
    },
    {
        id: 2,
        title: "STREET STYLE",
        bgClass: "bg2",
        font: 'var(--font-yuji-boku)',
        link: '/street-style'
    },
    {
        id: 3,
        title: "PREMIUM LUXURY",
        bgClass: "bg3",
        font: 'var(--font-playfair-display)',
        link: '/premium-luxury'
    },
    {
        id: 4,
        title: "TRADITIONALS",
        bgClass: "bg4",
        font: 'var(--font-pirata-one)',
        link: '/traditionals'
    },
    {
        id: 5,
        title: "MERCHANDISE",
        bgClass: "bg1", // Reusing bg1 or need new logic for colors later
        font: 'var(--font-anton)',
        link: '/merchandise'
    }
];

interface HeroProps {
    onSlideChange?: (font: string) => void;
}

export default function Hero({ onSlideChange }: HeroProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    // Key to force re-render of animation when slide changes manually or automatically
    const [animKey, setAnimKey] = useState(0);

    // Function to go to next slide
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setAnimKey(prev => prev + 1);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setAnimKey(prev => prev + 1);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, SLIDE_DURATION);
        return () => clearInterval(interval);
    }, []); // Dependency on currentSlide removed to prevent interval reset on manual change

    useEffect(() => {
        if (onSlideChange) {
            onSlideChange(slides[currentSlide].font);
        }
    }, [currentSlide, onSlideChange]);

    return (
        <div className={styles.hero}>
            <div className={styles.slideContainer}>
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`${styles.slide} ${styles[slide.bgClass]} ${index === currentSlide ? styles.active : ''}`}
                    >
                        <div className={styles.content}>
                            <h1 className={styles.title}>{slide.title}</h1>
                            <Link href={slide.link}>
                                <button className={styles.shopButton}>SHOP NOW</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.dotsContainer}>
                {slides.map((_, index) => (
                    <div key={index} className={styles.dotWrapper} onClick={() => goToSlide(index)}>
                        <div className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}></div>

                        {/* Loading ring only for active dot */}
                        {index === currentSlide && (
                            <svg className={styles.loaderSvg} width="24" height="24" viewBox="0 0 24 24">
                                <circle
                                    className={styles.progressCircle}
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    // Circumference = 2 * pi * 10 ~= 62.8
                                    // dash-offset animation from 62.8 to 0
                                    style={{
                                        strokeDasharray: '62.8',
                                        strokeDashoffset: '62.8',
                                        animation: `dash ${SLIDE_DURATION}ms linear forwards`
                                    }}
                                />
                                <style jsx>{`
                  @keyframes dash {
                    to {
                      stroke-dashoffset: 0;
                    }
                  }
                `}</style>
                            </svg>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
