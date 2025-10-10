import {Platform, StyleSheet} from 'react-native';
import {COLORS, FONTS, LAYOUT} from '../../../constants';
import {FontSizeGenerator} from '../../../utils/fontSizeGenerator.util';

export const styles = StyleSheet.create({
  header: {
    width: LAYOUT.WIDTH,
    backgroundColor: COLORS.DARK,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'ios' ? 30 : 20,
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
  profileButton: {
    marginRight: 15,
    width: 100,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  profileButtonText: {
    width: '100%',
    height: 25,
    color: COLORS.LIGHT,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.LIGHT,
    fontSize: FontSizeGenerator(17),
    fontFamily: FONTS.GEO_MEDIUM,
    textAlign: 'center',
  },
});
