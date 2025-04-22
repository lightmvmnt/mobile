import {Platform, StyleSheet} from 'react-native';
import {COLORS, FONTS, LAYOUT} from '../../../../constants';
import {FontSizeGenerator} from '../../../../utils/fontSizeGenerator.util';

export const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: LAYOUT.WIDTH - 30,
  },
  header: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: LAYOUT.WIDTH,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontFamily: FONTS.GEO_SEMIBOLD,
    color: COLORS.DARK,
    height: 25,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 17 : 16),
  },
  form: {
    flex: 0.7,
  },
  input: {
    width: LAYOUT.WIDTH - 30,
    height: 50,
    backgroundColor: COLORS.LIGHT,
    color: COLORS.DARK,
  },
  inputLabel: {
    color: COLORS.DARK,
    fontWeight: 500,
  },
  disabledInputLabel: {
    color: COLORS.BORDER,
    fontWeight: 500,
  },
  inputOutline: {
    borderRadius: 8,
    borderWidth: 2,
  },
  saveButtonContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
  },
  error: {
    color: COLORS.NEW_MAIN,
  },
});
