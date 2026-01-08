export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    isNew: boolean;
    description: string;
    images: string[];
    sizes: string[];
    colors: string[];
}

export const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Urban Oversized Tee',
        price: 1999,
        category: 'Clothing',
        isNew: true,
        description: 'Crafted from premium heavyweight cotton, this oversized tee redefines street comfort. Features dropped shoulders and a boxy fit for that iconic urban silhouette.',
        images: ['/products/tee-black-1.jpg', '/products/tee-black-2.jpg'], // Using placeholders in UI if these don't exist
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['#000000', '#FFFFFF', '#555555']
    },
    {
        id: '2',
        name: 'Tech Fleece Joggers',
        price: 2499,
        category: 'Clothing',
        isNew: false,
        description: 'Engineered for movement. These tech fleece joggers combine sleek aesthetics with functional warmth. Tapered fit with zippered pockets.',
        images: ['/products/jogger-1.jpg'],
        sizes: ['M', 'L', 'XL'],
        colors: ['#1A1A1A', '#333333']
    },
    {
        id: '3',
        name: 'Signature Hoodie',
        price: 3999,
        category: 'Clothing',
        isNew: true,
        description: 'The ultimate essential. Double-layered hood, kangaroo pocket, and ribbed cuffs. Made to last and fade beautifully over time.',
        images: ['/products/hoodie-1.jpg'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['#000000', '#aaaaaa', '#003366']
    },
    {
        id: '4',
        name: 'Classic Dad Cap',
        price: 999,
        category: 'Accessories',
        isNew: false,
        description: 'Low profile, adjustable strap, and curved visor. The perfect finishing touch to any casual outfit.',
        images: ['/products/cap-1.jpg'],
        sizes: ['One Size'],
        colors: ['#000000', '#FFFFFF', '#004400']
    },
    // Generating more to fill the grid
    ...Array.from({ length: 8 }).map((_, i) => ({
        id: `gen-${i + 5}`,
        name: `Street Essential ${i + 1}`,
        price: 1500 + i * 100,
        category: i % 2 === 0 ? 'Clothing' : 'Accessories',
        isNew: i % 3 === 0,
        description: 'A staple piece for your wardrobe. Minimalist design meets maximum durability.',
        images: [`/products/gen-${i}.jpg`],
        sizes: ['S', 'M', 'L'],
        colors: ['#000000', '#FFFFFF']
    }))
];
