import {createSlice} from '@reduxjs/toolkit';
import {AuthInitialState} from './auth.types';
import {
  CheckSessionValidation,
  authentication,
  Logout,
  GetUserData,
  updateUser,
  getUserTotalPoints,
} from '../../thunks/auth/auth.thunk';

const initialState: AuthInitialState = {
  sessionToken: '',
  accessToken: '',
  loading: false,
  isAuth: false,
  user: null,
  account: null,
  deviceId: '',
  userTotalPoints: 0,
  userTotalPointsLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeDeviceId: (state, action) => {
      state.deviceId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authentication.pending, state => {
        state.loading = true;
        state.isAuth = false;
      })
      .addCase(authentication.rejected, state => {
        state.sessionToken = '';
        state.accessToken = '';
        state.user = null;
        state.loading = false;
        state.isAuth = false;
      })
      .addCase(authentication.fulfilled, (state, action) => {
        state.sessionToken = action.payload.meta.session_token;
        state.accessToken = action.payload.meta.access_token;
        state.user = action.payload.data.user;
        state.loading = false;
        state.isAuth = true;
      })
      .addCase(CheckSessionValidation.pending, state => {
        state.loading = true;
        state.isAuth = false;
      })
      .addCase(CheckSessionValidation.rejected, state => {
        state.sessionToken = '';
        state.accessToken = '';
        state.user = null;
        state.isAuth = false;
        state.loading = false;
      })
      .addCase(CheckSessionValidation.fulfilled, (state, action) => {
        state.sessionToken = action.payload.meta.session_token;
        state.accessToken = action.payload.meta.access_token;
        state.user = action.payload.data.user;
        state.isAuth = true;
        state.loading = false;
      })
      .addCase(Logout.pending, state => {
        state.loading = true;
      })
      .addCase(Logout.rejected, state => {
        state.loading = false;
      })
      .addCase(Logout.fulfilled, state => {
        state.accessToken = '';
        state.deviceId = '';
        state.isAuth = false;
        state.loading = false;
        state.sessionToken = '';
        state.user = null;
      })
      .addCase(GetUserData.rejected, state => {
        state.account = null;
      })
      .addCase(GetUserData.fulfilled, (state, action) => {
        state.account = action.payload;
      })
      .addCase(updateUser.pending, state => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.account = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.rejected, state => {
        state.loading = false;
      })
      .addCase(getUserTotalPoints.pending, state => {
        state.userTotalPointsLoading = true;
      })
      .addCase(getUserTotalPoints.fulfilled, (state, action) => {
        state.userTotalPoints = action.payload.points;
        state.userTotalPointsLoading = false;
      })
      .addCase(getUserTotalPoints.rejected, state => {
        state.userTotalPoints = 0;
        state.userTotalPointsLoading = false;
      });
  },
});

export const {changeDeviceId} = authSlice.actions;

export default authSlice.reducer;
