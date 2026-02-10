import React from 'react';
import {Text, View} from 'react-native';

import {styles} from './ProfileForm.styles';

interface Props {
  name: string;
  value: string;
}

const FormInput = ({name, value}: Props) => {
  return (
    <View style={styles.input}>
      <Text style={styles.inputTitle}>{name}:</Text>
      <Text style={styles.inputValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
};

export default FormInput;
