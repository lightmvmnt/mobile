import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import {FontSizeGenerator} from '../../utils/fontSizeGenerator.util';

export const styles = StyleSheet.create({
  viewerIndicator: {
    width: 60,
    height: 40,
    marginRight: 10,
    backgroundColor: COLORS.SECONDARY_BG_COLOR,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewerIndicatorText: {
    fontSize: FontSizeGenerator(14),
    fontFamily: FONTS.GEO_SEMIBOLD,
    color: COLORS.DARK,
    marginLeft: 5,
  },
});
