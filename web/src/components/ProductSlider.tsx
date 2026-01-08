import styles from './ProductSlider.module.css';

interface ProductSliderProps {
    title: string;
}

const dummyProducts = [
    { id: 1, name: "Essential Tee", price: "Rs. 999" },
    { id: 2, name: "Relaxed Fit Hoodie", price: "Rs. 1,999" },
    { id: 3, name: "Carpenter Jeans", price: "Rs. 2,499" },
    { id: 4, name: "Puffer Jacket", price: "Rs. 3,499" },
    { id: 5, name: "Corduroy Shirt", price: "Rs. 1,799" },
];

export default function ProductSlider({ title }: ProductSliderProps) {
    return (
        <section className={styles.sliderContainer}>
            <header className={styles.header}>
                <h2 className={styles.heading}>{title}</h2>
            </header>

            <div className={styles.carousel}>
                <div className={styles.track}>
                    {/* Set 1 */}
                    {dummyProducts.map(p => (
                        <div key={p.id} className={styles.card}>
                            <div className={styles.image}></div>
                            <div className={styles.info}>
                                <h3 className={styles.productName}>{p.name}</h3>
                                <p className={styles.productPrice}>{p.price}</p>
                            </div>
                        </div>
                    ))}
                    {/* Set 2 */}
                    {dummyProducts.map(p => (
                        <div key={`d-${p.id}`} className={styles.card}>
                            <div className={styles.image}></div>
                            <div className={styles.info}>
                                <h3 className={styles.productName}>{p.name}</h3>
                                <p className={styles.productPrice}>{p.price}</p>
                            </div>
                        </div>
                    ))}
                    {/* Set 3 */}
                    {dummyProducts.map(p => (
                        <div key={`t-${p.id}`} className={styles.card}>
                            <div className={styles.image}></div>
                            <div className={styles.info}>
                                <h3 className={styles.productName}>{p.name}</h3>
                                <p className={styles.productPrice}>{p.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
