import {Platform, StyleSheet} from 'react-native';

import {COLORS, FONTS} from '../../constants';
import {FontSizeGenerator} from '../../utils/fontSizeGenerator.util';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.BORDER,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: FONTS.GEO_BOLD,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 14 : 13),
    textAlign: 'center',
    height: 20,
    marginRight: 5,
  },
  socialAccountsButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialAccountsButton: {
    marginLeft: 3,
  },
});
