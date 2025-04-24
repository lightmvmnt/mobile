import {LAYOUT} from '../constants';

export const heightGenerator = () => {
  const SCREEN_HEIGHT = LAYOUT.HEIGHT;

  if (SCREEN_HEIGHT > 800) {
    return SCREEN_HEIGHT - 270;
  }

  return SCREEN_HEIGHT - 230;
};
