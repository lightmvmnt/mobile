import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './PollStatusIndicator.styles';
import InProgressIcon from '../../../../assets/icons/inProgressIcon.svg';

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
