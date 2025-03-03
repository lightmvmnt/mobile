import {createSlice} from '@reduxjs/toolkit';
import {PollsInitialState} from './polls.types';
import {
  deletePollVote,
  getAllPolls,
  getPoll,
  getPollResults,
  getPollVote,
  getUserPollsVotes,
  postPollVote,
} from '../../thunks/polls/polls.thunk';

const initialState: PollsInitialState = {
  polls: [],
  in_progress_polls: [],
  completed_polls: [],
  user_polls_votes: [],
  poll_votes: [],
  poll_details: null,
  poll_results: null,
  loading: false,
  poll_details_loading: false,
  user_polls_votes_loading: false,
  poll_votes_loading: false,
  poll_results_loading: false,
};

export const PollsSlice = createSlice({
  name: 'polls',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllPolls.pending, state => {
        state.loading = true;
      })
      .addCase(getAllPolls.fulfilled, (state, action) => {
        state.polls = action.payload;
        state.in_progress_polls = action.payload.filter(poll => poll.is_active);
        state.completed_polls = action.payload.filter(poll => !poll.is_active);
        state.loading = false;
      })
      .addCase(getAllPolls.rejected, state => {
        state.loading = false;
      })
      .addCase(getPoll.pending, state => {
        state.poll_details_loading = true;
      })
      .addCase(getPoll.fulfilled, (state, action) => {
        state.poll_details = action.payload;
        state.poll_details_loading = false;
      })
      .addCase(getPoll.rejected, state => {
        state.poll_details_loading = false;
      })
      .addCase(getUserPollsVotes.pending, state => {
        state.user_polls_votes_loading = true;
      })
      .addCase(getUserPollsVotes.fulfilled, (state, action) => {
        state.user_polls_votes = action.payload;
        state.user_polls_votes_loading = false;
      })
      .addCase(getUserPollsVotes.rejected, state => {
        state.user_polls_votes_loading = false;
      })
      .addCase(getPollVote.pending, state => {
        state.poll_votes_loading = true;
      })
      .addCase(getPollVote.fulfilled, (state, action) => {
        state.poll_votes = action.payload;
        state.poll_votes_loading = false;
      })
      .addCase(getPollVote.rejected, state => {
        state.poll_votes_loading = false;
      })
      .addCase(postPollVote.pending, state => {
        state.poll_votes_loading = true;
      })
      .addCase(postPollVote.rejected, state => {
        state.poll_votes_loading = false;
      })
      .addCase(deletePollVote.pending, state => {
        state.poll_votes_loading = true;
      })
      .addCase(deletePollVote.rejected, state => {
        state.poll_votes_loading = false;
      })
      .addCase(getPollResults.pending, state => {
        state.poll_results_loading = true;
      })
      .addCase(getPollResults.fulfilled, (state, action) => {
        state.poll_results = action.payload;
        state.poll_results_loading = false;
      })
      .addCase(getPollResults.rejected, state => {
        state.poll_results_loading = false;
      });
  },
});

export default PollsSlice.reducer;
