import {StyleSheet} from 'react-native';
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
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  inputTitle: {
    fontFamily: FONTS.GEO_BOLD,
    fontSize: FontSizeGenerator(14),
    marginBottom: 10,
    height: 20,
  },
  inputValue: {
    fontFamily: FONTS.GEO_REGULAR,
    fontSize: FontSizeGenerator(16),
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
