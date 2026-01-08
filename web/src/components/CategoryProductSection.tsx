'use client';

import { useState, useMemo } from 'react';
import ProductGrid from './ProductGrid';
import { PRODUCTS } from '@/data/products';
import { LucideIcon, ArrowUp, ArrowDown, ArrowUpDown, MousePointer2, User, Wallet, Shirt, Briefcase, Backpack, Package, Box, Layers, ShoppingBag, Watch, Gem, Crown, Sparkles, Grid, Glasses, Circle, Calendar, Flame, Star } from 'lucide-react';
import styles from './CategoryFilter.module.css'; // Reusing CSS

const iconMap: Record<string, LucideIcon> = {
    'User': User,
    'Shirt': Shirt,
    'Wallet': Wallet,
    'Layers': Layers,
    'Briefcase': Briefcase,
    'Backpack': Backpack,
    'Package': Package,
    'Box': Box,
    'MousePointer2': MousePointer2,
    'ShoppingBag': ShoppingBag,
    'Watch': Watch,
    'Gem': Gem,
    'Crown': Crown,
    'Sparkles': Sparkles,
    'Grid': Grid,
    'Glasses': Glasses,
    'Circle': Circle,
    'Calendar': Calendar,
    'Flame': Flame,
    'Star': Star
};

interface Category {
    label: string;
    iconName: string;
}

interface CategoryProductSectionProps {
    categories: Category[];
}

