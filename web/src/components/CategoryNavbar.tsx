'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { User, Heart, Wallet, ShoppingBag, ChevronDown, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SideDrawer from './SideDrawer';
import styles from './CategoryNavbar.module.css';
import logoImg from './DarkTitle.png'; // Assuming this imports correctly
import { useCart } from '@/context/CartContext';

// Default links for Men/Fallback
const MEN_LINKS = [
    { label: 'NEW ARRIVALS', href: '/new-arrivals' },
    { label: 'BEST SELLERS', href: '/best-sellers' },
    { label: 'WINTERWEAR', hasDropdown: true, href: '/winter-essentials' },
    { label: 'CLOTHING', hasDropdown: true, href: '/men' },
    { label: 'SALE', href: '#' }
];

interface CategoryNavbarProps {
    links?: { label: string; hasDropdown?: boolean; href?: string }[];
    gender?: 'Men' | 'Women';
}

export default function CategoryNavbar({ links = MEN_LINKS, gender = 'Men' }: CategoryNavbarProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isAtTop, setIsAtTop] = useState(true);
    const [activeDrawer, setActiveDrawer] = useState<'wishlist' | 'wallet' | null>(null);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    const { items, cartCount, subtotal, isCartOpen, openCart, closeCart, removeFromCart } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Check if at top
            if (currentScrollY < 10) {
                setIsAtTop(true);
            } else {
                setIsAtTop(false);
            }

            if (currentScrollY > lastScrollY && currentScrollY > 70) {
                // Scrolling DOWN and past navbar height -> Hide
                setIsVisible(false);
            } else {
                // Scrolling UP -> Show
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const getDropdownContent = (label: string) => {
        if (label === 'CLOTHING') {
            if (gender === 'Women') {
                return [
                    { label: 'Dresses', href: '/women?category=DRESSES' },
                    { label: 'Tops & T-Shirts', href: '/women?category=TOPS' },
                    { label: 'Co-ords', href: '/women?category=CO-ORDS' },
                    { label: 'Jackets', href: '/women?category=JACKETS' },
                    { label: 'Bottoms', href: '/women?category=BOTTOMS' }
                ];
            }
            // Default Men
            return [
                { label: 'T-Shirts & Polos', href: '/men?category=TSHIRTS' },
                { label: 'Casual Shirts', href: '/men?category=SHIRTS' },
                { label: 'Jeans & Trousers', href: '/men?category=BOTTOMS' },
                { label: 'Jackets & Coats', href: '/men?category=JACKETS' },
                { label: 'Hoodies', href: '/men?category=HOODIES' }
            ];
        }
        if (label === 'WINTERWEAR') {
            return [
                { label: 'Jackets', href: '/winter-essentials?category=Jackets' },
                { label: 'Sweaters', href: '/winter-essentials?category=Sweaters' },
                { label: 'Thermals', href: '/winter-essentials?category=Thermals' },
                { label: 'Winter Coats', href: '/winter-essentials?category=Coats' }
            ];
        }
        return [
            { label: 'New Collection', href: '/new-arrivals' }
        ];
    };

    return (
        <>
            <nav className={`${styles.navbar} ${!isVisible ? styles.hidden : ''} ${isAtTop ? styles.transparent : styles.solid}`}>
                <div className={styles.topRow}>
                    <div className={`${styles.logoContainer} ${mobileSearchOpen ? styles.hideLogoOnMobile : ''}`}>
                        <Link href="/">
                            {/* Using standard img for logo if next/image gives trouble with local assets without config, but user had Image. Keeping Image. */}
                            {/* Note: User uses `import logoImg`. If it's a file in same dir, fine. */}
                            <Image src={logoImg} alt="SHOPPING STORE" className={styles.logo} height={90} width={450} style={{ objectFit: 'contain', objectPosition: 'left' }} />
                        </Link>
                    </div>

                    <div className={styles.searchContainer}>
                        {/* Desktop Search */}
                        <div className={styles.desktopSearch}>
                            <div className={styles.searchBar}>
                                <Search className={styles.searchIcon} size={18} />
                                <input
                                    type="text"
                                    placeholder="SEARCH FOR PRODUCTS"
                                    className={styles.searchInput}
                                />
                            </div>
                        </div>

                        {/* Mobile Search Icon */}
                        <div className={styles.mobileSearchToggle} onClick={() => setMobileSearchOpen(!mobileSearchOpen)}>
                            {mobileSearchOpen ? <X className={styles.icon} /> : <Search className={styles.icon} />}
                        </div>
                    </div>

                    <div className={styles.iconsContainer}>
                        <Link href="/account"><User className={styles.icon} /></Link>

                        <div onClick={() => setActiveDrawer('wishlist')}><Heart className={styles.icon} /></div>
                        <div className={styles.mobileHidden} onClick={() => setActiveDrawer('wallet')}><Wallet className={styles.icon} /></div>

                        <div onClick={openCart} className={styles.cartContainer}>
                            <ShoppingBag className={styles.icon} />
                            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
                        </div>
                    </div>
                </div>

                <div className={styles.bottomRow}>
                    {links.map((link) => {
                        const hideOnMobile = !['NEW ARRIVALS', 'BEST SELLERS', 'SALE'].includes(link.label);
                        return (
                            <div
                                key={link.label}
                                className={`${styles.navItemWrapper} ${hideOnMobile ? styles.mobileHidden : ''}`}
                                onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.label)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link href={link.href || '#'} className={styles.navLink}>
                                    {link.label}
                                    {link.hasDropdown && <ChevronDown size={14} style={{ marginLeft: '4px' }} />}
                                </Link>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {activeDropdown === link.label && (
                                        <motion.div
                                            className={styles.dropdownMenu}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {getDropdownContent(link.label).map((item) => (
                                                <Link key={item.label} href={item.href} className={styles.dropdownItemLink}>
                                                    <div className={styles.dropdownItem}>
                                                        {item.label}
                                                    </div>
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </nav>

            {/* Mobile Search Overlay/Bar */}
            <AnimatePresence>
                {mobileSearchOpen && (
                    <motion.div
                        className={styles.mobileSearchBarContainer}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                    >
                        <div className={styles.mobileSearchBar}>
                            <Search className={styles.searchIcon} size={16} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className={styles.searchInput}
                                autoFocus
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cart Drawer */}
            <SideDrawer isOpen={isCartOpen} onClose={closeCart} title={`YOUR CART (${cartCount})`}>
                {items.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Your cart is empty.</div>
                ) : (
                    items.map(item => (
                        <div key={item.cartId} className={styles.drawerItem}>
                            <div className={styles.itemImgPlaceholder} style={{ background: '#eee' }}>IMG</div>
                            <div className={styles.itemInfo}>
                                <h4>{item.name}</h4>
                                <p>₹{item.price.toLocaleString()}</p>
                                <p className={styles.qty}>Size: {item.selectedSize} | Qty: {item.quantity}</p>
                                <button onClick={() => removeFromCart(item.cartId)} style={{ fontSize: '0.8rem', color: 'red', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Remove</button>
                            </div>
                        </div>
                    ))
                )}

                {items.length > 0 && (
                    <div className={styles.drawerFooter}>
                        <div className={styles.totalRow}><span>Subtotal:</span><span>₹{subtotal.toLocaleString()}</span></div>
                        <Link href="/cart">
                            <button className={styles.viewCartBtn} onClick={closeCart}>VIEW CART</button>
                        </Link>
                    </div>
                )}
            </SideDrawer>

            <SideDrawer isOpen={activeDrawer === 'wishlist'} onClose={() => setActiveDrawer(null)} title="WISHLIST">
                <p>Your saved items will appear here.</p>
            </SideDrawer>

            <SideDrawer isOpen={activeDrawer === 'wallet'} onClose={() => setActiveDrawer(null)} title="WALLET">
                <div className={styles.walletCard}>
                    <h3>Balance</h3>
                    <h2>₹15,000.00</h2>
                    <button className={styles.viewCartBtn}>Add Funds</button>
                </div>
            </SideDrawer>
        </>
    );
}
