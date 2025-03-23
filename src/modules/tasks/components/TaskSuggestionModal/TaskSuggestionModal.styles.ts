import {StyleSheet} from 'react-native';
import {COLORS, FONTS, LAYOUT} from '../../../../constants';
import {FontSizeGenerator} from '../../../../utils/fontSizeGenerator.util';

export const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    backgroundColor: 'white',
    height: 200,
    width: LAYOUT.WIDTH - 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  inputContainer: {
    width: '100%',
    height: 50,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: COLORS.LIGHT,
    fontFamily: FONTS.GEO_REGULAR,
    fontSize: FontSizeGenerator(14),
  },
  inputOutline: {
    borderRadius: 8,
  },
});
