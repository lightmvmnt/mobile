import {createSlice} from '@reduxjs/toolkit';
import {ProfileInitialState} from './profile.types';
import {
  connectUserSocial,
  GetAccountData,
  getConnectedProviders,
  updateAccount,
} from '../../thunks/profile/profile.thunk';

const initialState: ProfileInitialState = {
  socialAccounts: [],
  connectedProviders: [],
  loading: false,
  getConnectedProvidersLoading: false,
  account: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(GetAccountData.rejected, state => {
        state.account = null;
      })
      .addCase(GetAccountData.fulfilled, (state, action) => {
        state.account = action.payload;
      })
      .addCase(updateAccount.pending, state => {
        state.loading = true;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.account = action.payload;
        state.loading = false;
      })
      .addCase(updateAccount.rejected, state => {
        state.loading = false;
      })
      .addCase(connectUserSocial.pending, state => {
        state.loading = true;
      })
      .addCase(connectUserSocial.fulfilled, (state, action) => {
        state.socialAccounts.push(action.payload);
        state.loading = false;
      })
      .addCase(connectUserSocial.rejected, state => {
        state.loading = false;
      })
      .addCase(getConnectedProviders.pending, state => {
        state.getConnectedProvidersLoading = true;
      })
      .addCase(getConnectedProviders.fulfilled, (state, action) => {
        state.getConnectedProvidersLoading = false;
        state.connectedProviders = action.payload.data;
      })
      .addCase(getConnectedProviders.rejected, state => {
        state.getConnectedProvidersLoading = false;
        state.connectedProviders = [];
      });
  },
});

export default profileSlice.reducer;
