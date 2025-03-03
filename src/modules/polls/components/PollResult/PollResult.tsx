import React from 'react';
import {Text, View} from 'react-native';
import {Props} from './PollResult.types';
import {styles} from './PollResult.styles';
import {ActivityIndicator} from 'react-native-paper';
import {COLORS} from '../../../../constants';
import {PercentageCalculator} from '../../../../utils/percentageCalculator.util';

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
