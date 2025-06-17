import { create } from "zustand";

const DEFAULT_TRANSITION_TIME = 500;

type TheaterScreenState = {
  currentScreen: "main" | "about" | "experience" | "contact";
  setCurrentScreen: (
    value: "main" | "about" | "experience" | "contact"
  ) => void;
  isScreenTransitioning: boolean;
  // DEFAULT_TRANSITION_TIME 후 실행되는 callback 함수의 실행 여부
  hasDefaultTransitionCallbackRun: boolean;
  setIsScreenTransitioning: (value: boolean) => void;

  isHTMLScreenLoaded: boolean;
  markHTMLScreenLoaded: () => void;
};
export const useTheaterScreenStore = create<TheaterScreenState>((set, get) => ({
  currentScreen: "main",
  setCurrentScreen: (value: "main" | "about" | "experience" | "contact") => {
    set(state => {
      let isWithScreenLoadedHOC = false;
      if (state.currentScreen === value) return state;
      if (value !== "main") isWithScreenLoadedHOC = true;
      return {
        hasDefaultTransitionCallbackRun: false,
        isHTMLScreenLoaded: !isWithScreenLoadedHOC,
        currentScreen: value,
        isScreenTransitioning: true,
      };
    });

    setTimeout(() => {
      set({ hasDefaultTransitionCallbackRun: true });
      get()?.isHTMLScreenLoaded && set({ isScreenTransitioning: false });
    }, DEFAULT_TRANSITION_TIME);
  },
  isScreenTransitioning: false,
  hasDefaultTransitionCallbackRun: false,
  setIsScreenTransitioning: (value: boolean) =>
    set({ isScreenTransitioning: value }),

  isHTMLScreenLoaded: false,
  markHTMLScreenLoaded: () => {
    set(() => {
      // default transition callback 함수가 이미 실행됨 -> 인위적으로 isScreenTransitioning true로 만들어 transition screen 출력 종료
      if (get()?.hasDefaultTransitionCallbackRun) {
        return { isScreenTransitioning: false, isHTMLScreenLoaded: true };
      }
      // default transition callback 함수가 실행 되지 않음 -> 그냥 isHTMLScreenLoaded만 true
      return { isHTMLScreenLoaded: true };
    });
  },
}));
