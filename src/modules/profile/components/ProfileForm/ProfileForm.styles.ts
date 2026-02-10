import {COLORS, FONTS, LAYOUT} from '@constants';
import {FontSizeGenerator} from '@utils/fontSizeGenerator.util';
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  formContainer: {
    width: LAYOUT.WIDTH - 30,
    borderRadius: 12,
    flex: 1,
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
  editButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    backgroundColor: COLORS.GRAY,
    borderRadius: 8,
  },
  editButtonText: {
    fontFamily: FONTS.GEO_SEMIBOLD,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 14 : 13),
    height: 20,
    color: COLORS.DARK,
    marginLeft: 8,
  },
  input: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.BORDER,
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
  settingsButton: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.GRAY,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  settingsButtonTitle: {
    fontFamily: FONTS.GEO_SEMIBOLD,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 15 : 14),
    height: 20,
  },
});
