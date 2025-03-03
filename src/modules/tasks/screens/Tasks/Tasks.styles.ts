import {StyleSheet} from 'react-native';
import {LAYOUT} from '../../../../constants';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: LAYOUT.WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  tasksContainer: {
    flex: 0.9,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: LAYOUT.WIDTH - 30,
  },
});
