// src/store/langStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Lang } from '../i18n/translations';

interface LangState {
  lang: Lang;
  toggle: () => void;
}

export const useLangStore = create<LangState>()(
  persist(
    (set, get) => ({
      lang: 'en' as Lang,
      toggle: () => set({ lang: get().lang === 'en' ? 'hi' : 'en' }),
    }),
    { name: 'dns-lang' }
  )
);

// ─── Order Store ─────────────────────────────────────────────────────────────
import type { CustomerInfo, DeliveryMode } from '../types';

interface OrderState {
  orderRef: string | null;
  phone: string | null;
  customer: CustomerInfo | null;
  deliveryMode: DeliveryMode;
  setOrder: (ref: string, phone: string, customer: CustomerInfo, mode: DeliveryMode) => void;
  clearOrder: () => void;
}

export const useOrderStore = create<OrderState>()((set) => ({
  orderRef: null,
  phone: null,
  customer: null,
  deliveryMode: 'delivery',
  setOrder: (ref, phone, customer, mode) =>
    set({ orderRef: ref, phone, customer, deliveryMode: mode }),
  clearOrder: () =>
    set({ orderRef: null, phone: null, customer: null, deliveryMode: 'delivery' }),
}));
