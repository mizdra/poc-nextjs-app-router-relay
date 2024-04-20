import styles from './Card.module.css';

export function Card({ children }: { children: React.ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
