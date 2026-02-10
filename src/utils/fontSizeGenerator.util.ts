import {PixelRatio, Platform} from 'react-native';

import LAYOUT from '../constants/layout';

export const FontSizeGenerator = (size: number) => {
  const newSize = size * (LAYOUT.WIDTH / 375);

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};
