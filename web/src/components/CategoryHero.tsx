import styles from './CategoryHero.module.css';

interface CategoryHeroProps {
    title?: string;
}

export default function CategoryHero({ title = "MEN'S COLLECTION" }: CategoryHeroProps) {
    return (
        <section className={styles.hero}>
            <h1 className={styles.title}>{title}</h1>
            {/* Placeholder content or just color */}
        </section>
    );
}
