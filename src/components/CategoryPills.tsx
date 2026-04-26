// src/components/CategoryPills.tsx
import { useT } from '../hooks/useT';
import type { Category } from '../types';
import styles from './CategoryPills.module.css';

const CATEGORIES: { value: 'all' | Category; emoji: string }[] = [
  { value: 'all', emoji: '🏪' },
  { value: 'Grocery', emoji: '🌾' },
  { value: 'Dairy', emoji: '🥛' },
  { value: 'Snacks', emoji: '🍿' },
  { value: 'Beverages', emoji: '🥤' },
];

interface Props {
  selected: 'all' | Category;
  onChange: (cat: 'all' | Category) => void;
}

export function CategoryPills({ selected, onChange }: Props) {
  const t = useT();

  const label = (v: 'all' | Category) => {
    if (v === 'all') return t('all');
    return t(v.toLowerCase() as 'grocery' | 'dairy' | 'snacks' | 'beverages');
  };

  return (
    <div className={styles.wrap}>
      {CATEGORIES.map(({ value, emoji }) => (
        <button
          key={value}
          className={`${styles.pill} ${selected === value ? styles.active : ''}`}
          onClick={() => onChange(value)}
        >
          <span>{emoji}</span>
          <span>{label(value)}</span>
        </button>
      ))}
    </div>
  );
}
