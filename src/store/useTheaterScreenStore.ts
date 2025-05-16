import { create } from "zustand";

type TheaterScreenState = {
  currentScreen: "main" | "about" | "experience" | "contact";
  setCurrentScreen: (
    value: "main" | "about" | "experience" | "contact"
  ) => void;
  isScreenTransitioning: boolean;
  setIsScreenTransitioning: (value: boolean) => void;
};

export const useTheaterScreenStore = create<TheaterScreenState>(set => ({
  currentScreen: "main",
  setCurrentScreen: (value: "main" | "about" | "experience" | "contact") => {
    set(state => {
      if (state.currentScreen === value) return state;
      return {
        currentScreen: value,
        isScreenTransitioning: true,
      };
    });

    setTimeout(() => {
      set({ isScreenTransitioning: false });
    }, 500);
  },
  isScreenTransitioning: false,
  setIsScreenTransitioning: (value: boolean) =>
    set({ isScreenTransitioning: value }),
}));
