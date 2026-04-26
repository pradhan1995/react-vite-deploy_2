// src/pages/ProductDetailPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useAsync } from '../hooks/useT';
import { useT } from '../hooks/useT';
import { api } from '../api';
import { useCartStore } from '../store/cartStore';
import { QuantityStepper } from '../components/ui/QuantityStepper';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Spinner } from '../components/ui/Spinner';
import { ProductCard } from '../components/ProductCard';
import { FloatingCartButton } from '../components/layout/FloatingCartButton';
import { formatCurrency } from '../utils/format';
import styles from './ProductDetailPage.module.css';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const t = useT();

  const { data, loading, error } = useAsync(() => api.getProduct(id!), [id]);

  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const cartItem = items.find((i) => i.id === id);
  const quantity = cartItem?.quantity ?? 0;

  if (loading) return <Spinner />;
  if (error || !data) return (
    <div className={styles.errorWrap}>
      <p className={styles.errorText}>{t('error')}</p>
      <Button onClick={() => navigate(-1)}>{t('back')}</Button>
    </div>
  );

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {/* Back */}
        <button className={styles.back} onClick={() => navigate(-1)}>
          ← {t('back')}
        </button>

        {/* Product */}
        <div className={styles.product}>
          <div className={styles.imageWrap}>
            <div className={styles.imageBg}>
              <span className={styles.emoji}>{data.emoji}</span>
            </div>
            {!data.inStock && (
              <Badge variant="red" className={styles.stockBadge}>{t('outOfStock')}</Badge>
            )}
            {data.inStock && (
              <Badge variant="green" className={styles.stockBadge}>✓ In Stock</Badge>
            )}
          </div>

          <div className={styles.info}>
            <div className={styles.catBadge}>
              <Badge variant="purple">{data.category}</Badge>
              <span className={styles.unit}>{data.unit}</span>
            </div>
            <h1 className={styles.title}>{data.name}</h1>
            <p className={styles.desc}>{data.description}</p>

            <div className={styles.priceRow}>
              <span className={styles.price}>{formatCurrency(data.price)}</span>
              <span className={styles.perUnit}>per {data.unit}</span>
            </div>

            <div className={styles.actions}>
              {data.inStock ? (
                quantity > 0 ? (
                  <div className={styles.stepperRow}>
                    <QuantityStepper
                      quantity={quantity}
                      onIncrement={() => updateQuantity(data.id, quantity + 1)}
                      onDecrement={() => updateQuantity(data.id, quantity - 1)}
                    />
                    <Button variant="secondary" onClick={() => navigate('/cart')}>
                      View Cart →
                    </Button>
                  </div>
                ) : (
                  <Button size="lg" fullWidth onClick={() => addItem(data)}>
                    + {t('addToCart')}
                  </Button>
                )
              ) : (
                <Button size="lg" fullWidth disabled variant="ghost">
                  {t('outOfStock')}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Related */}
        {data.related && data.related.length > 0 && (
          <section className={styles.related}>
            <h2 className={styles.relatedTitle}>{t('relatedProducts')}</h2>
            <div className={styles.relatedGrid}>
              {data.related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <FloatingCartButton />
    </div>
  );
}
