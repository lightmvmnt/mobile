import {FONTS} from '@constants';
import {FontSizeGenerator} from '@utils/fontSizeGenerator.util';
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  button: {
    width: 320,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContent: {
    flex: 1,
    width: 320,
  },
  text: {
    fontFamily: FONTS.GEO_SEMIBOLD,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 15 : 13),
  },
});
