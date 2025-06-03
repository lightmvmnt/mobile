import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../constants';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: COLORS.DARK,
    backgroundColor: COLORS.LIGHT,
    color: COLORS.DARK,
    paddingHorizontal: 15,
    height: 50,
  },
});
