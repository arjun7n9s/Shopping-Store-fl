import styles from './ProductMarquee.module.css';

const products = [
    { id: 1, name: "Oversized Anime Tee", price: "Rs. 1,299" },
    { id: 2, name: "Baggy Cargo Pants", price: "Rs. 2,499" },
    { id: 3, name: "Urban Street Hoodie", price: "Rs. 1,899" },
    { id: 4, name: "Vintage Wash Jeans", price: "Rs. 2,199" },
    { id: 5, name: "Graphic Print Shirt", price: "Rs. 1,499" },
    { id: 6, name: "Chunky Sneakers", price: "Rs. 3,999" },
];

export default function ProductMarquee() {
    return (
        <div className={styles.marqueeContainer}>
            <div className={styles.track}>
                {/* Set 1 */}
                {products.map((p) => (
                    <div key={`s1-${p.id}`} className={styles.productCard}>
                        <div className={styles.imagePlaceholder}>Product Img</div>
                        <div className={styles.details}>
                            <h3 className={styles.name}>{p.name}</h3>
                            <span className={styles.price}>{p.price}</span>
                        </div>
                    </div>
                ))}
                {/* Set 2 (Duplicate for loop) */}
                {products.map((p) => (
                    <div key={`s2-${p.id}`} className={styles.productCard}>
                        <div className={styles.imagePlaceholder}>Product Img</div>
                        <div className={styles.details}>
                            <h3 className={styles.name}>{p.name}</h3>
                            <span className={styles.price}>{p.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
