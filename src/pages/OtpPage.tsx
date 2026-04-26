// src/pages/OtpPage.tsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '../store/langStore';
import { useCartStore } from '../store/cartStore';
import { useT } from '../hooks/useT';
import { api } from '../api';
import { Button } from '../components/ui/Button';
import styles from './OtpPage.module.css';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

export default function OtpPage() {
  const t = useT();
  const navigate = useNavigate();
  const { orderRef, phone, clearOrder } = useOrderStore();
  const clearCart = useCartStore((s) => s.clearCart);

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(RESEND_SECONDS);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  if (!orderRef || !phone) {
    navigate('/');
    return null;
  }

  const handleChange = (index: number, value: string) => {
    const char = value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = char;
    setDigits(next);
    if (char && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (pasted.length === OTP_LENGTH) {
      setDigits(pasted.split(''));
      inputRefs.current[OTP_LENGTH - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otp = digits.join('');
    if (otp.length < OTP_LENGTH) { setError('Please enter the full 6-digit OTP.'); return; }
    setError(''); setLoading(true);
    try {
      await api.verifyOtp(orderRef, otp);
      clearCart();
      clearOrder();
      navigate(`/track/${orderRef}`);
    } catch (e) {
      setError('Invalid OTP. Please check and try again.');
      setDigits(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    try {
      await api.resendOtp(orderRef, phone);
      setCooldown(RESEND_SECONDS);
      setDigits(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    } catch {}
  };

  const maskedPhone = phone.replace(/(\d{2})\d{6}(\d{2})/, '$1••••••$2');

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>📱</div>
        <h1 className={styles.title}>{t('verifyPhone')}</h1>
        <p className={styles.sub}>{t('otpSent')} <strong>{maskedPhone}</strong></p>

        <div className={styles.inputs} onPaste={handlePaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              className={`${styles.otpInput} ${d ? styles.filled : ''}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              aria-label={`OTP digit ${i + 1}`}
            />
          ))}
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <Button size="lg" fullWidth loading={loading} onClick={handleVerify}>
          {loading ? t('verifying') : t('verify')}
        </Button>

        <button
          className={`${styles.resend} ${cooldown > 0 ? styles.resendDisabled : ''}`}
          onClick={handleResend}
          disabled={cooldown > 0}
        >
          {cooldown > 0
            ? `${t('resendIn')} ${cooldown}${t('seconds')}`
            : t('resendOtp')}
        </button>
      </div>
    </div>
  );
}
