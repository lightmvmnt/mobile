import {PollOption, PollVote} from '@store/polls/polls.types';

export interface Props {
  poll_id: number;
  option: PollOption;
  votes: PollVote[];
  loading: boolean;
}
