import { useState } from "react";
import { createContext } from "react";

export type SequenceInfo = typeof sequenceInfo;

const SequenceContext = createContext(null);
// default
const sequenceInfo = {
  // 배경색
  backgroundColor: "#FFA500",
  // Text color
  color: "#FF6D00",
  // Text
  text: "불가능",
  // TextGeometries
  showImpossible: false,
  showChallenge: false,
  showGrowth: false,
  showLeejaeyeop: false,
  showCuboidCollider: true,
  // Camera Shake
  shakeX: false,
  shakeY: false,
  // time to delay for next sequence
  delayTime: 0,
  h1Animation: null,
  showH2Text: false,
  changeLightPos: false,
  isDone: false,
};

function* GenerateSequence() {
  // 일회성 이벤트는 제거
  // 첫번째 시퀀스-> impossible geo 생성 delay 1초
  sequenceInfo.showImpossible = true;
  yield { ...sequenceInfo, delayTime: 800 };
  // 두번째 시퀀스 -> challenge geo 생성
  sequenceInfo.showChallenge = true;
  yield { ...sequenceInfo };
  // 세번째 시퀀스 -> color change , text change , camera shake
  sequenceInfo.backgroundColor = "#caf0f8";
  sequenceInfo.color = "#005AFF";
  sequenceInfo.text = "도전";
  yield { ...sequenceInfo, shakeX: true, shakeY: true, delayTime: 1200 };
  // 네번째 시퀸스 -> growth text geo 생성
  sequenceInfo.showImpossible = false;
  sequenceInfo.showGrowth = true;
  yield { ...sequenceInfo };
  // 다섯번째 시퀸스 ->  color change , text change , camera shake
  sequenceInfo.backgroundColor = "#c9ffed";
  sequenceInfo.color = "#08bd53";
  sequenceInfo.text = "성장";
  yield { ...sequenceInfo, shakeX: true, shakeY: true, delayTime: 1000 };
  // 여섯번째 시퀸스 -> h1 transform , sink growth geo
  sequenceInfo.showCuboidCollider = false;
  sequenceInfo.showChallenge = false;
  (sequenceInfo.h1Animation = {
    top: 0,
    left: 0,
    transform: "rotate3d(0, 0, 0, 0deg)",
    justifyContent: "left",
  }),
    yield {
      ...sequenceInfo,
      delayTime: 1100,
    };

  // 7번쩨 시퀸스 -> show h2
  sequenceInfo.showH2Text = true;
  yield {
    ...sequenceInfo,
  };
  // 8 시퀸스 -> Leejaeyeop
  sequenceInfo.showCuboidCollider = true;
  sequenceInfo.showChallenge = false;
  sequenceInfo.showLeejaeyeop = true;
  yield { ...sequenceInfo };
  // 9 light 위치 변경
  sequenceInfo.changeLightPos = true;
  sequenceInfo.showGrowth = false;
  yield { ...sequenceInfo, shakeX: true, shakeY: true, delayTime: 2000 };
  // fade out 효과
  yield { ...sequenceInfo, isDone: true };
  return sequenceInfo;
}

function useSequence() {
  const [generateSequence] = useState(() => GenerateSequence());
  const [sequence, setSequence] = useState(() => generateSequence.next().value);

  const moveNextSequence = () => {
    const nextSequence = generateSequence.next();
    if (!nextSequence.done) {
      setSequence(nextSequence.value);
    }
  };
  return { sequence, setSequence, moveNextSequence };
}

export { useSequence, SequenceContext };
