import {Platform, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../../../constants';
import {FontSizeGenerator} from '../../../../utils/fontSizeGenerator.util';

export const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    borderRadius: 12,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontFamily: FONTS.GEO_BOLD,
    fontSize: FontSizeGenerator(16),
    color: COLORS.DARK,
    minHeight: 20,
  },
  form: {
    backgroundColor: COLORS.LIGHT,
    marginBottom: 15,
  },
  input: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.GRAY,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  inputTitle: {
    fontFamily: FONTS.GEO_BOLD,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 14 : 13),
    textAlign: 'center',
    height: 20,
    marginRight: 5,
  },
  inputValue: {
    fontFamily: FONTS.GEO_REGULAR,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 14 : 13),
    height: 20,
    width: 250,
  },
  actionButtonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonWrapper: {
    marginBottom: 10,
  },
});
