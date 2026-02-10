import {COLORS, FONTS, LAYOUT} from '@constants';
import {FontSizeGenerator} from '@utils/fontSizeGenerator.util';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: LAYOUT.WIDTH,
    height: 100,
    backgroundColor: COLORS.LIGHT,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    opacity: 0.5,
  },
  activeButton: {
    opacity: 1,
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: FontSizeGenerator(12),
    fontFamily: FONTS.GEO_SEMIBOLD,
    minHeight: 15,
  },
});
