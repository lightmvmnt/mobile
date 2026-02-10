import React from 'react';
import {Text, View} from 'react-native';

import {styles} from './SimpleIndicator.styles';
import {Props} from './SimpleIndicator.types';

const SimpleIndicator = ({text, Icon}: Props) => {
  return (
    <View style={styles.indicator}>
      {Icon && <Icon width={14} height={14} />}
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

export default SimpleIndicator;
