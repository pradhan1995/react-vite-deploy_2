// src/components/layout/Navbar.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useLangStore } from '../../store/langStore';
import { useT } from '../../hooks/useT';
import styles from './Navbar.module.css';

export function Navbar() {
  const t = useT();
  const totalItems = useCartStore((s) => s.totalItems());
  const { lang, toggle } = useLangStore();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <span className={styles.logo}>🛒</span>
          <div>
            <div className={styles.storeName}>{t('storeName')}</div>
            <div className={styles.tagline}>{t('tagline')}</div>
          </div>
        </Link>

        <div className={styles.actions}>
          <button className={styles.langToggle} onClick={toggle} aria-label="Toggle language">
            <span className={lang === 'en' ? styles.active : styles.inactive}>EN</span>
            <span className={styles.divider}>|</span>
            <span className={lang === 'hi' ? styles.active : styles.inactive}>हि</span>
          </button>

          <button className={styles.cartBtn} onClick={() => navigate('/cart')} aria-label="Cart">
            <span className={styles.cartIcon}>🛒</span>
            {totalItems > 0 && (
              <span className={styles.badge} key={totalItems}>{totalItems}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
