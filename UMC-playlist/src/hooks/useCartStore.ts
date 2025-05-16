import { create } from "zustand";
import { CartItems } from "../types/cart";
import { immer } from "zustand/middleware/immer";
import cartItems from "../constants/cartItems";
import { useShallow } from "zustand/shallow";

interface CartActions {
    increase: (id: string) => void;
    decrease: (id: string) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    calculateTotal: () => void;

    openModal: () => void;
    closeModal: () => void;
}

interface CartState {
    cartItems: CartItems;
    amount: number;
    total: number;
    isOpen: boolean;

    actions: CartActions;
}

export const useCartStore = create<CartState>()(
    immer((set, _) => ({
        cartItems: cartItems,
        amount: 0,
        total: 0,
        isOpen: false,
        actions: {
            increase: (id: string) => {
                set((state) => {
                    const cartItems = state.cartItems.find((item) => item.id === id);

                    if (cartItems) {
                        cartItems.amount += 1;
                    }
                });
            },
            decrease: (id: string) => {
                set((state) => {
                    const cartItems = state.cartItems.find((item) => item.id === id);

                    if (cartItems && cartItems.amount > 1) {
                        cartItems.amount -= 1;
                    }
                });
            },
            removeItem: (id: string) => {
                set((state) => {
                    state.cartItems = state.cartItems.filter((item) => item.id !== id);
                });
            },
            clearCart: () => {
                set((state) => {
                    state.cartItems = [];
                });
            },
            calculateTotal: () => {
                set((state) => {
                    let amount = 0;
                    let total = 0;

                    state.cartItems.forEach((item) => {
                        amount += item.amount;
                        total += item.price * item.amount;
                    });

                    state.amount = amount;
                    state.total = total;
                });
            },

            openModal: () => {
                set((state) => {
                    state.isOpen = true;
                });
            },

            closeModal: () => {
                set((state) => {
                    state.isOpen = false;
                });
            },
        },
    }))
);

export const useCartInfo = () => useCartStore(useShallow((state) => ({
    cartItems: state.cartItems,
    amount: state.amount,
    total: state.total,
    actions: state.actions,
    isOpen: state.isOpen,
})));

export const useCartActions = () => useCartStore((state) => state.actions);
