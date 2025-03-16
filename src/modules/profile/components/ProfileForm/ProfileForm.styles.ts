import {Platform, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../../../constants';
import {FontSizeGenerator} from '../../../../utils/fontSizeGenerator.util';

export const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: COLORS.BORDER,
  },
  header: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.GEO_SEMIBOLD,
    fontSize: FontSizeGenerator(16),
    color: COLORS.DARK,
    height: 25,
    marginLeft: 10,
  },
  form: {
    backgroundColor: COLORS.LIGHT,
    marginHorizontal: 2,
    padding: 20,
  },
  input: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.GRAY,
    padding: 16,
    marginBottom: 25,
  },
  inputTitle: {
    fontFamily: FONTS.GEO_BOLD,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 14 : 13),
    textAlign: 'center',
    height: 20,
    marginRight: 10,
  },
  inputValue: {
    fontFamily: FONTS.GEO_REGULAR,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 16 : 15),
    textAlign: 'center',
    height: 22,
    maxWidth: 180,
  },
  actionButtonsContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonWrapper: {
    marginBottom: 10,
  },
});
