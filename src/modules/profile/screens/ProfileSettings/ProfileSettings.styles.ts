import {StyleSheet} from 'react-native';
import {LAYOUT} from '../../../../constants';

export const styles = StyleSheet.create({
  actionButtonsContainer: {
    flex: 1,
    width: LAYOUT.WIDTH,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  actionButtonWrapper: {
    marginBottom: 10,
  },
});
