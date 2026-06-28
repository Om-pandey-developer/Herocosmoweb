'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const items = get().items;
        if (items.find(item => item.id === product.id)) return;
        set({
          items: [...items, {
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            category: product.category,
            theme: product.theme,
          }]
        });
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter(item => item.id !== id) });
      },
      
      toggleItem: (product) => {
        const items = get().items;
        if (items.find(item => item.id === product.id)) {
          get().removeItem(product.id);
          return false;
        } else {
          get().addItem(product);
          return true;
        }
      },
      
      isInWishlist: (id) => {
        return get().items.some(item => item.id === id);
      },
      
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'herocosmos-wishlist',
    }
  )
);

export default useWishlistStore;
