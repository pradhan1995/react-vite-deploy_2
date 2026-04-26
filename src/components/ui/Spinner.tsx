// src/components/ui/Spinner.tsx
import styles from './Spinner.module.css';

export function Spinner({ size = 32 }: { size?: number }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.ring} style={{ width: size, height: size }} />
    </div>
  );
}
