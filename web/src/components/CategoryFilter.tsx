'use client';

import { useState } from 'react';
import { MousePointer2, User, Wallet, Shirt, Briefcase, Backpack, Package, Box, Layers, ArrowUpDown, ArrowDown, ArrowUp } from 'lucide-react';
// Note: Lucide doesn't have perfect matches for "Skateboard" or specific clothing types, using proxies.
import styles from './CategoryFilter.module.css';

// Lucide Icon type
import { LucideIcon } from 'lucide-react';

const MEN_CATEGORIES = [
    { label: 'HATS & CAPS', icon: User },
    { label: 'TSHIRTS', icon: Shirt },
    { label: 'WALLETS', icon: Wallet },
    { label: 'SHIRTS', icon: Shirt },
    { label: 'BOTTOMS', icon: Layers },
    { label: 'ACCESSORIES', icon: Briefcase },
    { label: 'BACKPACK', icon: Backpack },
    { label: 'JACKETS', icon: Package },
    { label: 'HOODIES', icon: Box },
    { label: 'SKATEBOARDS', icon: MousePointer2 },
];

type SortState = 'default' | 'asc' | 'desc';

interface CategoryFilterProps {
    categories?: { label: string; icon: LucideIcon }[];
}

export default function CategoryFilter({ categories = MEN_CATEGORIES }: CategoryFilterProps) {
    const [priceState, setPriceState] = useState<SortState>('default');
    const [discountState, setDiscountState] = useState<SortState>('default');
    const [activeFilter, setActiveFilter] = useState('MOST LIKED');
    const [isExpanded, setIsExpanded] = useState(false);

    // Show first 4 items on mobile unless expanded
    const visibleCategories = isExpanded ? categories : categories.slice(0, 4);

    const handleFilterClick = (filterName: string) => {
        setActiveFilter(filterName);
    };

    const handlePriceClick = () => {
        setPriceState((prev) => {
            if (prev === 'default') return 'asc';
            if (prev === 'asc') return 'desc';
            return 'default';
        });
        setDiscountState('default'); // Keep Price/Discount mutually exclusive sorting if desired, or remove this too? 
        // User said "Price and Discount... are independent". 
        // usually you sort by one thing. I will keep them exclusive to each other but independent of Filter.
    };

    const handleDiscountClick = () => {
        setDiscountState((prev) => {
            if (prev === 'default') return 'asc';
            if (prev === 'asc') return 'desc';
            return 'default';
        });
        setPriceState('default');
    };

    const getSortIcon = (state: SortState) => {
        if (state === 'asc') return <ArrowDown className={styles.priceIcon} />;
        if (state === 'desc') return <ArrowUp className={styles.priceIcon} />;
        return <ArrowUpDown className={styles.priceIcon} />;
    };

    const getPriceLabel = () => {
        return 'PRICE';
    };

    return (
        <div className={styles.container}>
            {/* Top Icons */}
            {/* Top Icons */}
            <div className={styles.categories}>
                {visibleCategories.map((cat) => (
                    <div key={cat.label} className={styles.categoryItem}>
                        <cat.icon className={styles.catIcon} />
                        <span className={styles.catLabel}>{cat.label}</span>
                    </div>
                ))}
                {!isExpanded && categories.length > 4 && (
                    <div className={styles.categoryItem} onClick={() => setIsExpanded(true)}>
                        <Layers className={styles.catIcon} />
                        <span className={styles.catLabel}>MORE</span>
                    </div>
                )}
                {isExpanded && (
                    <div className={styles.categoryItem} onClick={() => setIsExpanded(false)}>
                        <ArrowUp className={styles.catIcon} />
                        <span className={styles.catLabel}>LESS</span>
                    </div>
                )}
            </div>

            {/* Bottom Filters */}
            <div className={styles.filters}>
                <button
                    className={`${styles.pill} ${activeFilter === 'NEW ARRIVALS' ? styles.active : ''}`}
                    onClick={() => handleFilterClick('NEW ARRIVALS')}
                >
                    NEW ARRIVALS
                </button>

                <button
                    className={`${styles.pill} ${activeFilter === 'BESTSELLER' ? styles.active : ''}`}
                    onClick={() => handleFilterClick('BESTSELLER')}
                >
                    BESTSELLER
                </button>

                <button
                    className={`${styles.pill} ${priceState !== 'default' ? styles.active : ''}`}
                    onClick={handlePriceClick}
                >
                    {getPriceLabel()} {getSortIcon(priceState)}
                </button>

                <button
                    className={`${styles.pill} ${activeFilter === 'MOST LIKED' ? styles.active : ''}`}
                    onClick={() => handleFilterClick('MOST LIKED')}
                >
                    MOST LIKED
                </button>

                <button
                    className={`${styles.pill} ${discountState !== 'default' ? styles.active : ''}`}
                    onClick={handleDiscountClick}
                >
                    DISCOUNT {getSortIcon(discountState)}
                </button>
            </div>
        </div>
    );
}
