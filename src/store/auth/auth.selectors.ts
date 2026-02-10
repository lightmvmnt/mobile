import {RootState} from '../store';

export const selectAuth = (state: RootState) => state.auth;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectUser = (state: RootState) => state.auth.user;
export const selectUserTotalPoints = (state: RootState) =>
  state.auth.userTotalPoints;
export const selectUserTotalPointsLoading = (state: RootState) =>
  state.auth.userTotalPointsLoading;
