import { create } from "zustand";

type TheaterScreenState = {
  currentScreen: "main" | "about" | "experience";
  setCurrentScreen: (value: "main" | "about" | "experience") => void;
};

export const useTheaterScreenStore = create<TheaterScreenState>(set => ({
  currentScreen: "main",
  setCurrentScreen: (value: "main" | "about" | "experience") =>
    set({ currentScreen: value }),
}));
