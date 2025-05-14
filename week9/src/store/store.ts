import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice.ts";
import modalReducer from "../slices/modalSlice.ts";

// 중앙저장소
function createStore() {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      modal: modalReducer,
    },
  });

  return store;
}

const store = createStore();
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
