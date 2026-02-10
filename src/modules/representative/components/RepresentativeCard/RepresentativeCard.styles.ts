import {COLORS, FONTS} from '@constants';
import {FontSizeGenerator} from '@utils/fontSizeGenerator.util';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 140,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 10,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {},
  cardInfoText: {
    fontFamily: FONTS.GEO_BOLD,
    color: COLORS.DARK,
    fontSize: FontSizeGenerator(15),
    marginBottom: 8,
  },
  cardImg: {
    width: 54,
    height: 54,
    borderRadius: 50,
    marginRight: 15,
  },
});
