import {StyleSheet} from 'react-native';
import {COLORS, LAYOUT} from '../../constants';

export const styles = StyleSheet.create({
  safeArea: {
    width: LAYOUT.WIDTH,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.DARK,
    position: 'relative',
  },
  page: {
    flex: 1,
    width: LAYOUT.WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backImg: {
    position: 'absolute',
    bottom: -30,
    zIndex: -10,
  },
});
