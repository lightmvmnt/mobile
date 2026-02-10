import {LAYOUT} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  detailPage: {
    flex: 1,
    width: LAYOUT.WIDTH,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 25,
  },
  detailTaskContainer: {
    flex: 1,
    width: LAYOUT.WIDTH - 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
