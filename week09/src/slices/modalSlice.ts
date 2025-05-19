import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  type: "CONFIRM_CLEAR_CART" | null;
}

const initialState: ModalState = {
  isOpen: false,
  type: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ModalState["type"]>) {
      state.isOpen = true;
      state.type = action.payload;
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;