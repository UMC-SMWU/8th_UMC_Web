import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
    name: "modal",
    initialState: {
        isOpen: false,
        modalContent: "",
    },
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
            state.modalContent = action.payload;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.modalContent = "";
        },
    },
});

export const {openModal, closeModal} = ModalSlice.actions;

const modalReducer = ModalSlice.reducer;

export default modalReducer;
