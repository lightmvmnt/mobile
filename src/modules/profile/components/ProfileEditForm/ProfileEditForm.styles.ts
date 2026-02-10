import {COLORS, FONTS, LAYOUT} from '@constants';
import {FontSizeGenerator} from '@utils/fontSizeGenerator.util';
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  formContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: LAYOUT.WIDTH - 30,
    marginTop: 10,
  },
  header: {
    flex: 0.15,
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
    flex: 0.85,
    marginTop: 15,
  },
  inputContainer: {
    height: 50,
  },
  input: {
    width: LAYOUT.WIDTH - 30,
    backgroundColor: COLORS.LIGHT,
    color: COLORS.DARK,
    height: 50,
  },
  inputLabel: {
    color: COLORS.DARK,
    fontWeight: 500,
  },
  disabledInputLabel: {
    color: COLORS.DEACTIVE,
    fontWeight: 500,
  },
  inputOutline: {
    borderRadius: 8,
    borderWidth: 2,
  },
  error: {
    color: COLORS.NEW_MAIN,
  },
  textFieldInput: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: COLORS.BORDER,
    height: 100,
    padding: 12,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: COLORS.DARK,
  },
});
