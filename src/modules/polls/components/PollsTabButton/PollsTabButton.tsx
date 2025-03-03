import React from 'react';
import {Button} from 'react-native-paper';
import {Props} from './PollsTabButton.types';
import {styles} from './PollsTabButton.styles';
import {COLORS} from '../../../../constants';

const PollsTabButton = ({title, onPress, isActive}: Props) => {
  return (
    <Button
      onPress={onPress}
      mode="contained"
      style={styles.button}
      contentStyle={styles.buttonContent}
      labelStyle={styles.text}
      buttonColor={isActive ? COLORS.DARK : COLORS.GRAY}
      textColor={isActive ? COLORS.LIGHT : COLORS.DARK}>
      {title}
    </Button>
  );
};

export default PollsTabButton;
