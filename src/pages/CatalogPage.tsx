// src/pages/CatalogPage.tsx
import { useState, useMemo } from 'react';
import { useAsync, useT } from '../hooks/useT';
import { api } from '../api';
import { ProductCard } from '../components/ProductCard';
import { CategoryPills } from '../components/CategoryPills';
import { FloatingCartButton } from '../components/layout/FloatingCartButton';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import type { Category } from '../types';
import styles from './CatalogPage.module.css';

export default function CatalogPage() {
  const t = useT();
  const [category, setCategory] = useState<'all' | Category>('all');
  const [search, setSearch] = useState('');

  const { data, loading, error, refetch } = useAsync(() => api.getCatalog(), []);

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.products.filter((p) => {
      const matchCat = category === 'all' || p.category === category;
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [data, category, search]);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>🚀 Quick Delivery · 30 min</div>
          <h1 className={styles.heroTitle}>
            Fresh Groceries,<br />
            <span className={styles.accent}>Right to Your Door</span>
          </h1>
          <p className={styles.heroSub}>Kiryana essentials delivered fast · Free pickup available</p>
        </div>
        <div className={styles.heroDecor} aria-hidden>
          {['🥛', '🌾', '🍪', '🥤', '🧀'].map((e, i) => (
            <span key={i} className={styles.floatEmoji} style={{ '--i': i } as React.CSSProperties}>{e}</span>
          ))}
        </div>
      </section>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="search"
            placeholder={t('searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          {search && (
            <button className={styles.clearSearch} onClick={() => setSearch('')}>✕</button>
          )}
        </div>
        <CategoryPills selected={category} onChange={setCategory} />
      </div>

      {/* Grid */}
      <div className={styles.content}>
        {loading && <Spinner />}
        {error && (
          <EmptyState emoji="⚠️" title={t('error')} action={<Button onClick={refetch}>{t('retry')}</Button>} />
        )}
        {!loading && !error && filtered.length === 0 && (
          <EmptyState emoji="🔍" title={t('noProducts')} />
        )}
        {!loading && !error && filtered.length > 0 && (
          <div className={styles.grid}>
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      <FloatingCartButton />
    </div>
  );
}
