'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Preloader.module.css';

const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C', '#FF9F1C'];

// Module-level variable tracks state across SPA navigations but resets on hard reload
let hasShownSession = false;

export default function Preloader() {
    // Initialize based on whether we've shown it in this JS session
    const [isVisible, setIsVisible] = useState(!hasShownSession);

    useEffect(() => {
        if (!hasShownSession) {
            hasShownSession = true;
            // Prevent scrolling while loading
            document.body.style.overflow = 'hidden';

            const timer = setTimeout(() => {
                setIsVisible(false);
                document.body.style.overflow = '';
            }, 1500); // Reduced by another 1s (2500 -> 1500)
            return () => {
                clearTimeout(timer);
                document.body.style.overflow = '';
            };
        }
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    className={styles.container}
                    key="preloader"
                    exit={{ opacity: 1, transition: { duration: 2.0 } }}
                >
                    {/* Vibrant Columns */}
                    <div className={styles.columnWrapper}>
                        {colors.map((color, index) => (
                            <motion.div
                                key={index}
                                className={styles.column}
                                style={{ backgroundColor: color }}
                                initial={{ y: 0 }}
                                exit={{
                                    y: "-100%",
                                    transition: {
                                        duration: 1.0,
                                        ease: [0.76, 0, 0.24, 1],
                                        delay: 0.4 + index * 0.1
                                    }
                                }}
                            />
                        ))}
                    </div>

                    {/* Content Layer */}
                    <motion.div
                        className={styles.contentLayer}
                        exit={{
                            opacity: 0,
                            y: -20,
                            transition: {
                                delay: 0.3,
                                duration: 0.5,
                                ease: [0.76, 0, 0.24, 1]
                            }
                        }}
                    >
                        <motion.h1
                            className={styles.title}
                            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 120, damping: 10 }}
                        >
                            SHOPPING <br /> <span className={styles.hollow}>STORE</span>
                        </motion.h1>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
