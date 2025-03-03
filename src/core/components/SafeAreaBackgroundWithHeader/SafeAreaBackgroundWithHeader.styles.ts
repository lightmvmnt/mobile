import {StyleSheet} from 'react-native';
import {COLORS, LAYOUT} from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    width: LAYOUT.WIDTH,
    flex: 1,
  },
  safeArea: {
    backgroundColor: COLORS.LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
