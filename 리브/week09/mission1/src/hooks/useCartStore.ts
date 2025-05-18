import { create } from 'zustand';
import { CartItems } from '../types/cart';
import { immer } from 'zustand/middleware/immer';
import cartItems from '../constants/cartItems';
import { useShallow } from 'zustand/shallow';

interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;

  actions: CartActions;
}

export const useCartStore = create<CartState>()(
  // eslint-disable @typescript-eslint/no-unused-vars
  immer((set, _) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    actions: {
      increase: (id: string): void => {
        set((state) => {
          const cartItem = state.cartItems.find((item): boolean => item.id === id);

          if (cartItem) {
            cartItem.amount += 1;
          }
        });
      },
      decrease: (id: string): void => {
        set((state) => {
          const cartItem = state.cartItems.find((item): boolean => item.id === id);

          if (cartItem && cartItem.amount > 0) {
            cartItem.amount -= 1;
          }
        });
      },

      removeItem: (id: string): void => {
        set((state) => {
          state.cartItems = state.cartItems.filter((item): boolean => item.id !== id);
        });
      },

      clearCart: (): void => {
        set((state) => {
          state.cartItems = [];
        });
      },

      calculateTotals: (): void => {
        set((state) => {
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item): void => {
                amount += item.amount;
                total += item.amount * Number(item.price);
            });

            state.amount = amount;
            state.total = total;
         });
      },
    },
  }))
);

export const useCartInfo = () =>
  useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
    }))
  );

  export const useCartActions = () => 
    useCartStore((state) => state.actions);