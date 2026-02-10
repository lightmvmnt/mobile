import {COLORS, FONTS, LAYOUT} from '@constants';
import {FontSizeGenerator} from '@utils/fontSizeGenerator.util';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    width: LAYOUT.WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperWrapper: {
    width: LAYOUT.WIDTH,
    flex: 1,
  },
  swiperDot: {
    backgroundColor: 'transparent',
    borderColor: COLORS.NEW_MAIN,
    borderWidth: 1,
    width: 16,
    height: 16,
    borderRadius: 100,
  },
  activeSwiperDot: {
    backgroundColor: COLORS.NEW_MAIN,
    width: 16,
    height: 16,
    borderRadius: 100,
  },
  slide: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 0.5,
    paddingBottom: 30,
  },
  slideSubTitleContainer: {
    width: LAYOUT.WIDTH,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideSubTitle: {
    fontFamily: FONTS.HELVETICA_BOLD,
    fontSize: FontSizeGenerator(20),
    color: COLORS.LIGHT,
    textAlign: 'center',
  },
  slideButton: {
    width: 240,
    height: 45,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideButtonContent: {
    width: 240,
    height: 45,
  },
  slideButtonLabel: {
    fontFamily: FONTS.GEO_BOLD,
    fontSize: FontSizeGenerator(18),
  },
});
