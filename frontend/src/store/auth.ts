import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = { id: number; email: string; name: string; role: string };

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null, token: null,
      setAuth: (user, token) => {
        if (typeof window !== 'undefined') localStorage.setItem('maz_token', token);
        set({ user, token });
      },
      logout: () => {
        if (typeof window !== 'undefined') localStorage.removeItem('maz_token');
        set({ user: null, token: null });
      },
    }),
    { name: 'maz-auth' }
  )
);
