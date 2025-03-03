import {Poll} from '../../../../store/slices/polls/polls.types';

export interface Props {
  poll: Poll;
  isPollVoted: (id: number) => boolean;
}
