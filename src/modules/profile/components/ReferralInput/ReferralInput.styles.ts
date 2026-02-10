import {COLORS, FONTS, LAYOUT} from '@constants';
import {FontSizeGenerator} from '@utils/fontSizeGenerator.util';
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: LAYOUT.WIDTH - 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoTitle: {
    fontFamily: FONTS.GEO_BOLD,
    fontSize: FontSizeGenerator(16),
    color: COLORS.DARK,
    minHeight: 20,
  },
  inputContainer: {
    width: '100%',
    height: 55,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
  },
  inputPressable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontFamily: FONTS.GEO_REGULAR,
    color: COLORS.DARK,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 14 : 13),
    minHeight: 20,
    marginLeft: 8,
  },
  link: {
    fontFamily: FONTS.GEO_REGULAR,
    color: COLORS.DARK,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 14 : 13),
    minHeight: 20,
    marginLeft: 8,
    width: 250,
  },
});
