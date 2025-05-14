import { create } from "zustand/react";
import type { CartItems } from "../types/cart.ts";
import cartItems from "../constants/cartItem.ts";
import { useShallow } from "zustand/react/shallow";
import { immer } from "zustand/middleware/immer";

interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotal: () => void;
}

interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
  actions: CartActions;
}

export const useCartStore = create<CartState>()(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  immer((set, _) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    actions: {
      increase: (id: string) => {
        set((state) => {
          const item = state.cartItems.find((item) => item.id === id);
          if (item) {
            item.amount += 1;
          }
        });
      },
      decrease: (id: string) => {
        set((state) => {
          const item = state.cartItems.find((item) => item.id === id);
          if (item && item.amount > 0) {
            item.amount -= 1;
          }
        });
      },
      removeItem: (id: string) => {
        set((state) => {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        });
      },
      clearCart: () => {
        set(() => ({
          cartItems: [],
        }));
      },
      calculateTotal: () => {
        set((state) => {
          let total = 0;
          let amount = 0;
          state.cartItems.forEach((item) => {
            total += Number(item.price) * item.amount;
            amount += item.amount;
          });

          state.total = total;
          state.amount = amount;
        });
      },
    },
  })),
);

export const useCartInfo = () =>
  useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
    })),
  );

export const useCartActions = () => useCartStore((state) => state.actions);
