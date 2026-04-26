// src/components/ui/Badge.tsx
import clsx from 'clsx';
import styles from './Badge.module.css';

interface Props {
  children: React.ReactNode;
  variant?: 'purple' | 'green' | 'red' | 'muted';
  className?: string;
}

export function Badge({ children, variant = 'purple', className }: Props) {
  return (
    <span className={clsx(styles.badge, styles[variant], className)}>
      {children}
    </span>
  );
}
