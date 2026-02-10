import {COLORS, FONTS} from '@constants';
import {FontSizeGenerator} from '@utils/fontSizeGenerator.util';
import {heightGenerator} from '@utils/heightGenerator.util';
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: heightGenerator(),
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    marginBottom: 16,
  },
  taskInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskInfoWrapper: {
    marginLeft: 10,
  },
  cardTopSide: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10,
  },
  cardTopSideTextContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  cardCategoryText: {
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 18 : 16),
    fontFamily: FONTS.GEO_BOLD,
    color: COLORS.DARK,
    height: 23,
  },
  taskTitle: {
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 17 : 15),
    fontFamily: FONTS.GEO_BOLD,
    color: COLORS.DARK,
    width: '70%',
    minHeight: 23,
  },
  cardDescriptionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDescriptionScrollView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    width: 320,
    borderRadius: 8,
  },
  cardDescriptionText: {
    fontFamily: FONTS.GEO_MEDIUM,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 15 : 13),
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
  },
  buttonWrapper: {
    marginLeft: 10,
  },
  cardBottomSide: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
  },
});
