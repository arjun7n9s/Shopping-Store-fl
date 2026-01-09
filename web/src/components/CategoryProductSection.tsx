'use client';

import { useState, useMemo } from 'react';
import ProductGrid from './ProductGrid';
import { PRODUCTS } from '@/data/products';
import { LucideIcon, ArrowUp, ArrowDown, ArrowUpDown, MousePointer2, User, Wallet, Shirt, Briefcase, Backpack, Package, Box, Layers, ShoppingBag, Watch, Gem, Crown, Sparkles, Grid, Glasses, Circle, Calendar, Flame, Star } from 'lucide-react';
import FadeIn from './animations/FadeIn';
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
    gender?: 'Men' | 'Women';
    collection?: string; // strict filter
    limitToCollections?: boolean; // if true, only show items with a collection
}

export default function CategoryProductSection({ categories, gender, collection, limitToCollections }: CategoryProductSectionProps) {
    const [selectedCats, setSelectedCats] = useState<string[]>([]);
    const [priceSort, setPriceSort] = useState<'default' | 'asc' | 'desc'>('default');
    const [activeFilter, setActiveFilter] = useState('NEW ARRIVALS');
    const [isExpanded, setIsExpanded] = useState(false);
    const [showMoreFilters, setShowMoreFilters] = useState(false);

    // Show first 4 items on mobile unless expanded
    // const visibleCategories = isExpanded ? categories : categories.slice(0, 4);
    // FIXED: Use CSS to hide items on mobile, render all for desktop.
    const visibleCategories = categories;

    // Derived state
    const filteredProducts = useMemo(() => {
        // 1. Base Filter: Gender OR Collection
        let result = PRODUCTS.filter(p => {
            if (gender && p.category !== gender) return false;
            if (collection && p.collection !== collection) return false;
            if (limitToCollections && !p.collection) return false;
            return true;
        });

        // 2. Category Filter (SubCategory)
        // If categories are selected, filter by them.
        // We match `selectedCats` (labels like 'TSHIRTS') to `p.subCategory` or `p.collection`
        if (selectedCats.length > 0) {
            result = result.filter(p => {
                // Heuristic: Check if label matches subCategory or collection
                // e.g. "TSHIRTS" includes "T-Shirt", "JACKETS" includes "Jackets"
                const matchSub = selectedCats.some(cat =>
                    p.subCategory?.toUpperCase().includes(cat.toUpperCase().replace('S', '')) // Simple plural hack
                    || cat.toUpperCase().includes(p.subCategory?.toUpperCase())
                    || (p.collection && cat.toUpperCase() === p.collection.toUpperCase())
                );
                return matchSub;
            });
        }

        // 3. Status/Tag Filters
        if (activeFilter === 'NEW ARRIVALS') {
            result = result.filter(p => p.isNew);
        }
        // 'BESTSELLER' and 'MOST LIKED' - we don't have fields for these yet, 
        // strictly speaking. We can just show all or random subset to simulate.
        // For now, let's just show all for non-sorting filters to ensure products appear.

        // 4. Sort Logic
        if (priceSort === 'asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (priceSort === 'desc') {
            result.sort((a, b) => b.price - a.price);
        } else if (activeFilter === 'PRICE') {
            // If PRICE active but sort default (toggle logic), maybe do nothing or default sort
        }

        return result;
    }, [selectedCats, priceSort, activeFilter, gender, collection]);

    const toggleCategory = (label: string) => {
        setSelectedCats(prev =>
            prev.includes(label)
                ? prev.filter(c => c !== label)
                : [...prev, label]
        );
    };

    const handleFilterClick = (filter: string) => {
        setActiveFilter(filter);
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
    };

    return (
        <div>
            {/* Filter UI (Replicated from CategoryFilter but interactive) */}
            <FadeIn direction="down" delay={0.1}>
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

                    {/* More Filters Dropdown */}
                    <div className={styles.moreFiltersContainer}>
                        <button
                            className={styles.moreFiltersBtn}
                            onClick={() => setShowMoreFilters(!showMoreFilters)}
                        >
                            MORE FILTERS {showMoreFilters ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                        </button>

                        {showMoreFilters && (
                            <div className={styles.filterDropdown}>
                                {['Filter 1', 'Filter 2', 'Filter 3', 'Filter 4', 'Filter 5', 'Filter 6'].map((filter, i) => (
                                    <div key={i} className={styles.filterItem}>
                                        <div className={styles.filterIconBlock}>
                                            <div className={styles.filterPlaceholder}></div>
                                        </div>
                                        <span className={styles.filterTitle}>{filter}</span>
                                    </div>
                                ))}
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
            </FadeIn>

            {/* Grid */}
            <ProductGrid products={filteredProducts} />
        </div>
    );
}
