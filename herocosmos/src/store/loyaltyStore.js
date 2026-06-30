import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useLoyaltyStore = create(
  persist(
    (set) => ({
      coins: 500, // Initial signup bonus for demo
      history: [
        { id: 1, type: 'EARNED', amount: 500, date: new Date().toISOString(), description: 'Signup Bonus' }
      ],
      addCoins: (amount, description) =>
        set((state) => ({
          coins: state.coins + amount,
          history: [
            { id: Date.now(), type: 'EARNED', amount, date: new Date().toISOString(), description },
            ...state.history,
          ],
        })),
      redeemCoins: (amount, description) =>
        set((state) => {
          if (state.coins >= amount) {
            return {
              coins: state.coins - amount,
              history: [
                { id: Date.now(), type: 'REDEEMED', amount, date: new Date().toISOString(), description },
                ...state.history,
              ],
            };
          }
          return state;
        }),
    }),
    {
      name: 'loyalty-storage',
    }
  )
);
export const calculateTier = (coins) => {
  if (coins >= 5000) return 'Avenger';
  if (coins >= 1000) return 'Hero';
  return 'Sidekick';
};

export default useLoyaltyStore;
