import {Platform, StyleSheet} from 'react-native';
import {COLORS, FONTS, LAYOUT} from '../../../../constants';
import {FontSizeGenerator} from '../../../../utils/fontSizeGenerator.util';

export const styles = StyleSheet.create({
  formContainer: {
    flex: 0.45,
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
  input: {
    width: LAYOUT.WIDTH - 30,
    backgroundColor: COLORS.LIGHT,
    color: COLORS.DARK,
    paddingHorizontal: 12,
    paddingVertical: 15,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.BORDER,
    marginBottom: 25,
  },
  connectedButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectedButtonText: {
    marginLeft: 12,
    fontFamily: FONTS.GEO_MEDIUM,
    fontSize: FontSizeGenerator(14),
  },
});
