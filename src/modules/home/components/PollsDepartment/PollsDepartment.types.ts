import {
  Poll,
  PollPoints,
  UserPollVotes,
} from '@store/polls/polls.types';

export interface Props {
  polls: Poll[];
  polls_points: PollPoints[];
  user_polls_votes: UserPollVotes[];
  poll_points_loading: boolean;
}
