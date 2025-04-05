import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {
  DeletePollVote,
  PostPollVote,
} from '../../../../store/thunks/polls/polls.types';
import {PollOption} from '../../../../store/slices/polls/polls.types';
import {
  deletePollVote,
  postPollVote,
} from '../../../../store/thunks/polls/polls.thunk';

export const usePollDetails = () => {
  const {
    pollDetails,
    pollVotes,
    pollResults,
    pollsPoints,
    pollDetailsLoading,
    pollVotesLoading,
    pollResultsLoading,
    pollPointsLoading,
  } = useAppSelector(state => state.polls);

  const [newVotes, setNewVotes] = useState<PostPollVote[]>([]);
  const [oldVotes, setOldVotes] = useState<DeletePollVote[]>([]);
  const [pollPoints, setPollPoints] = useState<number | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!pollDetails || !pollsPoints) {
      return;
    }

    const poll_points = pollsPoints.find(
      poll => poll.poll_id === pollDetails.id,
    );

    if (poll_points) {
      setPollPoints(poll_points.points);
    }
  }, [pollDetails, pollsPoints, pollPoints]);

  useEffect(() => {
    setNewVotes([]);
    setOldVotes([]);
  }, [pollVotes]);

  const handleVoteSelect = (option: PollOption) => {
    const pollVote = pollVotes.find(vote => vote.option_id === option.id);
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
    const pollVote = pollVotes.find(vote => vote.option_id === option.id);
    const newVote = newVotes.find(new_vote => new_vote.option_id === option.id);
    const oldVote = oldVotes.find(old_vote => old_vote.id === pollVote?.id);

    if ((pollVote && !oldVote) || newVote) {
      return true;
    }

    return false;
  };

  const handleMultiVote = () => {
    if (!pollDetails) {
      return;
    }

    if (newVotes.length) {
      dispatch(
        postPollVote({
          id: pollDetails.id,
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

      dispatch(deletePollVote({id: pollDetails.id, votes: votesQuery}));
    }
  };

  const handleMultiVoteButtonColors = () => {
    if (pollVotes.length && !newVotes.length && !oldVotes.length) {
      return true;
    }

    return false;
  };

  return {
    pollDetails,
    pollVotes,
    pollResults,
    pollPoints,
    pollDetailsLoading,
    pollVotesLoading,
    pollResultsLoading,
    pollPointsLoading,
    handleVoteSelect,
    isOptionSelected,
    handleMultiVote,
    handleMultiVoteButtonColors,
  };
};
