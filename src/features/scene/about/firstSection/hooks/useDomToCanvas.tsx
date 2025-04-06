import html2canvas from "html2canvas";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { CanvasTexture } from "three";

export const useDomToCanvas = domEl => {
  const [texture, setTexture] = useState<CanvasTexture>();
  useEffect(() => {
    if (!domEl) return;
    const convertDomToCanvas = async () => {
      const canvas = await html2canvas(domEl, {
        backgroundColor: null,
      });
      setTexture(new CanvasTexture(canvas));
    };

    convertDomToCanvas();

    const debouncedResize = debounce(() => {
      convertDomToCanvas();
    }, 100);

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [domEl]);

  return texture;
};
