import {COLORS, FONTS} from '@constants';
import {FontSizeGenerator} from '@utils/fontSizeGenerator.util';
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  resultContainer: {
    width: 320,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: COLORS.GRAY,
    flexDirection: 'row',
  },
  divider: {
    width: 10,
    height: 1,
    marginHorizontal: 5,
    borderTopWidth: 1,
    borderTopColor: COLORS.DARK,
  },
  optionText: {
    fontFamily: FONTS.GEO_SEMIBOLD,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 15 : 13),
    color: COLORS.DARK,
    height: 20,
  },
  resultText: {
    fontFamily: FONTS.GEO_REGULAR,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 15 : 13),
    color: COLORS.DARK,
    height: 20,
  },
});
