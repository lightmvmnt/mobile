import {Platform, Text, TextInput} from 'react-native';

export const configureNativeComponents = () => {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;
  TextInput.defaultProps.autoCorrect =
    Platform.OS === 'ios' || Platform.Version !== 33;
  TextInput.defaultProps.returnKeyType =
    Platform.OS === 'android' && Platform.Version === 33 ? 'none' : 'default';
  TextInput.defaultProps.spellCheck =
    Platform.OS === 'ios' || Platform.Version !== 33;

  // because of emojis, but that was issue why android (samsung) was carshing, let's see
  // TextInput.defaultProps.keyboardType = Platform.OS === 'android' && Platform.Version === 33 ? 'visible-password' : 'default';
};
