// src/pages/CheckoutPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useOrderStore } from '../store/langStore';
import { useT } from '../hooks/useT';
import { api } from '../api';
import { formatCurrency } from '../utils/format';
import { Button } from '../components/ui/Button';
import type { DeliveryMode, CustomerInfo } from '../types';
import styles from './CheckoutPage.module.css';

const DELIVERY_FEE = 40;

export default function CheckoutPage() {
  const t = useT();
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const setOrder = useOrderStore((s) => s.setOrder);

  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('delivery');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState<CustomerInfo>({
    name: '', email: '', phone: '', notes: '', address: '',
  });

  const total = subtotal + (deliveryMode === 'delivery' ? DELIVERY_FEE : 0);

  const update = (field: keyof CustomerInfo) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.phone) {
      setError('Please fill name and phone number.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const payload = {
        items: items.map((i) => ({ productId: i.id, name: i.name, quantity: i.quantity, price: i.price })),
        deliveryMode,
        customer: form,
        total,
      };
      const res = await api.placeOrder(payload);
      setOrder(res.orderRef, form.phone, form, deliveryMode);
      navigate('/verify');
    } catch (e) {
      setError((e as Error).message || 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <button className={styles.back} onClick={() => navigate(-1)}>← {t('back')}</button>
        <h1 className={styles.title}>{t('checkout')}</h1>

        <div className={styles.layout}>
          {/* Left: form */}
          <div className={styles.formCol}>
            {/* Delivery mode */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('deliveryMode')}</h2>
              <div className={styles.modeToggle}>
                <button
                  className={`${styles.modeBtn} ${deliveryMode === 'delivery' ? styles.modeActive : ''}`}
                  onClick={() => setDeliveryMode('delivery')}
                >
                  <span className={styles.modeIcon}>🚚</span>
                  <div>
                    <div className={styles.modeName}>{t('homeDelivery')}</div>
                    <div className={styles.modeNote}>{t('deliveryNote')}</div>
                  </div>
                </button>
                <button
                  className={`${styles.modeBtn} ${deliveryMode === 'pickup' ? styles.modeActive : ''}`}
                  onClick={() => setDeliveryMode('pickup')}
                >
                  <span className={styles.modeIcon}>🏪</span>
                  <div>
                    <div className={styles.modeName}>{t('selfPickup')}</div>
                    <div className={styles.modeNote}>{t('pickupNote')}</div>
                  </div>
                </button>
              </div>
            </section>

            {/* Customer details */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>{t('customerDetails')}</h2>
              <div className={styles.fields}>
                <div className={styles.field}>
                  <label className={styles.label}>{t('name')} *</label>
                  <input value={form.name} onChange={update('name')} placeholder="Rahul Kumar" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>{t('phone')} *</label>
                  <input value={form.phone} onChange={update('phone')} placeholder="98765 43210" type="tel" maxLength={10} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>{t('email')}</label>
                  <input value={form.email} onChange={update('email')} placeholder="rahul@example.com" type="email" />
                </div>
                {deliveryMode === 'delivery' && (
                  <div className={styles.field}>
                    <label className={styles.label}>{t('address')} *</label>
                    <input value={form.address} onChange={update('address')} placeholder="House no, Street, Area, City" />
                  </div>
                )}
                <div className={styles.field}>
                  <label className={styles.label}>{t('notes')}</label>
                  <textarea value={form.notes} onChange={update('notes')} placeholder={t('notesPlaceholder')} rows={3} />
                </div>
              </div>
            </section>

            {error && <div className={styles.error}>{error}</div>}
          </div>

          {/* Right: summary */}
          <div className={styles.summaryCol}>
            <div className={styles.summaryCard}>
              <h2 className={styles.sectionTitle}>{t('orderSummary')}</h2>
              <div className={styles.summaryItems}>
                {items.map((item) => (
                  <div key={item.id} className={styles.summaryItem}>
                    <span className={styles.sumEmoji}>{item.emoji}</span>
                    <span className={styles.sumName}>{item.name}</span>
                    <span className={styles.sumQty}>×{item.quantity}</span>
                    <span className={styles.sumPrice}>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className={styles.summaryRows}>
                <div className={styles.row}>
                  <span>{t('subtotal')}</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className={styles.row}>
                  <span>{t('deliveryFee')}</span>
                  <span>{deliveryMode === 'pickup' ? <span className={styles.free}>{t('free')}</span> : `+${formatCurrency(DELIVERY_FEE)}`}</span>
                </div>
                <div className={styles.divider} />
                <div className={`${styles.row} ${styles.totalRow}`}>
                  <span>{t('total')}</span>
                  <span className={styles.totalAmt}>{formatCurrency(total)}</span>
                </div>
              </div>
              <Button size="lg" fullWidth loading={loading} onClick={handleSubmit}>
                {loading ? t('placing') : t('placeOrder')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
