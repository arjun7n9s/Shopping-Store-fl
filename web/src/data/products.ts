export interface Product {
    id: string;
    name: string;
    price: number;
    category: 'Men' | 'Women';
    subCategory: 'T-Shirt' | 'Shirt' | 'Bottoms' | 'Jackets' | 'Hoodie' | 'Dress' | 'Co-ords' | 'Activewear';
    collection?: 'Marvel' | 'Anime' | 'Bands' | 'Street' | 'Minimal' | 'Activewear';
    isNew: boolean;
    isBestSeller?: boolean;
    isMostLiked?: boolean;
    description: string;
    images: string[];
    sizes: string[];
    colors: string[];
}

export const PRODUCTS: Product[] = [
    // --- MEN'S CLOTHING ---
    {
        id: 'm-1',
        name: 'Oversized Street Tee',
        price: 1299,
        category: 'Men',
        subCategory: 'T-Shirt',
        collection: 'Street',
        isNew: true, // 1/3 New
        isBestSeller: true,
        description: 'Heavyweight cotton oversized tee for the ultimate street look.',
        images: ['/products/men/tee-black.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#000000', '#FFFFFF', '#1A1A1A', '#333333', '#808080'] // More colors for swatches
    },
    {
        id: 'm-2',
        name: 'Classic Oxford Shirt',
        price: 2499,
        category: 'Men',
        subCategory: 'Shirt',
        collection: 'Minimal',
        isNew: false,
        isMostLiked: true, // The "Most Liked" one
        description: 'A timeless oxford shirt perfect for casual or semi-formal wear.',
        images: ['/products/men/shirt-blue.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#87CEEB', '#FFFFFF', '#F0F8FF', '#4682B4', '#5F9EA0'] // More colors
    },
    {
        id: 'm-3',
        name: 'Carpenter Cargo Pants',
        price: 3299,
        category: 'Men',
        subCategory: 'Bottoms',
        collection: 'Street',
        isNew: false, // Removed isNew
        isBestSeller: true,
        description: 'Relaxed fit carpenter pants with multiple utility pockets.',
        images: ['/products/men/cargo-beige.jpg'],
        sizes: ['30', '32', '34', '36'],
        colors: ['#F5F5DC', '#000000']
    },
    {
        id: 'm-4',
        name: 'Tech Fleece Hoodie',
        price: 3999,
        category: 'Men',
        subCategory: 'Hoodie',
        collection: 'Activewear',
        isNew: true, // 2/3 New
        description: 'Advanced tech fleece for warmth without weight.',
        images: ['/products/men/hoodie-grey.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#808080', '#000000']
    },
    {
        id: 'm-5',
        name: 'Denim Trucker Jacket',
        price: 4599,
        category: 'Men',
        subCategory: 'Jackets',
        collection: 'Street',
        isNew: false,
        description: 'Classic denim trucker jacket with a vintage wash.',
        images: ['/products/men/jacket-denim.jpg'],
        sizes: ['M', 'L', 'XL'],
        colors: ['#000080']
    },
    {
        id: 'm-6',
        name: 'Marvel Retro Comic Tee',
        price: 1499,
        category: 'Men',
        subCategory: 'T-Shirt',
        collection: 'Marvel',
        isNew: true,
        description: 'Official Marvel merchandise featuring vintage comic art.',
        images: ['/products/men/marvel-tee.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#1A1A1A']
    },
    {
        id: 'm-7',
        name: 'Naruto Shippuden Hoodie',
        price: 2999,
        category: 'Men',
        subCategory: 'Hoodie',
        collection: 'Anime',
        isNew: true,
        description: 'Premium hoodie featuring Akatsuki cloud embroidery.',
        images: ['/products/men/anime-hoodie.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#000000']
    },

    // --- WOMEN'S CLOTHING ---
    {
        id: 'w-1',
        name: 'Ribbed Crop Top',
        price: 999,
        category: 'Women',
        subCategory: 'T-Shirt',
        collection: 'Minimal',
        isNew: true, // 3/3 New
        isBestSeller: true,
        description: 'Essential ribbed crop top, perfect for layering.',
        images: ['/products/women/crop-white.jpg'],
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['#FFFFFF', '#000000', '#FFB6C1']
    },
    {
        id: 'w-2',
        name: 'Floral Summer Dress',
        price: 2999,
        category: 'Women',
        subCategory: 'Dress',
        isNew: true,
        description: 'Lightweight floral dress for sunny days.',
        images: ['/products/women/dress-floral.jpg'],
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['#FFC0CB']
    },
    {
        id: 'w-3',
        name: 'Wide Leg Jeans',
        price: 2499,
        category: 'Women',
        subCategory: 'Bottoms',
        collection: 'Street',
        isNew: false,
        isBestSeller: false,
        description: 'High-waisted wide leg jeans with a relaxed fit.',
        images: ['/products/women/jeans-blue.jpg'],
        sizes: ['26', '28', '30', '32'],
        colors: ['#87CEEB']
    },
    {
        id: 'w-4',
        name: 'Co-ord Blazer Set',
        price: 4999,
        category: 'Women',
        subCategory: 'Co-ords',
        collection: 'Minimal',
        isNew: true,
        description: 'Matching blazer and trouser set for a power look.',
        images: ['/products/women/coord-beige.jpg'],
        sizes: ['S', 'M', 'L'],
        colors: ['#F5F5DC']
    },
    {
        id: 'w-5',
        name: 'Oversized Nirvana Tee',
        price: 1599,
        category: 'Women',
        subCategory: 'T-Shirt',
        collection: 'Bands',
        isNew: false,
        description: 'Vintage wash Nirvana band tee.',
        images: ['/products/women/band-tee.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#333333']
    },
    {
        id: 'w-6',
        name: 'Puffer Jacket',
        price: 3499,
        category: 'Women',
        subCategory: 'Jackets',
        collection: 'Activewear',
        isNew: true,
        description: 'Cropped puffer jacket for cold evenings.',
        images: ['/products/women/puffer-black.jpg'],
        sizes: ['S', 'M', 'L'],
        colors: ['#000000']
    },

    // --- GENERIC FILLER (Generated) ---
    ...Array.from({ length: 10 }).map((_, i) => ({
        id: `gen-m-${i}`,
        name: `Men's Essential ${i + 1}`,
        price: 1500 + i * 200,
        category: 'Men' as const,
        subCategory: (i % 2 === 0 ? 'T-Shirt' : 'Bottoms') as 'T-Shirt' | 'Bottoms',
        collection: 'Minimal' as const,
        isNew: i % 3 === 0,
        description: 'High quality essential wear.',
        images: [`/products/men/gen-${i}.jpg`],
        sizes: ['M', 'L', 'XL'],
        colors: ['#000000']
    })),
    ...Array.from({ length: 10 }).map((_, i) => ({
        id: `gen-w-${i}`,
        name: `Women's Style ${i + 1}`,
        price: 1500 + i * 200,
        category: 'Women' as const,
        subCategory: (i % 2 === 0 ? 'Dress' : 'T-Shirt') as 'Dress' | 'T-Shirt',
        collection: 'Minimal' as const,
        isNew: i % 3 === 0,
        description: 'Chic and stylish.',
        images: [`/products/women/gen-${i}.jpg`],
        sizes: ['S', 'M', 'L'],
        colors: ['#FFFFFF']
    }))
];
