import {Platform, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../../../constants';
import {FontSizeGenerator} from '../../../../utils/fontSizeGenerator.util';

export const styles = StyleSheet.create({
  indicator: {
    borderRadius: 8,
    backgroundColor: COLORS.GRAY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  indicatorText: {
    fontFamily: FONTS.GEO_SEMIBOLD,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 14 : 13),
    marginLeft: 8,
    minHeight: 20,
  },
});
