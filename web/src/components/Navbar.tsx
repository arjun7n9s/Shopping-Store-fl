'use client';

import Link from 'next/link';
import { User, Heart, Wallet, Search, ShoppingBag, X, Menu } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SideDrawer from './SideDrawer';
import styles from './Navbar.module.css';
import { useCart } from '@/context/CartContext';

interface NavbarProps {
  titleFont: string;
  textColor?: string;
  showBrand?: boolean;
}

export default function Navbar({
  titleFont = 'var(--font-roboto-mono)',
  textColor = 'white',
  showBrand = true
}: NavbarProps) {
  const [activeDrawer, setActiveDrawer] = useState<'wishlist' | 'wallet' | 'mobileMenu' | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { items, cartCount, subtotal, isCartOpen, openCart, closeCart, removeFromCart } = useCart();

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <nav className={styles.navbar} style={{ color: textColor }}>
        {/* Left Section - Desktop Menu & Mobile Hamburger */}
        <div className={styles.left}>
          <Link href="/women" className={styles.navLink}>Women</Link>
          <Link href="/men" className={styles.navLink}>Men</Link>
          <Link href="/accessories" className={styles.navLink}>Accessories</Link>
        </div>
        
        <button className={styles.menuBtn} onClick={() => setActiveDrawer('mobileMenu')}>
            <Menu className={styles.icon} />
        </button>

        <div className={styles.center}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 className={styles.brand} style={{ fontFamily: titleFont, opacity: showBrand ? 1 : 0, pointerEvents: showBrand ? 'auto' : 'none', transition: 'all 0.3s ease' }}>
              SHOPPING STORE
            </h1>
          </Link>
        </div>

        <div className={styles.right}>
          <Link href="/account"><User className={styles.icon} /></Link>
          <div onClick={() => setActiveDrawer('wishlist')}><Heart className={styles.icon} /></div>
          <div onClick={() => setActiveDrawer('wallet')}><Wallet className={styles.icon} /></div>

          {/* Search Wrapper ... */}
          <motion.div
            className={styles.searchWrapper}
            initial={false}
            animate={{ width: isSearchOpen ? 300 : 24, backgroundColor: isSearchOpen ? "rgba(255, 255, 255, 0.1)" : "transparent", padding: isSearchOpen ? "0 10px" : "0" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={handleSearchClick}
          >
            <Search className={styles.icon} style={{ minWidth: '24px' }} />
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.searchContent}>
                  <input ref={searchInputRef} type="text" placeholder="Type to search..." className={styles.searchInput} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onClick={(e) => e.stopPropagation()} />
                  <button onClick={closeSearch} className={styles.searchCloseBtn}><X size={16} /></button>
                  {searchQuery.length > 0 && (
                    <div className={styles.suggestions}>
                      <div className={styles.suggestionItem}>"Summer Collection"</div>
                      <div className={styles.suggestionItem}>"Men's Hoodies"</div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div onClick={openCart} className={styles.bagContainer}>
            <ShoppingBag className={styles.icon} />
            {cartCount > 0 && <span className={styles.badge} style={{ backgroundColor: textColor === 'white' ? 'white' : 'black', color: textColor === 'white' ? 'black' : 'white' }}>{cartCount}</span>}
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <SideDrawer isOpen={isCartOpen} onClose={closeCart} title={`YOUR CART (${cartCount})`}>
        {items.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>Your cart is empty.</div>
        ) : (
          items.map(item => (
            <div key={item.cartId} className={styles.drawerItem}>
              <div className={styles.itemImgPlaceholder} style={{ background: '#eee' }}>IMG</div>
              {/* Ideally use Image component with item.images[0] */}
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
          <button className={styles.viewCartBtn}>Add Funds</button>
        </div>
      </SideDrawer>

      <SideDrawer isOpen={activeDrawer === 'mobileMenu'} onClose={() => setActiveDrawer(null)} title="MENU">
        <div className={styles.drawerItem} style={{ flexDirection: 'column', gap: '1.5rem', fontSize: '1.2rem' }}>
             <Link href="/women" onClick={() => setActiveDrawer(null)} className={styles.navLink}>WOMEN</Link>
             <Link href="/men" onClick={() => setActiveDrawer(null)} className={styles.navLink}>MEN</Link>
             <Link href="/accessories" onClick={() => setActiveDrawer(null)} className={styles.navLink}>ACCESSORIES</Link>
             <hr style={{borderColor: '#eee'}} />
             <Link href="/account" onClick={() => setActiveDrawer(null)} className={styles.navLink}>MY ACCOUNT</Link>
             <Link href="/wishlist" onClick={() => setActiveDrawer(null)} className={styles.navLink}>WISHLIST</Link>
        </div>
      </SideDrawer>
    </>
  );
}
