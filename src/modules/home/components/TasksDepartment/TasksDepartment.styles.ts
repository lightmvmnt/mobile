import {COLORS, FONTS, LAYOUT} from '@constants';
import {FontSizeGenerator} from '@utils/fontSizeGenerator.util';
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: LAYOUT.WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 0.1,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  headerText: {
    maxWidth: 150,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 18 : 16),
    fontFamily: FONTS.GEO_SEMIBOLD,
    color: COLORS.DARK,
    height: 25,
  },
  headerButton: {
    maxWidth: 150,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 16 : 14),
    fontFamily: FONTS.GEO_SEMIBOLD,
    color: COLORS.MAIN,
    height: 25,
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.MAIN,
    textDecorationStyle: 'solid',
  },
  tasksContainer: {
    width: LAYOUT.WIDTH - 30,
    flex: 0.9,
  },
});
