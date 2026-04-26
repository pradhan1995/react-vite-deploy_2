// src/components/ui/Button.tsx
import { type ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  children, variant = 'primary', size = 'md',
  loading, fullWidth, className, disabled, ...rest
}: Props) {
  return (
    <button
      className={clsx(styles.btn, styles[variant], styles[size], fullWidth && styles.full, className)}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <span className={styles.spinner} />}
      {children}
    </button>
  );
}
