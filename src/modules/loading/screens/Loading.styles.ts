import {StyleSheet} from 'react-native';
import {COLORS, LAYOUT} from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: LAYOUT.WIDTH,
    backgroundColor: COLORS.DARK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backImg: {
    position: 'absolute',
    bottom: -30,
  },
  logo: {
    marginBottom: 100,
  },
});
