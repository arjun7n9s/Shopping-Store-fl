'use client';

import CategoryNavbar from '@/components/CategoryNavbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
    const { items, removeFromCart, subtotal } = useCart();

    return (
        <main style={{ backgroundColor: '#FFF7F1', minHeight: '100vh' }}>
            <CategoryNavbar />
            <div style={{ paddingTop: '140px', paddingBottom: '4rem', maxWidth: '1200px', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
                <h1 style={{ fontFamily: 'var(--font-anton)', fontSize: '3rem', color: '#1a1a1a', marginBottom: '2rem' }}>YOUR CART</h1>

                {items.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                        <p style={{ fontFamily: 'var(--font-roboto-mono)', color: '#666', fontSize: '1.2rem', marginBottom: '2rem' }}>
                            Your bag is currently empty.
                        </p>
                        <Link href="/" style={{ textDecoration: 'underline', color: '#1a1a1a', fontFamily: 'var(--font-roboto-mono)', fontSize: '1.2rem' }}>
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                        {/* Cart Items List */}
                        <div style={{ flex: 2, minWidth: '60%' }}>
                            <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-roboto-mono)', color: '#666' }}>
                                <span>PRODUCT</span>
                                <span>TOTAL</span>
                            </div>

                            {items.map((item) => (
                                <div key={item.cartId} style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                                    <div style={{ width: '100px', height: '120px', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '0.8rem' }}>
                                        IMG
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <h3 style={{ fontFamily: 'var(--font-anton)', fontSize: '1.2rem', margin: 0 }}>{item.name}</h3>
                                            <span style={{ fontFamily: 'var(--font-roboto-mono)', fontWeight: 'bold' }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                        <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>Size: {item.selectedSize}</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                                            <div style={{ border: '1px solid #ddd', padding: '0.2rem 0.8rem', fontSize: '0.9rem' }}>
                                                Qty: {item.quantity}
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.cartId)}
                                                style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '0.5rem', color: '#999', transition: 'color 0.2s' }}
                                                onMouseOver={(e) => e.currentTarget.style.color = 'red'}
                                                onMouseOut={(e) => e.currentTarget.style.color = '#999'}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div style={{ flex: 1, backgroundColor: 'white', padding: '2rem', height: 'fit-content', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                            <h2 style={{ fontFamily: 'var(--font-anton)', fontSize: '1.5rem', marginTop: 0, marginBottom: '2rem' }}>ORDER SUMMARY</h2>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontFamily: 'var(--font-roboto-mono)' }}>
                                <span style={{ color: '#666' }}>Subtotal</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontFamily: 'var(--font-roboto-mono)' }}>
                                <span style={{ color: '#666' }}>Shipping</span>
                                <span>Calculated at checkout</span>
                            </div>
                            <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontFamily: 'var(--font-roboto-mono)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                <span>Total</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <button style={{ width: '100%', backgroundColor: 'black', color: 'white', border: 'none', padding: '1rem', fontFamily: 'var(--font-anton)', fontSize: '1rem', letterSpacing: '1px', cursor: 'pointer' }}>
                                CHECKOUT
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
