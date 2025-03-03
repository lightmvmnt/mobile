/* eslint-disable @typescript-eslint/no-unused-vars */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  GetPollResultsResponse,
  GetPollsResponse,
  GetUserPollVotesResponse,
  PollOption,
  PollVote,
  PostPollVote,
} from './polls.types';
import {enviroment} from '../../../utils/enviroment';
import axios from 'axios';
import {GetStorageObject} from '../../../utils/asyncStore.util';

export const getAllPolls = createAsyncThunk(
  'polls/getAllPolls',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get<GetPollsResponse[]>(
        `${enviroment.API_BASE_URL}/polls/`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getPoll = createAsyncThunk(
  'polls/getPoll',
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await axios.get<GetPollsResponse>(
        `${enviroment.API_BASE_URL}/polls/${id}/`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getUserPollsVotes = createAsyncThunk(
  'polls/getUserPollsVotes',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get<GetUserPollVotesResponse[]>(
        `${enviroment.API_BASE_URL}/polls/votes/`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getPollVote = createAsyncThunk(
  'polls/getPollVote',
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await axios.get<PollVote[]>(
        `${enviroment.API_BASE_URL}/polls/${id}/vote/`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
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
      const access_token = await GetStorageObject('access_token');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      };

      const body = JSON.stringify(votes);

      const response = await axios.post<PollVote[]>(
        `${enviroment.API_BASE_URL}/polls/${id}/vote/`,
        body,
        config,
      );

      if (response.status === 201) {
        dispatch(getPollVote(id));
        dispatch(getUserPollsVotes());
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
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
      const access_token = await GetStorageObject('access_token');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      };

      const response = await axios.delete(
        `${enviroment.API_BASE_URL}/polls/${id}/vote/${votes}`,
        config,
      );

      if (response.status === 204) {
        dispatch(getPollVote(id));
        dispatch(getUserPollsVotes());
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getPollResults = createAsyncThunk(
  'polls/getPollResults',
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await axios.get<GetPollResultsResponse>(
        `${enviroment.API_BASE_URL}/polls/${id}/results/`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
