import { useCallback, useRef, useState } from "react";
import { createContext } from "react";
import { SequenceInfo } from "./sequence/sequenceInitial";
import { GenerateSequence } from "./sequence/sequenceGenerator";
const SequenceContext = createContext<SequenceInfo | null>(null);

function useSequence() {
  const generateSequenceRef = useRef(GenerateSequence());
  const [sequence, setSequence] = useState(
    () => generateSequenceRef.current.next().value
  );

  const moveNextSequence = useCallback(() => {
    const nextSequence = generateSequenceRef.current.next();
    if (nextSequence.value) {
      setSequence(nextSequence.value);
    }
  }, [generateSequenceRef]);
  return { sequence, setSequence, moveNextSequence };
}

export { useSequence, SequenceContext };
