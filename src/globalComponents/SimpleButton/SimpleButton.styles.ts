import {StyleSheet} from 'react-native';

import {FONTS} from '../../constants';

export const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    flex: 1,
  },
  text: {
    fontFamily: FONTS.GEO_SEMIBOLD,
  },
});
