'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';

interface CartItem extends Product {
    cartId: string; // Unique ID for cart entry (handling variants)
    quantity: number;
    selectedSize: string;
    selectedColor: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, size: string, color: string) => void;
    removeFromCart: (cartId: string) => void;
    cartCount: number;
    subtotal: number;
    isCartOpen: boolean; // Control drawer from context easily
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Persist to local storage (Effect)
    useEffect(() => {
        const saved = localStorage.getItem('shopping-cart');
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('shopping-cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product, size: string, color: string) => {
        setItems(prev => {
            // Check if same item (id + variants) exists
            const existingIndex = prev.findIndex(item => item.id === product.id && item.selectedSize === size && item.selectedColor === color);

            if (existingIndex >= 0) {
                const newItems = [...prev];
                newItems[existingIndex].quantity += 1;
                return newItems;
            }

            return [...prev, {
                ...product,
                cartId: `${product.id}-${size}-${color}-${Date.now()}`,
                quantity: 1,
                selectedSize: size,
                selectedColor: color
            }];
        });
        setIsCartOpen(true); // Auto open drawer
    };

    const removeFromCart = (cartId: string) => {
        setItems(prev => prev.filter(item => item.cartId !== cartId));
    };

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, cartCount, subtotal, isCartOpen, openCart, closeCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
}
