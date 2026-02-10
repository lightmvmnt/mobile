import {COLORS, FONTS} from '@constants';
import {FontSizeGenerator} from '@utils/fontSizeGenerator.util';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
  },
  title: {
    marginTop: 20,
    fontFamily: FONTS.GEO_SEMIBOLD,
    fontSize: FontSizeGenerator(22),
    textAlign: 'center',
    color: COLORS.DARK,
    minHeight: 25,
  },
});
