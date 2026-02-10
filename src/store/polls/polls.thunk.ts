import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  GetPollPointsResponse,
  GetPollResultsResponse,
  GetPollsResponse,
  GetUserPollVotesResponse,
  PostPollVote,
  PollVote,
} from './polls.types';
import {GetStorageObject} from '../../utils/asyncStore.util';
import axios from 'axios';
import {getUserTotalPoints} from '../auth/auth.thunk';
import {environment} from '@constants/environment';

export const getAllPolls = createAsyncThunk(
  'polls/getAllPolls',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get<GetPollsResponse[]>(
        `${environment.API_BASE_URL}/polls/`,
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const getPoll = createAsyncThunk(
  'polls/getPoll',
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await axios.get<GetPollsResponse>(
        `${environment.API_BASE_URL}/polls/${id}/`,
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const getUserPollsVotes = createAsyncThunk(
  'polls/getUserPollsVotes',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get<GetUserPollVotesResponse[]>(
        `${environment.API_BASE_URL}/polls/votes/`,
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const getPollVote = createAsyncThunk(
  'polls/getPollVote',
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await axios.get<PollVote[]>(
        `${environment.API_BASE_URL}/polls/${id}/vote/`,
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const postPollVote = createAsyncThunk(
  'polls/postPollVote',
  async (
    {id, votes}: {id: number; votes: PostPollVote[]},
    {rejectWithValue, dispatch},
  ) => {
    try {
      const body = JSON.stringify(votes);

      const response = await axios.post<PollVote[]>(
        `${environment.API_BASE_URL}/polls/${id}/vote/`,
        body,
      );

      if (response.status === 201) {
        dispatch(getPollVote(id));
        dispatch(getUserPollsVotes());
        dispatch(getUserTotalPoints());
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const deletePollVote = createAsyncThunk(
  'polls/deletePollVote',
  async (
    {id, votes}: {id: number; votes: string},
    {rejectWithValue, dispatch},
  ) => {
    try {
      const response = await axios.delete(
        `${environment.API_BASE_URL}/polls/${id}/vote/${votes}`,
      );

      if (response.status === 204) {
        dispatch(getPollVote(id));
        dispatch(getUserPollsVotes());
        dispatch(getUserTotalPoints());
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const getPollResults = createAsyncThunk(
  'polls/getPollResults',
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await axios.get<GetPollResultsResponse>(
        `${environment.API_BASE_URL}/polls/${id}/results/`,
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const getPollsPoints = createAsyncThunk(
  'polls/getPollsPoints',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get<GetPollPointsResponse[]>(
        `${environment.API_BASE_URL}/polls/points/`,
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);
