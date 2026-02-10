import {COLORS, FONTS, LAYOUT} from '@constants';
import {FontSizeGenerator} from '@utils/fontSizeGenerator.util';
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: LAYOUT.WIDTH - 30,
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORS.NEW_MAIN,
    marginBottom: 15,
  },
  title: {
    fontFamily: FONTS.GEO_SEMIBOLD,
    fontSize: FontSizeGenerator(Platform.OS === 'ios' ? 15 : 16),
    color: COLORS.LIGHT,
    minHeight: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  subTitle: {},
});
