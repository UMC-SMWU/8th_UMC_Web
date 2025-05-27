import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";
import { CartItems } from "../types/cart";

export interface CartState {
    cartItems: CartItems;
    amount: number;
    total: number;
};

const initialState: CartState = {
    cartItems: cartItems,
    amount: 0,
    total: 0,
};

// cartSlice 생성
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // TODO : 증가
        increase: (state, action: PayloadAction<{id: string}>) => {
            const itemId = action.payload.id;
            // 이 아이디를 통해 전체 음반 중 내가 클릭한 음반 찾기
            const item = state.cartItems.find((cartItem) => cartItem.id === itemId);

            if (item) {
                item.amount += 1;
            }
        },

        // TODO : 감소
        decrease: (state, action: PayloadAction<{id: string}>) => {
            const itemId = action.payload.id;
            // 이 아이디를 통해 전체 음반 중 내가 클릭한 음반 찾기
            const item = state.cartItems.find((cartItem) => cartItem.id === itemId);

            if (item) {
                item.amount -= 1;
            }
        },
        

        // TODO : remove item, 아이템 제거, 1 에서 줄어들면 장바구니에서 삭제
        removeItem: (state, action: PayloadAction<{id: string}>) => {
            const itemId = action.payload.id;
            state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== itemId);
        },
        
        // TODO : clear cart, 장바구니 비우기
        clearCart: (state) => {
            state.cartItems = [];
        },

        // TODO : calculate total, 총 가격 계산
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((cartItem) => {
                amount += cartItem.amount;
                total += cartItem.price * cartItem.amount;
            });

            state.amount = amount;
            state.total = total;
        },
    },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } 
    = cartSlice.actions;

// duck pattern reducer 는 export default로 내보내야 함
const cartReducer = cartSlice.reducer;

export default cartReducer;
