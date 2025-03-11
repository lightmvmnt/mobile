import {StyleSheet} from 'react-native';
import {COLORS, FONTS, LAYOUT} from '../../../../constants';
import {FontSizeGenerator} from '../../../../utils/fontSizeGenerator.util';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: LAYOUT.WIDTH - 180,
    height: 40,
    marginRight: 8,
    padding: 5,
    borderRadius: 6,
    justifyContent: 'center',
    backgroundColor: COLORS.LIGHT,
  },
  input: {
    textAlign: 'left',
    fontFamily: FONTS.GEO_REGULAR,
    fontSize: FontSizeGenerator(14),
    height: '100%',
  },
});