export default function CategoryProductSection({ categories }: CategoryProductSectionProps) {
    const [selectedCats, setSelectedCats] = useState<string[]>([]);
    const [priceSort, setPriceSort] = useState<'default' | 'asc' | 'desc'>('default');
    const [activeFilter, setActiveFilter] = useState('NEW ARRIVALS');

    // Seed for randomization to ensure stable hydration but reshuffle on filter change
    const [randomSeed, setRandomSeed] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    // Show first 4 items on mobile unless expanded
    // const visibleCategories = isExpanded ? categories : categories.slice(0, 4);
    // FIXED: Use CSS to hide items on mobile, render all for desktop.
    const visibleCategories = categories;

    // Derived state
    const filteredProducts = useMemo(() => {
        let result: any[] = [];

        // 1. Logic for Categories: "Randomly allot 3-6 items"
        if (selectedCats.length > 0) {
            selectedCats.forEach(catLabel => {
                // Create a deterministic but "random-looking" subset for this category
                // We use the category label + randomSeed to mix it up
                const catSeed = catLabel.charCodeAt(0) + catLabel.length + randomSeed;

                // Determine how many items (3 to 6)
                const count = 3 + (catSeed % 4);

                // Shuffle PRODUCTS roughly based on this seed and pick 'count' items
                // We map to add a sort key, sort, then slice
                const subset = [...PRODUCTS]
                    .map((p, i) => ({ p, sort: (p.id.charCodeAt(0) + i + catSeed) % 100 }))
                    .sort((a, b) => a.sort - b.sort)
                    .slice(0, count)
                    .map(item => item.p);

                result = [...result, ...subset];
            });
        } else {
            // No category selected, show all? Or just randomized view? 
            // Usually "All" means everything.
            result = [...PRODUCTS];
        }

        // 2. Sort Logic
        // User wants "Price... work accurately". Others "randomize".
        if (activeFilter === 'PRICE') {
            // Price sort overrides everything to be accurate on the current set
            if (priceSort === 'asc') {
                result.sort((a, b) => a.price - b.price);
            } else if (priceSort === 'desc') {
                result.sort((a, b) => b.price - a.price);
            }
        } else {
            // For other filters (NEW ARRIVALS, BESTSELLER, MOST LIKED, DISCOUNT) or just default view
            // Randomize the result list to look dynamic
            // Simple pseudo-random shuffle
            result.sort((a, b) => {
                return (a.id.charCodeAt(0) * 1000 + parseInt(a.id.slice(1) || '0', 10) + randomSeed) % 2 === 0 ? 1 : -1;
            });
        }

        return result;
    }, [selectedCats, priceSort, activeFilter, randomSeed]);

    const toggleCategory = (label: string) => {
        setSelectedCats(prev =>
            prev.includes(label)
                ? prev.filter(c => c !== label)
                : [...prev, label]
        );
        setRandomSeed(prev => prev + 1); // Shuffle when categories change too
    };

    const handleFilterClick = (filter: string) => {
        setActiveFilter(filter);
        setRandomSeed(prev => prev + 1);
        if (filter !== 'PRICE') {
            setPriceSort('default');
        }
    };

    const togglePriceSort = () => {
        setActiveFilter('PRICE');
        setPriceSort(prev => {
            if (prev === 'default') return 'desc';
            if (prev === 'desc') return 'asc';
            return 'default';
        });
        setDiscountSort('default');
    };

    const [discountSort, setDiscountSort] = useState<'default' | 'asc' | 'desc'>('default');
    const toggleDiscountSort = () => {
        setActiveFilter('DISCOUNT');
        setDiscountSort(prev => {
            if (prev === 'default') return 'desc';
            if (prev === 'desc') return 'asc';
            return 'default';
        });
        setPriceSort('default');
        setRandomSeed(prev => prev + 1);
    };

    return (
        <div>
            {/* Filter UI (Replicated from CategoryFilter but interactive) */}
            <div className={styles.container}>
                <div className={`${styles.categories} ${isExpanded ? styles.expanded : ''}`}>
                    {visibleCategories.map((cat) => {
                        const Icon = iconMap[cat.iconName] || Box;
                        const isActive = selectedCats.includes(cat.label);
                        return (
                            <div
                                key={cat.label}
                                className={`${styles.categoryItem} ${isActive ? styles.catActive : ''}`}
                                onClick={() => toggleCategory(cat.label)}
                                style={{ cursor: 'pointer', opacity: isActive ? 1 : 0.7 }}
                            >
                                <Icon className={styles.catIcon} color={isActive ? 'black' : '#666'} />
                                <span className={styles.catLabel} style={{ fontWeight: isActive ? 700 : 400 }}>{cat.label}</span>
                            </div>
                        );
                    })}
                    {!isExpanded && categories.length > 3 && (
                        <div className={`${styles.categoryItem} ${styles.mobileToggle}`} onClick={() => setIsExpanded(true)}>
                            <Layers className={styles.catIcon} />
                            <span className={styles.catLabel}>MORE</span>
                        </div>
                    )}
                    {isExpanded && (
                        <div className={`${styles.categoryItem} ${styles.mobileToggle}`} onClick={() => setIsExpanded(false)}>
                            <ArrowUp className={styles.catIcon} />
                            <span className={styles.catLabel}>LESS</span>
                        </div>
                    )}
                </div>

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
                        className={`${styles.pill} ${activeFilter === 'PRICE' ? styles.active : ''}`}
                        onClick={togglePriceSort}
                    >
                        PRICE
                        {priceSort === 'desc' && <ArrowUp size={14} style={{ marginLeft: 4 }} />}
                        {priceSort === 'asc' && <ArrowDown size={14} style={{ marginLeft: 4 }} />}
                        {priceSort === 'default' && <ArrowUpDown size={14} style={{ marginLeft: 4 }} />}
                    </button>

                    <button
                        className={`${styles.pill} ${activeFilter === 'MOST LIKED' ? styles.active : ''}`}
                        onClick={() => handleFilterClick('MOST LIKED')}
                    >
                        MOST LIKED
                    </button>

                    <button
                        className={`${styles.pill} ${activeFilter === 'DISCOUNT' ? styles.active : ''}`}
                        onClick={toggleDiscountSort}
                    >
                        DISCOUNT
                        {discountSort === 'desc' && <ArrowUp size={14} style={{ marginLeft: 4 }} />}
                        {discountSort === 'asc' && <ArrowDown size={14} style={{ marginLeft: 4 }} />}
                        {discountSort === 'default' && <ArrowUpDown size={14} style={{ marginLeft: 4 }} />}
                    </button>
                </div>
            </div>

            {/* Grid */}
            <ProductGrid products={filteredProducts} />
        </div>
    );
}
