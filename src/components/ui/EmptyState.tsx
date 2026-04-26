// src/components/ui/EmptyState.tsx
import styles from './EmptyState.module.css';

interface Props {
  emoji?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function EmptyState({ emoji = '🛒', title, subtitle, action }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.emoji}>{emoji}</div>
      <h3 className={styles.title}>{title}</h3>
      {subtitle && <p className={styles.sub}>{subtitle}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
