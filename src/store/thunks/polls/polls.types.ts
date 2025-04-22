export interface GetPollsResponse {
  id: number;
  title: string;
  short_description: string;
  full_description: string;
  type: 'single' | 'multi';
  due_date: Date;
  is_active: boolean;
  options: PollOption[];
}

export interface GetUserPollVotesResponse {
  poll_id: number;
  votes: PollVote[];
}

export interface GetPollResultsResponse {
  poll_id: string;
  results: PollResult[];
  total_vote_count: number;
}

export interface GetPollPointsResponse {
  poll_id: number;
  points: number;
}

export interface PollResult {
  option_id: number;
  vote_count: number;
}

export interface PostPollVote {
  option_id: number;
}

export interface DeletePollVote {
  id: number;
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
