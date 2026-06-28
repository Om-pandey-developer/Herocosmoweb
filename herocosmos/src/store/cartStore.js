'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, size, color, quantity = 1) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          item => item.id === product.id && item.size === size && item.color === color
        );
        
        if (existingIndex > -1) {
          const newItems = [...items];
          newItems[existingIndex].quantity += quantity;
          set({ items: newItems });
        } else {
          set({
            items: [...items, {
              id: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              originalPrice: product.originalPrice,
              image: product.image,
              size,
              color,
              quantity,
            }]
          });
        }
      },
      
      removeItem: (id, size, color) => {
        set({
          items: get().items.filter(
            item => !(item.id === id && item.size === size && item.color === color)
          )
        });
      },
      
      updateQuantity: (id, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, size, color);
          return;
        }
        const newItems = get().items.map(item => {
          if (item.id === id && item.size === size && item.color === color) {
            return { ...item, quantity };
          }
          return item;
        });
        set({ items: newItems });
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getOriginalTotal: () => {
        return get().items.reduce((total, item) => total + (item.originalPrice * item.quantity), 0);
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'herocosmos-cart',
    }
  )
);

export default useCartStore;
