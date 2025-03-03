import React from 'react';
import {Button} from 'react-native-paper';
import {Props} from './PollVoteButton.types';
import {styles} from './PollVoteButton.styles';
import {COLORS} from '../../../../constants';
import {useAppDispatch} from '../../../../store/store';
import {
  deletePollVote,
  postPollVote,
} from '../../../../store/thunks/polls/polls.thunk';
import {PostPollVote} from '../../../../store/thunks/polls/polls.types';

const PollVoteButton = ({option, votes, poll_id, loading}: Props) => {
  const dispatch = useAppDispatch();

  const handleVoteButtonColors = () => {
    const isVoted = votes.find(vote => vote.option_id === option.id)
      ? true
      : false;

    if (isVoted) {
      return {text: COLORS.LIGHT, button: COLORS.DARK};
    }

    return {text: COLORS.DARK, button: COLORS.GRAY};
  };

  const handleVote = () => {
    const newVote: PostPollVote[] = [
      {
        option_id: option.id,
      },
    ];

    const existingVote = votes.find(vote => vote.option_id === option.id);

    if (!votes.length) {
      dispatch(postPollVote({id: poll_id, votes: newVote}));
    }

    if (votes.length && !existingVote) {
      const deleteVoteQuery = `?vote_ids=${votes[0].id}`;
      dispatch(deletePollVote({id: poll_id, votes: deleteVoteQuery}));
      dispatch(postPollVote({id: poll_id, votes: newVote}));
    }

    if (votes.length && existingVote) {
      const deleteVoteQuery = `?vote_ids=${existingVote.id}`;
      dispatch(deletePollVote({id: poll_id, votes: deleteVoteQuery}));
    }
  };

  return (
    <Button
      mode="contained"
      style={styles.button}
      contentStyle={styles.buttonContent}
      textColor={handleVoteButtonColors().text}
      buttonColor={handleVoteButtonColors().button}
      loading={loading}
      disabled={loading}
      onPress={handleVote}
      labelStyle={styles.text}>
      {option.title}
    </Button>
  );
};

export default PollVoteButton;
