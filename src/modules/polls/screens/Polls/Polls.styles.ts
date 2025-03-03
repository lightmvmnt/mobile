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
  pollsContainer: {
    flex: 0.9,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonsContainer: {
    width: LAYOUT.WIDTH - 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  list: {
    width: LAYOUT.WIDTH - 30,
  },
});
