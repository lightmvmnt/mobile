import {COLORS, FONTS} from '@constants';
import {FontSizeGenerator} from '@utils/fontSizeGenerator.util';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  detailsCard: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    padding: 16,
  },
  detailsCardInfoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailsCardInfo: {
    alignItems: 'flex-start',
  },
  detailsCardIndicatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsCardIndicatorWrapper: {
    marginLeft: 8,
  },
  DetailsCardInfoText: {
    fontFamily: FONTS.GEO_BOLD,
    fontSize: FontSizeGenerator(15),
    color: COLORS.DARK,
    marginBottom: 8,
  },
  detailsCardImg: {
    width: 54,
    height: 54,
    borderRadius: 50,
    marginRight: 15,
  },
  aboutMeContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  aboutMeTitle: {
    fontFamily: FONTS.GEO_BOLD,
    fontSize: FontSizeGenerator(15),
    color: COLORS.DARK,
    marginBottom: 8,
    minHeight: 20,
  },
  aboutMeText: {
    fontFamily: FONTS.GEO_REGULAR,
    fontSize: FontSizeGenerator(13),
  },
  socialAccountsContainerWrapper: {
    width: '100%',
  },
});
