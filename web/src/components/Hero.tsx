'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';
import FadeIn from './animations/FadeIn';
import MagneticButton from './animations/MagneticButton';

const SLIDE_DURATION = 5000;

const slides = [
    { id: 1, title: 'Traditionals', subtitle: 'Timeless Elegance', bgClass: styles.bg1, font: 'var(--font-yuji-boku)', link: '/traditionals' },
    { id: 2, title: 'Street Style', subtitle: 'Urban Essentials', bgClass: styles.bg2, font: 'var(--font-anton)', link: '/street-style' },
    { id: 3, title: 'Formal Wear', subtitle: 'Sophisticated Cuts', bgClass: styles.bg3, font: 'var(--font-playfair-display)', link: '/formal-wear' },
    { id: 4, title: 'Casual Fits', subtitle: 'Everyday Comfort', bgClass: styles.bg4, font: 'var(--font-roboto-mono)', link: '/casual-wear' },
];

interface HeroProps {
    onSlideChange?: (font: string) => void;
}

export default function Hero({ onSlideChange }: HeroProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-slide logic
    useEffect(() => {
        const timer = setInterval(() => {
            handleNextSlide();
        }, SLIDE_DURATION);

        return () => clearInterval(timer);
    }, [currentSlide]);

    const handleNextSlide = () => {
        const next = (currentSlide + 1) % slides.length;
        setCurrentSlide(next);
        if (onSlideChange) onSlideChange(slides[next].font);
    };

    const handleDotClick = (index: number) => {
        setCurrentSlide(index);
        if (onSlideChange) onSlideChange(slides[index].font);
    };

    return (
        <div className={styles.hero}>
            <div className={styles.slideContainer}>
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`${styles.slide} ${index === currentSlide ? styles.active : ''
                            } ${slide.bgClass}`}
                    >
                        {/* Only render content if active to re-trigger animations or handle visibility */}
                        {index === currentSlide && (
                            <div className={styles.content}>
                                <FadeIn direction="up" delay={0.2}>
                                    <h1 className={styles.title} style={{ fontFamily: slide.font }}>
                                        {slide.title}
                                    </h1>
                                </FadeIn>
                                <FadeIn direction="up" delay={0.4}>
                                    <p className={styles.subtitle}>{slide.subtitle}</p>
                                </FadeIn>
                                <FadeIn direction="up" delay={0.6}>
                                    <MagneticButton className="cursor-hover">
                                        <Link href={slide.link}>
                                            <button className={styles.shopButton}>SHOP NOW</button>
                                        </Link>
                                    </MagneticButton>
                                </FadeIn>
                            </div>
                        )}


                    </div>
                ))}
            </div>

            <div className={styles.dotsContainer}>
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={styles.dotWrapper}
                        onClick={() => handleDotClick(index)}
                    >
                        <div
                            className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''
                                }`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
