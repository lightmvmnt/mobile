import {createSlice} from '@reduxjs/toolkit';

import {
  deletePollVote,
  getAllPolls,
  getPoll,
  getPollResults,
  getPollsPoints,
  getPollVote,
  getUserPollsVotes,
  postPollVote,
} from './polls.thunk';
import {PollsInitialState} from './polls.types';

const initialState: PollsInitialState = {
  polls: [],
  inProgressPolls: [],
  completedPolls: [],
  userPollsVotes: [],
  pollVotes: [],
  pollsPoints: [],
  pollDetails: null,
  pollResults: null,
  loading: false,
  pollDetailsLoading: false,
  userPollsVotesLoading: false,
  pollVotesLoading: false,
  pollResultsLoading: false,
  pollPointsLoading: false,
  error: null,
};

export const pollsSlice = createSlice({
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
        state.inProgressPolls = action.payload.filter(poll => poll.is_active);
        state.completedPolls = action.payload.filter(poll => !poll.is_active);
        state.loading = false;
      })
      .addCase(getAllPolls.rejected, state => {
        state.loading = false;
      })
      .addCase(getPoll.pending, state => {
        state.pollDetailsLoading = true;
      })
      .addCase(getPoll.fulfilled, (state, action) => {
        state.pollDetails = action.payload;
        state.pollDetailsLoading = false;
      })
      .addCase(getPoll.rejected, state => {
        state.pollDetailsLoading = false;
      })
      .addCase(getUserPollsVotes.pending, state => {
        state.userPollsVotesLoading = true;
      })
      .addCase(getUserPollsVotes.fulfilled, (state, action) => {
        state.userPollsVotes = action.payload;
        state.userPollsVotesLoading = false;
      })
      .addCase(getUserPollsVotes.rejected, state => {
        state.userPollsVotesLoading = false;
      })
      .addCase(getPollVote.pending, state => {
        state.pollVotesLoading = true;
      })
      .addCase(getPollVote.fulfilled, (state, action) => {
        state.pollVotes = action.payload;
        state.pollVotesLoading = false;
      })
      .addCase(getPollVote.rejected, state => {
        state.pollVotesLoading = false;
      })
      .addCase(postPollVote.pending, state => {
        state.pollVotesLoading = true;
      })
      .addCase(postPollVote.rejected, state => {
        state.pollVotesLoading = false;
      })
      .addCase(deletePollVote.pending, state => {
        state.pollVotesLoading = true;
      })
      .addCase(deletePollVote.rejected, state => {
        state.pollVotesLoading = false;
      })
      .addCase(getPollResults.pending, state => {
        state.pollResultsLoading = true;
      })
      .addCase(getPollResults.fulfilled, (state, action) => {
        state.pollResults = action.payload;
        state.pollResultsLoading = false;
      })
      .addCase(getPollResults.rejected, state => {
        state.pollResultsLoading = false;
      })
      .addCase(getPollsPoints.pending, state => {
        state.pollPointsLoading = true;
      })
      .addCase(getPollsPoints.fulfilled, (state, action) => {
        state.pollsPoints = action.payload;
        state.pollPointsLoading = false;
      })
      .addCase(getPollsPoints.rejected, state => {
        state.pollsPoints = [];
        state.pollPointsLoading = false;
      });
  },
});

export default pollsSlice.reducer;
