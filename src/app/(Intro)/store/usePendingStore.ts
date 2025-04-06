import { create } from "zustand";

type Store = {
  isPending: boolean;
  setIsPending: (value: boolean) => void;
};

export const usePendingStore = create<Store>()(set => ({
  isPending: false,
  setIsPending: value => set({ isPending: value }),
}));
