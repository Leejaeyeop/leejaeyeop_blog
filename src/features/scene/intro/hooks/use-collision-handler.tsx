import { RapierRigidBody } from "@react-three/rapier";
import { debounce, throttle } from "lodash";
import { useCallback } from "react";

type RigidKey = "rigidGrowth" | "rigidChallenge" | "rigidImpossible";
export const UseCollisionEnter = (
  moveNextSequence: () => void,
  {
    rigidGrowth,
    rigidChallenge,
    rigidImpossible,
  }: Record<RigidKey, React.MutableRefObject<RapierRigidBody | null>>
) => {
  const growthCollision = useCallback(
    debounce(() => {
      // off rotation & off transition
      rigidGrowth.current.setEnabledRotations(false, false, false, false);
      rigidGrowth.current.setEnabledTranslations(false, true, false, false);
      rigidGrowth.current.setGravityScale(30, true);

      rigidChallenge.current?.applyImpulse({ x: 0, y: 1500, z: 0 }, true);
      rigidGrowth.current?.applyImpulse({ x: 0, y: 1000, z: 0 }, true);
      moveNextSequence();
    }, 100),
    []
  );

  const challengeCollision = useCallback(
    throttle(
      () => {
        rigidChallenge.current.setEnabledRotations(false, false, false, false);
        rigidChallenge.current.setEnabledTranslations(
          false,
          true,
          false,
          false
        );
        // off rotation & off transition
        rigidImpossible.current.applyImpulse({ x: 0, y: 2000, z: 2000 }, true);

        // 2번째 sequence 으로 이동
        moveNextSequence();
      },
      1000,
      { leading: true, trailing: false }
    ),
    []
  );

  const jaeyeopCollision = useCallback(
    throttle(
      () => {
        moveNextSequence();
      },
      1000,
      { leading: true, trailing: false }
    ),
    []
  );

  const collisionEnter = ({ target, other }) => {
    if (
      target.rigidBodyObject.name === "rigidImpossible" &&
      other.rigidBodyObject.name === "rigidChallenge"
    ) {
      challengeCollision();
    } else if (
      target.rigidBodyObject.name === "rigidChallenge" &&
      other.rigidBodyObject.name === "rigidGrowth"
    ) {
      growthCollision();
    } else if (target.rigidBodyObject.name === "rigidLeejaeyeop") {
      jaeyeopCollision();
    }
  };

  return { collisionEnter };
};
