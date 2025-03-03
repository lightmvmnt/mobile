import {StyleSheet} from 'react-native';
import {COLORS, LAYOUT} from '../../../../constants';

export const styles = StyleSheet.create({
  detailPage: {
    flex: 1,
    width: LAYOUT.WIDTH,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  detailTaskContainer: {
    flex: 0.9,
    position: 'relative',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  confirmButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.GRAY,
    paddingTop: 10,
  },
});
