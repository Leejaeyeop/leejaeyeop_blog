export const THEATER_CONSTANTS = {
  SCREEN_GROUP_POSITION: [-0.01, 3.1, -3.8] as [number, number, number],
  HTML_SCALE: 0.11,
  HTML_POSITION: [0, 0, 0] as [number, number, number],
  FILTER_PLANE_POSITION: [0, 0.01, 0.01] as [number, number, number],
  FILTER_PLANE_SIZE: [4.4, 2.76] as [number, number],
  FILTER_INITIAL_OPACITY: 0.02,
  FADE_IN_DURATION: 4,
  SCENE_TRANSITION_DURATION: 500,
} as const;

export const meshBasicMaterialVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: THEATER_CONSTANTS.FILTER_INITIAL_OPACITY,
    transition: { duration: THEATER_CONSTANTS.FADE_IN_DURATION },
  },
} as const;
