import React from 'react';
import {Props} from './SimpleButton.types';
import {Button} from 'react-native-paper';
import {styles} from './SimpleButton.styles';

function SimpleButton({
  variant,
  text,
  textColor,
  buttonColor,
  width,
  height,
  fontSize,
  Icon,
  onPress,
  buttonLoading,
  disabled,
}: Props) {
  return (
    <Button
      style={[styles.button, {width, height}]}
      contentStyle={[styles.buttonContent, {width, height}]}
      textColor={textColor}
      buttonColor={buttonColor}
      mode={variant}
      disabled={disabled}
      labelStyle={[styles.text, {fontSize}]}
      onPress={onPress}
      icon={Icon ? () => <Icon /> : undefined}
      loading={buttonLoading}>
      {text}
    </Button>
  );
}

export default SimpleButton;
