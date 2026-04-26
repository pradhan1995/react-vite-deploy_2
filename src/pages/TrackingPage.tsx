// src/pages/TrackingPage.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useT } from '../hooks/useT';
import { api } from '../api';
import { formatCurrency, formatDate } from '../utils/format';
import { fireConfetti } from '../utils/confetti';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Spinner } from '../components/ui/Spinner';
import type { TrackingInfo, OrderStatus } from '../types';
import styles from './TrackingPage.module.css';

const STATUS_ORDER: OrderStatus[] = ['verified', 'accepted', 'paid', 'shipped', 'delivered'];

const STATUS_META: Record<OrderStatus, { emoji: string; labelKey: string; descKey: string }> = {
  verified: { emoji: '✅', labelKey: 'statusVerified', descKey: 'descVerified' },
  accepted: { emoji: '📦', labelKey: 'statusAccepted', descKey: 'descAccepted' },
  paid:     { emoji: '💳', labelKey: 'statusPaid',     descKey: 'descPaid'     },
  shipped:  { emoji: '🚚', labelKey: 'statusShipped',  descKey: 'descShipped'  },
  delivered:{ emoji: '🎉', labelKey: 'statusDelivered',descKey: 'descDelivered'},
};

export default function TrackingPage() {
  const t = useT();
  const { orderRef: paramRef } = useParams<{ orderRef?: string }>();
  const navigate = useNavigate();
  const [inputRef, setInputRef] = useState(paramRef || '');
  const [data, setData] = useState<TrackingInfo | null>(null);
  const [loading, setLoading] = useState(!!paramRef);
  const [error, setError] = useState('');
  const [confettiFired, setConfettiFired] = useState(false);

  useEffect(() => {
    if (paramRef) fetchTracking(paramRef);
  }, [paramRef]);

  useEffect(() => {
    if (data?.status === 'delivered' && !confettiFired) {
      fireConfetti();
      setConfettiFired(true);
    }
  }, [data?.status, confettiFired]);

  async function fetchTracking(ref: string) {
    setLoading(true); setError('');
    try {
      const info = await api.trackOrder(ref);
      setData(info);
    } catch (e) {
      setError('Order not found. Please check your reference number.');
    } finally {
      setLoading(false);
    }
  }

  const handleTrack = () => {
    if (!inputRef.trim()) return;
    navigate(`/track/${inputRef.trim()}`);
    if (inputRef.trim() === paramRef) fetchTracking(inputRef.trim());
  };

  const currentIndex = data ? STATUS_ORDER.indexOf(data.status) : -1;

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <button className={styles.back} onClick={() => navigate('/')}>← {t('home')}</button>
        <h1 className={styles.title}>{t('trackOrder')}</h1>

        {/* Search bar */}
        <div className={styles.searchBar}>
          <input
            value={inputRef}
            onChange={(e) => setInputRef(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
            placeholder="DNS123456"
            className={styles.refInput}
          />
          <Button onClick={handleTrack} loading={loading}>{t('trackBtn')}</Button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        {loading && !data && <Spinner />}

        {data && (
          <div className={styles.trackContent}>
            {/* Header */}
            <div className={styles.orderHeader}>
              <div>
                <div className={styles.refLabel}>{t('orderRef')}</div>
                <div className={styles.refValue}>{data.orderRef}</div>
              </div>
              <Badge variant={data.status === 'delivered' ? 'green' : data.status === 'shipped' ? 'purple' : 'muted'}>
                {STATUS_META[data.status].emoji} {t(STATUS_META[data.status].labelKey as Parameters<typeof t>[0])}
              </Badge>
            </div>

            {/* Pay now button */}
            {data.status === 'accepted' && data.paymentLink && (
              <a href={data.paymentLink} target="_blank" rel="noopener noreferrer" className={styles.payLink}>
                <Button variant="success" size="lg" fullWidth>
                  💳 {t('payNow')} — {formatCurrency(data.total)}
                </Button>
              </a>
            )}

            {/* Timeline */}
            <div className={styles.timelineCard}>
              <h2 className={styles.cardTitle}>{t('orderTimeline')}</h2>
              <div className={styles.timeline}>
                {STATUS_ORDER.map((status, idx) => {
                  const isDone = idx <= currentIndex;
                  const isCurrent = idx === currentIndex;
                  const meta = STATUS_META[status];
                  const timelineEntry = data.timeline.find((e) => e.status === status);

                  return (
                    <div key={status} className={`${styles.step} ${isDone ? styles.done : ''} ${isCurrent ? styles.current : ''}`}>
                      <div className={styles.stepLeft}>
                        <div className={styles.dot}>
                          {isDone ? <span>{meta.emoji}</span> : <span className={styles.dotInner} />}
                        </div>
                        {idx < STATUS_ORDER.length - 1 && (
                          <div className={`${styles.line} ${idx < currentIndex ? styles.lineDone : ''}`} />
                        )}
                      </div>
                      <div className={styles.stepContent}>
                        <div className={styles.stepLabel}>{t(meta.labelKey as Parameters<typeof t>[0])}</div>
                        <div className={styles.stepDesc}>{t(meta.descKey as Parameters<typeof t>[0])}</div>
                        {timelineEntry && (
                          <div className={styles.stepTime}>{formatDate(timelineEntry.timestamp)}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shipping info */}
            {data.status === 'shipped' && data.shippingInfo && (
              <div className={styles.shippingCard}>
                <h2 className={styles.cardTitle}>{t('shippingDetails')}</h2>
                <div className={styles.shippingRows}>
                  <div className={styles.shippingRow}>
                    <span>{t('carrier')}</span>
                    <span>{data.shippingInfo.carrier}</span>
                  </div>
                  <div className={styles.shippingRow}>
                    <span>{t('trackingId')}</span>
                    <span className={styles.trackId}>{data.shippingInfo.trackingId}</span>
                  </div>
                  <div className={styles.shippingRow}>
                    <span>{t('estimatedDelivery')}</span>
                    <span>{data.shippingInfo.estimatedDelivery}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Items */}
            <div className={styles.itemsCard}>
              <h2 className={styles.cardTitle}>{t('orderSummary')}</h2>
              <div className={styles.orderItems}>
                {data.items.map((item) => (
                  <div key={item.productId} className={styles.orderItem}>
                    <span className={styles.oiName}>{item.name}</span>
                    <span className={styles.oiQty}>×{item.quantity}</span>
                    <span className={styles.oiPrice}>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className={styles.totalLine}>
                <span>{t('total')}</span>
                <span className={styles.totalAmt}>{formatCurrency(data.total)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
