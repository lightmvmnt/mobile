import {StyleSheet} from 'react-native';
import {FontSizeGenerator} from '../../../../utils/fontSizeGenerator.util';
import {FONTS} from '../../../../constants';

export const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: FontSizeGenerator(20),
    fontFamily: FONTS.GEO_SEMIBOLD,
    height: 30,
  },
  subTitle: {
    width: '100%',
    textAlign: 'left',
    fontSize: FontSizeGenerator(16),
    fontFamily: FONTS.GEO_SEMIBOLD,
    minHeight: 30,
  },
  text: {
    width: '100%',
    textAlign: 'left',
    fontSize: FontSizeGenerator(14),
    marginBottom: 10,
  },
  acceptenceButtonWrapper: {
    marginTop: 20,
  },
});
