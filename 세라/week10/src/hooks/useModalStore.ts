import type { Movie } from "../types/movie.ts";
import { useShallow } from "zustand/react/shallow";
import { create } from "zustand/react";
import { immer } from "zustand/middleware/immer";

interface ModalActions {
  openModal: (movie: Movie) => void;
  closeModal: () => void;
}

interface ModalState {
  isOpen: boolean;
  movie: Movie | null;
  actions: ModalActions;
}

export const useModalStore = create(
  immer<ModalState>((set) => ({
    isOpen: false,
    movie: null,
    actions: {
      openModal: (movie: Movie) =>
        set((state) => {
          state.isOpen = true;
          state.movie = movie;
        }),
      closeModal: () =>
        set((state) => {
          state.isOpen = false;
          state.movie = null;
        }),
    },
  })),
);

export const useModalInfo = () =>
  useModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      movie: state.movie,
    })),
  );

export const useModalActions = () => useModalStore((state) => state.actions);
