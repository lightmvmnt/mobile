import {StyleSheet} from 'react-native';
import {COLORS, LAYOUT} from '../../../constants';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: LAYOUT.WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  profileContainer: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileScrollView: {
    width: LAYOUT.WIDTH - 30,
  },
  referralContainer: {
    padding: 8,
    backgroundColor: COLORS.GRAY,
    marginBottom: 10,
    width: LAYOUT.WIDTH - 30,
    borderRadius: 8,
  },
});
