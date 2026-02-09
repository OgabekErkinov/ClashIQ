import { create } from "zustand";

interface ModalState {
  id? : string,
  type: string | null;
  isOpen: boolean;
  openModal: (type: string, id : string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  id : "",
  type: null,
  isOpen: false,

  openModal: (type, id) =>
    set({
      id,
      type,
      isOpen: true,
    }),

  closeModal: () =>
    set({
      type: null,
      isOpen: false,
    }),
}));