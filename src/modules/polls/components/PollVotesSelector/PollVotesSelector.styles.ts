import {COLORS, FONTS} from '@constants';
import {FontSizeGenerator} from '@utils/fontSizeGenerator.util';
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  selector: {
    width: 320,
    height: 40,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  select: {
    backgroundColor: COLORS.GRAY,
  },
  selected: {
    backgroundColor: COLORS.DARK,
  },
  selectorText: {
    fontFamily: FONTS.GEO_SEMIBOLD,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 15 : 13),
    minHeight: 20,
  },
  selectText: {
    color: COLORS.DARK,
  },
  selectedText: {
    color: COLORS.LIGHT,
  },
  voteIndicator: {
    position: 'absolute',
    right: 15,
  },
});
