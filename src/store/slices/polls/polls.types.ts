export interface PollsInitialState {
  loading: boolean;
  polls: Poll[];
  in_progress_polls: Poll[];
  completed_polls: Poll[];
  poll_details: Poll | null;
  poll_details_loading: boolean;
  user_polls_votes_loading: boolean;
  user_polls_votes: UserPollVotes[];
  poll_votes_loading: boolean;
  poll_votes: PollVote[];
  poll_results: PollResults | null;
  poll_results_loading: boolean;
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
