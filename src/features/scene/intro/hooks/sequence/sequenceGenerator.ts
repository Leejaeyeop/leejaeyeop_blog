import {
  startSequence,
  showChallengeGeo,
  challengeVisuals,
  showGrowthGeo,
  growthVisuals,
  transformH1,
  showH2,
  showLeejaeyeopGeo,
  changeLightAndEnd,
  markDone,
} from "./sequenceSteps";
import { sequenceInitial } from "./sequenceInitial";

function* GenerateSequence() {
  const state = structuredClone(sequenceInitial);

  yield startSequence(state);
  yield showChallengeGeo(state);
  yield challengeVisuals(state);
  yield showGrowthGeo(state);
  yield growthVisuals(state);
  yield transformH1(state);
  yield showH2(state);
  yield showLeejaeyeopGeo(state);
  yield changeLightAndEnd(state);

  return markDone(state);
}

export { GenerateSequence };
