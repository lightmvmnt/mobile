import {StyleSheet} from 'react-native';
import {LAYOUT} from '../../../../constants';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: LAYOUT.WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
