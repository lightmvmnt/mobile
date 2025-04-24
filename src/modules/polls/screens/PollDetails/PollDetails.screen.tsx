import React from 'react';
import {SafeAreaBackgroundWithHeader} from '../../../../globalComponents';
import {styles} from './PollDetails.styles';
import {SimpleButton} from '../../../../globalComponents';
import {ScrollView, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {COLORS} from '../../../../constants';
import PollDetailsCard from '../../components/PollDetailsCard';
import CompletedIcon from '../../../../assets/icons/CompletedIcon.svg';

import {usePollDetails} from './PollDetails.hook';

const PollDetailsScreen = () => {
  const {
    pollDetails,
    pollVotes,
    pollResults,
    pollPoints,
    pollDetailsLoading,
    pollVotesLoading,
    pollResultsLoading,
    pollPointsLoading,
    handleVoteSelect,
    handleMultiVote,
    isOptionSelected,
    handleMultiVoteButtonColors,
  } = usePollDetails();

  return (
    <SafeAreaBackgroundWithHeader>
      {!pollDetailsLoading ? (
        <View style={styles.detailPage}>
          <View style={styles.detailTaskContainer}>
            {pollDetails?.is_active ? (
              <ScrollView contentContainerStyle={styles.detailTaskScrollView}>
                <PollDetailsCard
                  poll={pollDetails}
                  votes={pollVotes}
                  results={pollResults}
                  points={pollPoints}
                  results_loading={pollResultsLoading}
                  votes_loading={pollVotesLoading}
                  points_loading={pollPointsLoading}
                  handleVoteSelect={handleVoteSelect}
                  isOptionSelected={isOptionSelected}
                />
              </ScrollView>
            ) : (
              <PollDetailsCard
                poll={pollDetails}
                votes={pollVotes}
                results={pollResults}
                points={pollPoints}
                isOptionSelected={isOptionSelected}
                handleVoteSelect={handleVoteSelect}
                results_loading={pollResultsLoading}
                votes_loading={pollVotesLoading}
                points_loading={pollPointsLoading}
              />
            )}
            {pollDetails?.type === 'multi' ? (
              <View style={styles.confirmButtonContainer}>
                <SimpleButton
                  width={320}
                  height={40}
                  text={
                    handleMultiVoteButtonColors()
                      ? 'დაფიქსირებული'
                      : 'დაფიქსირება'
                  }
                  onPress={handleMultiVote}
                  disabled={pollVotesLoading}
                  buttonLoading={pollVotesLoading}
                  Icon={
                    handleMultiVoteButtonColors() ? CompletedIcon : undefined
                  }
                  variant="contained"
                  buttonColor={
                    handleMultiVoteButtonColors() ? COLORS.GRAY : COLORS.MAIN
                  }
                  textColor={
                    handleMultiVoteButtonColors() ? COLORS.DARK : COLORS.LIGHT
                  }
                />
              </View>
            ) : null}
          </View>
        </View>
      ) : (
        <ActivityIndicator animating={true} size={50} color={COLORS.MAIN} />
      )}
    </SafeAreaBackgroundWithHeader>
  );
};

export default PollDetailsScreen;
