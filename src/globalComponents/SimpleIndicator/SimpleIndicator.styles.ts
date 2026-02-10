import {Platform, StyleSheet} from 'react-native';

import {COLORS, FONTS} from '../../constants';
import {FontSizeGenerator} from '../../utils/fontSizeGenerator.util';

export const styles = StyleSheet.create({
  indicator: {
    borderRadius: 100,
    padding: 6,
    backgroundColor: COLORS.GRAY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: FONTS.GEO_SEMIBOLD,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 13 : 12),
    marginLeft: 5,
    minHeight: 15,
  },
});
