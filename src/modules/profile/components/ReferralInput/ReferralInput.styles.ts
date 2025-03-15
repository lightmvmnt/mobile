import {StyleSheet} from 'react-native';
import {COLORS, FONTS, LAYOUT} from '../../../../constants';
import {FontSizeGenerator} from '../../../../utils/fontSizeGenerator.util';

export const styles = StyleSheet.create({
  container: {
    width: LAYOUT.WIDTH - 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoTitle: {
    fontFamily: FONTS.GEO_BOLD,
    fontSize: FontSizeGenerator(15),
    color: COLORS.DARK,
    minHeight: 20,
  },
  inputContainer: {
    width: '100%',
    height: 55,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT,
    borderWidth: 1,
    borderColor: COLORS.GRAY,
  },
  inputPressable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontFamily: FONTS.GEO_REGULAR,
    color: COLORS.DARK,
    fontSize: FontSizeGenerator(14),
    minHeight: 20,
    marginLeft: 8,
    maxWidth: 250,
  },
});
