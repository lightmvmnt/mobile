import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './SocialsEditForm.styles';

const SocialsButton = ({
  name,
  onButtonPress,
}: {
  name: string;
  onButtonPress: () => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.input}
      onPress={onButtonPress}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

export default SocialsButton;
