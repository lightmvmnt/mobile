import {Platform, StyleSheet} from 'react-native';

import {FONTS, LAYOUT} from '../../constants';
import {FontSizeGenerator} from '../../utils/fontSizeGenerator.util';

export const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    height: 200,
    width: LAYOUT.WIDTH - 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: FONTS.GEO_SEMIBOLD,
    fontSize: FontSizeGenerator(16),
    marginBottom: 15,
    height: 30,
  },
  modalText: {
    fontFamily: FONTS.GEO_REGULAR,
    fontSize: FontSizeGenerator(Platform.OS === 'android' ? 14 : 12),
    textAlign: 'center',
    minHeight: 23,
    marginBottom: 15,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    flex: 0.3,
  },
});
