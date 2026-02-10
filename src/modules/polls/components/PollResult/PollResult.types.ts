import {PollOption, Result} from '@store/polls/polls.types';

export interface Props {
  option: PollOption;
  result: Result | undefined;
  totalVotesCount: number;
  loading: boolean;
}
