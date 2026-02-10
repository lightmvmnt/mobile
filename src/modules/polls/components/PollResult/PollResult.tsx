import {COLORS} from '@constants';
import {PercentageCalculator} from '@utils/percentageCalculator.util';
import React from 'react';
import {Text, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import {styles} from './PollResult.styles';
import {Props} from './PollResult.types';

const PollResult = ({option, result, totalVotesCount, loading}: Props) => {
  return (
    <View style={styles.resultContainer}>
      {loading || !result ? (
        <ActivityIndicator size={16} color={COLORS.DARK} />
      ) : (
        <>
          <Text style={styles.optionText}>{option.title}</Text>
          <View style={styles.divider} />
          <Text style={styles.resultText}>
            {PercentageCalculator(result.vote_count, totalVotesCount)}%
          </Text>
        </>
      )}
    </View>
  );
};

export default PollResult;
