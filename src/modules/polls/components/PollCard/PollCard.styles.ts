import {Platform, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../../../constants';
import {FontSizeGenerator} from '../../../../utils/fontSizeGenerator.util';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 250,
    maxHeight: 550,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    marginBottom: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  indicatorsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryIndicatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorWrapper: {
    marginLeft: 8,
  },
  infoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  infoTitle: {
    width: '100%',
    fontFamily: FONTS.GEO_BOLD,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 16 : 15),
    marginBottom: 8,
    minHeight: 22,
  },
  infoDescScrollView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 320,
  },
  infoDesc: {
    width: '100%',
    fontFamily: FONTS.GEO_REGULAR,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 15 : 14),
  },
  actionButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
});
