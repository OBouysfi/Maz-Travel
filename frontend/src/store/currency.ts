import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CurrencyState {
  currency: 'MAD' | 'EUR' | 'USD';
  setCurrency: (c: 'MAD' | 'EUR' | 'USD') => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({ currency: 'MAD', setCurrency: (c) => set({ currency: c }) }),
    { name: 'maz-currency' }
  )
);
