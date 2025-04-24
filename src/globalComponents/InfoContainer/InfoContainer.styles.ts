import {Platform, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import {FontSizeGenerator} from '../../utils/fontSizeGenerator.util';

export const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 110,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 12,
    padding: 12,
    backgroundColor: COLORS.PROGRESS_BG_COLOR,
    zIndex: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    textAlign: 'left',
    fontFamily: FONTS.GEO_REGULAR,
    fontSize: FontSizeGenerator(Platform.OS === 'ios' ? 13 : 15),
    color: COLORS.DARK,
    marginLeft: 10,
    minHeight: 30,
  },
  counterContainer: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  counter: {
    fontFamily: FONTS.GEO_BOLD,
    fontSize: FontSizeGenerator(16),
  },
});
