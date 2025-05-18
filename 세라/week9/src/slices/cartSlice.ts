import type { CartItems } from "../types/cart.ts";
import cartItems from "../constants/cartItem.ts";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 수량 증가
    increase: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      const item = state.cartItems.find((item) => item.id === itemId);
      if (item) {
        item.amount += 1;
      }
    },

    // 수량 감소
    decrease: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      const item = state.cartItems.find((item) => item.id === itemId);
      if (item && item.amount > 0) {
        item.amount -= 1;
      }
    },

    // 수량 0이면 아이템 제거
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },

    // 장바구니 비우기
    clearCart: (state) => {
      state.cartItems = [];
    },

    // 총액 계산
    calculateTotal: (state) => {
      let total = 0;
      let amount = 0;
      state.cartItems.forEach((item) => {
        total += Number(item.price) * item.amount;
        amount += item.amount;
      });

      state.total = total;
      state.amount = amount;
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotal } =
  cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
