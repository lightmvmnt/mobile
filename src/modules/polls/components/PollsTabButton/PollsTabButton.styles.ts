import {StyleSheet} from 'react-native';
import {FONTS} from '../../../../constants';

export const styles = StyleSheet.create({
  button: {
    width: 170,
    height: 42,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    flex: 1,
    width: 170,
  },
  text: {
    fontFamily: FONTS.GEO_SEMIBOLD,
  },
});
