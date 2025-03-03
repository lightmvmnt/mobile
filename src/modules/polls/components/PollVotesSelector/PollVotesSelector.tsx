import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Props} from './PollVotesSelector.types';
import {styles} from './PollVotesSelector.styles';
import CheckedIcon from '../../../../assets/images/checked.svg';
import UncheckedIcon from '../../../../assets/images/unchecked.svg';

const PollVotesSelector = ({
  options,
  isOptionSelected,
  handleVoteSelect,
  loading,
}: Props) => {
  return (
    <ScrollView>
      {options.map((option, index) => (
        <TouchableOpacity
          onPress={() => handleVoteSelect(option)}
          disabled={loading}
          key={index}
          style={[
            styles.selector,
            isOptionSelected(option) ? styles.selected : styles.select,
          ]}
          activeOpacity={0.8}>
          <Text
            style={[
              styles.selectorText,
              isOptionSelected(option)
                ? styles.selectedText
                : styles.selectText,
            ]}>
            {option.title}
          </Text>
          <View style={styles.voteIndicator}>
            {isOptionSelected(option) ? (
              <CheckedIcon width={15} height={15} />
            ) : (
              <UncheckedIcon width={15} height={15} />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default PollVotesSelector;
