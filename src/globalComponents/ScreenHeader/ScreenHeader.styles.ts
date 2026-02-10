import {Platform, StyleSheet} from 'react-native';

import {COLORS, FONTS} from '../../constants';
import {FontSizeGenerator} from '../../utils/fontSizeGenerator.util';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
    flex: 0.1,
    marginBottom: 10,
  },
  title: {
    fontFamily: FONTS.GEO_SEMIBOLD,
    color: COLORS.DARK,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 18 : 16),
    marginLeft: 15,
    height: 25,
  },
});
