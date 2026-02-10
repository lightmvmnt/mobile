import {COLORS, FONTS, LAYOUT} from '@constants';
import {FontSizeGenerator} from '@utils/fontSizeGenerator.util';
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  switchContainer: {
    width: LAYOUT.WIDTH - 30,
    backgroundColor: COLORS.SECONDARY_BG_COLOR,
    marginBottom: 15,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  switchInfoContainer: {
    width: '80%',
  },
  switchInfoTitle: {
    fontFamily: FONTS.GEO_BOLD,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 16 : 14),
    color: COLORS.DARK,
    marginBottom: 8,
    minHeight: 20,
  },
  switchInfo: {
    fontFamily: FONTS.GEO_REGULAR,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 14 : 12),

    color: COLORS.DARK,
  },
  switchWrapper: {
    width: '20%',
    alignItems: 'flex-end',
  },
});
