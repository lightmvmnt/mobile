import {Poll, PollPoints} from '@store/polls/polls.types';

export interface Props {
  poll: Poll;
  polls_points: PollPoints[];
  points_loading: boolean;
  isPollVoted: (id: number) => boolean;
}
