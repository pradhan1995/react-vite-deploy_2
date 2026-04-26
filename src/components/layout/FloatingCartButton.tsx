// src/components/layout/FloatingCartButton.tsx
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useT } from '../../hooks/useT';
import { formatCurrency } from '../../utils/format';
import styles from './FloatingCartButton.module.css';

export function FloatingCartButton() {
  const navigate = useNavigate();
  const t = useT();
  const items = useCartStore((s) => s.items);
  const totalItems = useCartStore((s) => s.totalItems());
  const subtotal = useCartStore((s) => s.subtotal());

  if (totalItems === 0) return null;

  return (
    <button className={styles.fab} onClick={() => navigate('/cart')} aria-label="Open cart">
      <div className={styles.left}>
        <span className={styles.badge}>{totalItems}</span>
        <span className={styles.label}>{t('yourCart')}</span>
      </div>
      <div className={styles.right}>
        <span className={styles.total}>{formatCurrency(subtotal)}</span>
        <span className={styles.arrow}>→</span>
      </div>
    </button>
  );
}
