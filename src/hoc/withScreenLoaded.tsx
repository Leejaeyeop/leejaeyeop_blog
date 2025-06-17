import { useTheaterScreenStore } from "@/store/useTheaterScreenStore";
import { useEffect } from "react";

export function withScreenLoaded<P>(WrappedComponent: React.ComponentType<P>) {
  return function ScreenLoadedComponent(props: P) {
    const markHTMLScreenLoaded = useTheaterScreenStore(
      s => s.markHTMLScreenLoaded
    );

    useEffect(() => {
      markHTMLScreenLoaded();
    }, [markHTMLScreenLoaded]);

    return <WrappedComponent {...props} />;
  };
}
