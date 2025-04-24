export interface PollsInitialState {
  loading: boolean;
  polls: Poll[];
  inProgressPolls: Poll[];
  completedPolls: Poll[];
  pollDetails: Poll | null;
  pollDetailsLoading: boolean;
  userPollsVotesLoading: boolean;
  userPollsVotes: UserPollVotes[];
  pollVotesLoading: boolean;
  pollVotes: PollVote[];
  pollResults: PollResults | null;
  pollResultsLoading: boolean;
  pollsPoints: PollPoints[];
  pollPointsLoading: boolean;
}

export interface PollPoints {
  poll_id: number;
  points: number;
}

export interface Poll {
  id: number;
  title: string;
  short_description: string;
  full_description: string;
  type: 'single' | 'multi';
  due_date: Date;
  is_active: boolean;
  options: PollOption[];
}

export interface UserPollVotes {
  poll_id: number;
  votes: PollVote[];
}

export interface PollOption {
  id: number;
  title: string;
}

export interface PollVote {
  id: number;
  option_id: number;
  title: string;
}

export interface PollResults {
  poll_id: string;
  results: Result[];
  total_vote_count: number;
}

export interface Result {
  option_id: number;
  vote_count: number;
}
