import {
  Poll,
  PollOption,
  PollResults,
  PollVote,
} from '../../../../store/slices/polls/polls.types';

export interface Props {
  poll: Poll | null;
  votes: PollVote[];
  votes_loading: boolean;
  results_loading: boolean;
  points_loading: boolean;
  points: number | null;
  results: PollResults | null;
  isOptionSelected: (option: PollOption) => boolean;
  handleVoteSelect: (option: PollOption) => void;
}
