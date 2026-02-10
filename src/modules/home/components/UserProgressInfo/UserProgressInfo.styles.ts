import {COLORS, LAYOUT} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  progressInfoContainer: {
    width: LAYOUT.WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingTop: 5,
    backgroundColor: COLORS.DARK,
  },
  breakLine: {
    width: LAYOUT.WIDTH,
    position: 'absolute',
    bottom: 0,
    height: 30,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    backgroundColor: COLORS.LIGHT,
  },
});
