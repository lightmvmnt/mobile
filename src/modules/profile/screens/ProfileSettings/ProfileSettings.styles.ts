import {StyleSheet} from 'react-native';
import {LAYOUT} from '../../../../constants';

export const styles = StyleSheet.create({
  profileSettingsContainer: {
    flex: 1,
    width: LAYOUT.WIDTH,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  actionButtonContainer: {
    flex: 0.9,
    marginTop: 10,
  },
  actionButtonWrapper: {
    marginBottom: 10,
  },
});
