// src/components/ui/QuantityStepper.tsx
import styles from './QuantityStepper.module.css';

interface Props {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function QuantityStepper({ quantity, onIncrement, onDecrement }: Props) {
  return (
    <div className={styles.stepper}>
      <button className={styles.btn} onClick={onDecrement} aria-label="Decrease">−</button>
      <span className={styles.qty}>{quantity}</span>
      <button className={styles.btn} onClick={onIncrement} aria-label="Increase">+</button>
    </div>
  );
}
