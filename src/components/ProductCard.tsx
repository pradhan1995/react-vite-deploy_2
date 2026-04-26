// src/components/ProductCard.tsx
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useT } from '../hooks/useT';
import { formatCurrency } from '../utils/format';
import { QuantityStepper } from './ui/QuantityStepper';
import { Button } from './ui/Button';
import type { Product } from '../types';
import styles from './ProductCard.module.css';

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const t = useT();
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  const cartItem = items.find((i) => i.id === product.id);
  const quantity = cartItem?.quantity ?? 0;

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.imageWrap}>
        <div className={styles.emoji}>{product.emoji}</div>
        {!product.inStock && (
          <div className={styles.outOfStockOverlay}>{t('outOfStock')}</div>
        )}
      </Link>

      <div className={styles.body}>
        <Link to={`/product/${product.id}`} className={styles.nameLink}>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>
        <p className={styles.unit}>{product.unit}</p>
        <p className={styles.desc}>{product.description}</p>

        <div className={styles.footer}>
          <span className={styles.price}>{formatCurrency(product.price)}</span>
          {product.inStock ? (
            quantity > 0 ? (
              <QuantityStepper
                quantity={quantity}
                onIncrement={() => updateQuantity(product.id, quantity + 1)}
                onDecrement={() => updateQuantity(product.id, quantity - 1)}
              />
            ) : (
              <Button size="sm" onClick={() => addItem(product)}>
                + {t('addToCart')}
              </Button>
            )
          ) : (
            <Button size="sm" disabled variant="ghost">
              {t('outOfStock')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
