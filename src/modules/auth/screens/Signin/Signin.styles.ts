import {StyleSheet} from 'react-native';
import {COLORS, FONTS, LAYOUT} from '../../../../constants';
import {FontSizeGenerator} from '../../../../utils/fontSizeGenerator.util';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTextContainer: {
    marginTop: 15,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    textAlign: 'center',
    fontFamily: FONTS.GEO_REGULAR,
    fontSize: FontSizeGenerator(18),
  },
  signinContianer: {
    flex: 0.5,
    width: LAYOUT.WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginBottom: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TACText: {
    fontFamily: FONTS.GEO_REGULAR,
    fontSize: FontSizeGenerator(14),
    color: COLORS.LIGHT,
    textAlign: 'center',
    marginBottom: 20,
    maxWidth: LAYOUT.WIDTH - 50,
    alignItems: 'center',
  },
  TACLink: {
    fontFamily: FONTS.GEO_REGULAR,
    fontSize: FontSizeGenerator(14),
    color: COLORS.NEW_MAIN,
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.NEW_MAIN,
    height: 'auto',
  },
  buttonWrapper: {
    marginBottom: 20,
  },
});
