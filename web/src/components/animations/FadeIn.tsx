'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type Props = {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    className?: string;
};

export default function FadeIn({ children, delay = 0, direction = 'up', className = '' }: Props) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    const getVariants = () => {
        const distance = 40;
        const variants = {
            hidden: { opacity: 0, x: 0, y: 0 },
            visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8, delay, ease: "easeOut" as const } },
        };

        if (direction === 'up') variants.hidden.y = distance;
        if (direction === 'down') variants.hidden.y = -distance;
        if (direction === 'left') variants.hidden.x = distance;
        if (direction === 'right') variants.hidden.x = -distance;

        return variants;
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={getVariants()}
            className={className}
        >
            {children}
        </motion.div>
    );
}
