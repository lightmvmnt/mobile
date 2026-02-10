import {COLORS, LAYOUT} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  detailPage: {
    flex: 1,
    width: LAYOUT.WIDTH,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 25,
  },
  detailTaskContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  detailTaskScrollView: {
    justifyContent: 'center',
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
    backgroundColor: COLORS.LIGHT,
    zIndex: 10,
  },
});
