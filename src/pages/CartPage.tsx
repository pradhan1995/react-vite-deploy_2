// src/pages/CartPage.tsx
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useT } from '../hooks/useT';
import { formatCurrency } from '../utils/format';
import { QuantityStepper } from '../components/ui/QuantityStepper';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import styles from './CartPage.module.css';

const DELIVERY_FEE = 40;

export default function CartPage() {
  const t = useT();
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.inner}>
          <button className={styles.back} onClick={() => navigate(-1)}>← {t('back')}</button>
          <EmptyState
            emoji="🛒"
            title={t('emptyCart')}
            subtitle={t('emptyCartSub')}
            action={<Button onClick={() => navigate('/')}>{t('continueShopping')}</Button>}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <button className={styles.back} onClick={() => navigate(-1)}>← {t('back')}</button>
        <h1 className={styles.title}>{t('yourCart')}</h1>

        <div className={styles.layout}>
          {/* Items list */}
          <div className={styles.items}>
            {items.map((item) => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemEmoji}>{item.emoji}</div>
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemUnit}>{item.unit}</p>
                  <p className={styles.itemPrice}>{formatCurrency(item.price)}</p>
                </div>
                <div className={styles.itemActions}>
                  <QuantityStepper
                    quantity={item.quantity}
                    onIncrement={() => updateQuantity(item.id, item.quantity + 1)}
                    onDecrement={() => updateQuantity(item.id, item.quantity - 1)}
                  />
                  <div className={styles.itemTotal}>{formatCurrency(item.price * item.quantity)}</div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>{t('orderSummary')}</h2>
            <div className={styles.summaryRows}>
              <div className={styles.row}>
                <span>{t('subtotal')}</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className={styles.row}>
                <span>{t('deliveryFee')}</span>
                <span className={styles.feeNote}>+{formatCurrency(DELIVERY_FEE)}</span>
              </div>
              <div className={styles.divider} />
              <div className={`${styles.row} ${styles.totalRow}`}>
                <span>{t('total')}</span>
                <span className={styles.totalAmount}>{formatCurrency(subtotal + DELIVERY_FEE)}</span>
              </div>
            </div>
            <Button size="lg" fullWidth onClick={() => navigate('/checkout')}>
              {t('proceedToCheckout')} →
            </Button>
            <Button variant="ghost" fullWidth onClick={() => navigate('/')}>
              {t('continueShopping')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
