import {createSlice} from '@reduxjs/toolkit';
import {ProfileInitialState} from './profile.types';
import {
  connectUserSocial,
  GetAccountData,
  updateAccount,
} from '../../thunks/profile/profile.thunk';

const initialState: ProfileInitialState = {
  socialAccounts: [],
  loading: false,
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
      });
  },
});

export default profileSlice.reducer;
