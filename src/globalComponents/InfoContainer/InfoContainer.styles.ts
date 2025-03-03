import {StyleSheet} from 'react-native';
import {COLORS, FONTS, LAYOUT} from '../../constants';
import {FontSizeGenerator} from '../../utils/fontSizeGenerator.util';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: LAYOUT.WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    fontFamily: FONTS.GEO_BOLD,
    fontSize: FontSizeGenerator(24),
    color: COLORS.DARK,
    minHeight: 30,
  },
});
