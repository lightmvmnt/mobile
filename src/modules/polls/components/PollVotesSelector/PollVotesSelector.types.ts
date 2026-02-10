import {PollOption} from '@store/polls/polls.types';

export interface Props {
  options: PollOption[];
  loading: boolean;
  isOptionSelected: (option: PollOption) => boolean;
  handleVoteSelect: (option: PollOption) => void;
}
