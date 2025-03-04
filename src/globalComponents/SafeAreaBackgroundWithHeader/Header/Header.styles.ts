import {Platform, StyleSheet} from 'react-native';
import {COLORS, LAYOUT} from '../../../constants';

export const styles = StyleSheet.create({
  header: {
    width: LAYOUT.WIDTH,
    backgroundColor: COLORS.DARK,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
    zIndex: 0,
  },
  headerLeftSide: {
    flex: 1,
    width: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
  backImg: {
    position: 'absolute',
    zIndex: -2,
    top: -80,
  },
});
