import { useEffect, useRef } from "react";
import { useSpring } from "framer-motion";

export function useAnimatedText(target, transition) {
  const ref = useRef(null);
  const value = useSpring(target, transition);

  useEffect(() => {
    ref.current.innerText = target;

    return value.on("change", (v) => {
      ref.current.innerText = v;
    });
  });
  useEffect(() => value.set(target), [target]);

  return ref;
}
