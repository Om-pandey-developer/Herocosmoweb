'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
  persist(
    (set, get) => ({
      darkMode: true,
      toggleTheme: () => set({ darkMode: !get().darkMode }),
    }),
    {
      name: 'herocosmos-theme',
    }
  )
);

export default useThemeStore;
