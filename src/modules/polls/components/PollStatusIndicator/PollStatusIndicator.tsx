import InProgressIcon from '@assets/icons/inProgressIcon.svg';
import React from 'react';
import {Text, View} from 'react-native';

import {styles} from './PollStatusIndicator.styles';

const PollStatusIndicator = ({pollStatus}: {pollStatus: boolean}) => {
  return (
    <View style={styles.indicator}>
      <InProgressIcon width={15} height={15} />
      <Text style={styles.indicatorText}>
        {pollStatus ? 'აქტიური' : 'დასრულებული'}
      </Text>
    </View>
  );
};

export default PollStatusIndicator;
