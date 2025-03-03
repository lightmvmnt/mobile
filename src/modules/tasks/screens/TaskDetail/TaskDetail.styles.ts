import {StyleSheet} from 'react-native';
import {LAYOUT} from '../../../../constants';

export const styles = StyleSheet.create({
  detailPage: {
    flex: 1,
    width: LAYOUT.WIDTH,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
  },
  detailTaskContainer: {
    flex: 0.9,
    width: LAYOUT.WIDTH - 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
