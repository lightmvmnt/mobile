import {Platform, StyleSheet} from 'react-native';

import {COLORS, FONTS} from '../../constants';
import {FontSizeGenerator} from '../../utils/fontSizeGenerator.util';

export const styles = StyleSheet.create({
  pointIndicator: {
    width: 60,
    height: 30,
    backgroundColor: COLORS.SECONDARY,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointIndicatorText: {
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 14 : 13),
    fontFamily: FONTS.GEO_SEMIBOLD,
    color: COLORS.DARK,
    marginLeft: 5,
  },
});
