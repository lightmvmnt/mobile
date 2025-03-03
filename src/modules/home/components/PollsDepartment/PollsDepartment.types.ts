import {Poll, UserPollVotes} from '../../../../store/slices/polls/polls.types';

export interface Props {
  polls: Poll[];
  user_polls_votes: UserPollVotes[];
}
