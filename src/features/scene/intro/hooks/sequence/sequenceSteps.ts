import { SequenceInfo } from "./sequenceInitial";

export function startSequence(state: SequenceInfo): SequenceInfo {
  return { ...state };
}

export function showChallengeGeo(state: SequenceInfo): SequenceInfo {
  Object.assign(state, {
    showChallenge: true,
  });
  return { ...state };
}

export function challengeVisuals(state: SequenceInfo): SequenceInfo {
  Object.assign(state, {
    backgroundColor: "#caf0f8",
    color: "#5285fa",
    text: "도전",
  });

  return { ...state, shakeX: true, shakeY: true, delayTime: 1300 };
}

export function showGrowthGeo(state: SequenceInfo): SequenceInfo {
  Object.assign(state, {
    showImpossible: false,
    showGrowth: true,
  });
  return {
    ...state,
  };
}

export function growthVisuals(state: SequenceInfo): SequenceInfo {
  Object.assign(state, {
    backgroundColor: "#c9ffed",
    color: "#6EE7B7",
    text: "성장",
  });
  return {
    ...state,
    shakeX: true,
    shakeY: true,
    delayTime: 1000,
  };
}

export function transformH1(state: SequenceInfo): SequenceInfo {
  Object.assign(state, {
    showCuboidCollider: false,
    showChallenge: false,
    h1Animation: {
      top: 0,
      left: 0,
      transform: "rotate3d(0, 0, 0, 0deg)",
      justifyContent: "left",
    },
  });

  return {
    ...state,
    delayTime: 1100,
  };
}

export function showH2(state: SequenceInfo): SequenceInfo {
  Object.assign(state, {
    showH2Text: true,
  });
  return { ...state };
}

export function showLeejaeyeopGeo(state: SequenceInfo): SequenceInfo {
  Object.assign(state, {
    showCuboidCollider: true,
    showChallenge: false,
    showLeejaeyeop: true,
  });

  return {
    ...state,
  };
}

export function changeLightAndEnd(state: SequenceInfo): SequenceInfo {
  Object.assign(state, {
    changeLightPos: true,
    showGrowth: false,
    bgGradient: "bg-gradient-to-tl",
  });
  return {
    ...state,
    shakeX: true,
    shakeY: true,
    delayTime: 2000,
  };
}

export function markDone(state: SequenceInfo): SequenceInfo {
  return { ...state, isDone: true };
}
