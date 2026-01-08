'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Linkedin, ArrowRight, ChevronUp } from 'lucide-react';
import styles from './Footer.module.css';
import logoImg from './shopping-store-logo.png'; // Renamed file import

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.topSection}>
                {/* Brand Column */}
                <div className={styles.brandColumn}>
                    <div className={styles.logoWrapper}>
                        <Link href="/">
                            <Image src={logoImg} alt="SHOPPING STORE" className={styles.logo} width={200} height={50} style={{ objectFit: 'contain' }} />
                        </Link>
                    </div>
                    <div className={styles.socials}>
                        <Link href="#"><Facebook className={styles.socialIcon} /></Link>
                        <Link href="#"><Instagram className={styles.socialIcon} /></Link>
                        <Link href="#"><Twitter className={styles.socialIcon} /></Link>
                        <Link href="#"><Linkedin className={styles.socialIcon} /></Link>
                    </div>
                </div>

                {/* Links Columns */}
                <div className={styles.linksColumn}>
                    <h3 className={styles.columnTitle}>SHOP</h3>
                    <ul className={styles.linkList}>
                        <li className={styles.linkItem}><Link href="/best-sellers" className={styles.link}>Best Sellers</Link></li>
                        <li className={styles.linkItem}><Link href="/new-arrivals" className={styles.link}>New Arrivals</Link></li>
                        <li className={styles.linkItem}><Link href="/men" className={styles.link}>Men's Collection</Link></li>
                        <li className={styles.linkItem}><Link href="/women" className={styles.link}>Women's Collection</Link></li>
                        <li className={styles.linkItem}><Link href="/accessories" className={styles.link}>Accessories</Link></li>
                    </ul>
                </div>

                <div className={styles.linksColumn}>
                    <h3 className={styles.columnTitle}>TRENDING</h3>
                    <ul className={styles.linkList}>
                        <li className={styles.linkItem}><Link href="/winter-essentials" className={styles.link}>Winter Essentials</Link></li>
                        <li className={styles.linkItem}><Link href="/street-style" className={styles.link}>Streetwear Edit</Link></li>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Oversized Fits</Link></li>
                        <li className={styles.linkItem}><Link href="#" className={styles.link}>Party Wear</Link></li>
                        <li className={styles.linkItem}><Link href="/casual-wear" className={styles.link}>Basics</Link></li>
                    </ul>
                </div>

                <div className={styles.linksColumn}>
                    <h3 className={styles.columnTitle}>INFO</h3>
                    <ul className={styles.linkList}>
                        <li className={styles.linkItem}><Link href="/track-order" className={styles.link}>Track Order</Link></li>
                        <li className={styles.linkItem}><Link href="/info" className={styles.link}>Terms & Conditions</Link></li>
                        <li className={styles.linkItem}><Link href="/info" className={styles.link}>Privacy Policy</Link></li>
                        <li className={styles.linkItem}><Link href="/info" className={styles.link}>Shipping Policy</Link></li>
                        <li className={styles.linkItem}><Link href="/returns" className={styles.link}>Returns & Refunds</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className={styles.newsletterColumn}>
                    <h3 className={styles.newsletterTitle}>WE'VE GOT YOU COVERED</h3>
                    <p className={styles.newsletterText}>
                        Beyond the Outfit: Be the first to know about new arrivals, sales & exclusive drops.
                    </p>
                    <div className={styles.inputGroup}>
                        <input type="email" placeholder="Email" className={styles.emailInput} />
                        <button className={styles.submitBtn}>
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className={styles.bottomSection}>
                <div className={styles.bottomLinks}>
                    <Link href="/" className={styles.bottomLink}>Explore</Link>
                    <Link href="/search" className={styles.bottomLink}>Search</Link>
                    <Link href="/info" className={styles.bottomLink}>Return</Link>
                    <Link href="/info" className={styles.bottomLink}>About Us</Link>
                </div>

                <div className={styles.scrollToTop} onClick={scrollToTop}>
                    <ChevronUp size={24} />
                </div>
            </div>
        </footer>
    );
}
