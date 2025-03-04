import React, {useEffect, useState} from 'react';
import {SafeAreaBackgroundWithHeader} from '../../../../globalComponents';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {styles} from './PollDetails.styles';
import {ScreenHeader, SimpleButton} from '../../../../globalComponents';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {COLORS} from '../../../../constants';
import PollDetailsCard from '../../components/PollDetailsCard';
import CompletedIcon from '../../../../assets/icons/CompletedIcon.svg';
import {
  DeletePollVote,
  PostPollVote,
} from '../../../../store/thunks/polls/polls.types';
import {
  deletePollVote,
  postPollVote,
} from '../../../../store/thunks/polls/polls.thunk';
import {PollOption} from '../../../../store/slices/polls/polls.types';

const PollDetailsScreen = () => {
  const {
    poll_details,
    poll_details_loading,
    poll_votes_loading,
    poll_votes,
    poll_results_loading,
    poll_results,
  } = useAppSelector(state => state.polls);

  const [newVotes, setNewVotes] = useState<PostPollVote[]>([]);
  const [oldVotes, setOldVotes] = useState<DeletePollVote[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setNewVotes([]);
    setOldVotes([]);
  }, [poll_votes]);

  const handleVoteSelect = (option: PollOption) => {
    const pollVote = poll_votes.find(vote => vote.option_id === option.id);
    const newVote = newVotes.find(vote => vote.option_id === option.id);
    const oldVote = oldVotes.find(old_vote => old_vote.id === pollVote?.id);

    if (pollVote && !oldVote) {
      setOldVotes(prev => [...prev, {id: pollVote.id}]);
    }

    if (oldVote) {
      setOldVotes(prev => prev.filter(vote => vote.id !== oldVote.id));
    }

    if (!newVote && !pollVote) {
      setNewVotes(prev => [...prev, {option_id: option.id}]);
    }

    if (newVote) {
      setNewVotes(prev =>
        prev.filter(vote => vote.option_id !== newVote.option_id),
      );
    }
  };

  const isOptionSelected = (option: PollOption) => {
    const pollVote = poll_votes.find(vote => vote.option_id === option.id);
    const newVote = newVotes.find(new_vote => new_vote.option_id === option.id);
    const oldVote = oldVotes.find(old_vote => old_vote.id === pollVote?.id);

    if ((pollVote && !oldVote) || newVote) {
      return true;
    }

    return false;
  };

  const handleMultiVote = () => {
    if (!poll_details) {
      return;
    }

    if (newVotes.length) {
      dispatch(
        postPollVote({
          id: poll_details.id,
          votes: newVotes,
        }),
      );
    }

    if (oldVotes.length) {
      let votesQuery = '';

      oldVotes.forEach((oldVote, i) => {
        if (i === 0) {
          votesQuery = `?vote_ids=${oldVote.id}`;
        } else {
          votesQuery = votesQuery + `&vote_ids=${oldVote.id}`;
        }
      });

      dispatch(deletePollVote({id: poll_details.id, votes: votesQuery}));
    }
  };

  const handleMultiVoteButtonColors = () => {
    if (poll_votes.length && !newVotes.length && !oldVotes.length) {
      return true;
    }

    return false;
  };

  return (
    <SafeAreaBackgroundWithHeader>
      {!poll_details_loading ? (
        <View style={styles.detailPage}>
          <ScreenHeader title="გამოკითხვა" />
          <View style={styles.detailTaskContainer}>
            <PollDetailsCard
              poll={poll_details}
              votes={poll_votes}
              results={poll_results}
              results_loading={poll_results_loading}
              isOptionSelected={isOptionSelected}
              handleVoteSelect={handleVoteSelect}
              votes_loading={poll_votes_loading}
            />
            {poll_details?.type === 'multi' ? (
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
                  disabled={poll_votes_loading}
                  buttonLoading={poll_votes_loading}
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
