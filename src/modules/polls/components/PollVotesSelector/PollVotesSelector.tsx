import CheckedIcon from '@assets/icons/checked.svg';
import UncheckedIcon from '@assets/icons/unchecked.svg';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {styles} from './PollVotesSelector.styles';
import {Props} from './PollVotesSelector.types';

const PollVotesSelector = ({
  options,
  isOptionSelected,
  handleVoteSelect,
  loading,
}: Props) => {
  return (
    <>
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
    </>
  );
};

export default PollVotesSelector;
