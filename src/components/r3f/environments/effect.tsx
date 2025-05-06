import {
  EffectComposer,
  Noise,
  Scanline,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export const Effect = () => {
  return (
    <EffectComposer>
      <Noise premultiply blendFunction={BlendFunction.ADD} opacity={0.7} />
      <Vignette offset={0.3} darkness={1} />
      <Scanline density={1.5} opacity={0.1} />
    </EffectComposer>
  );
};
