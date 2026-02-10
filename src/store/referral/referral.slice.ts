import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {getUserReferralCount} from './referral.thunk';
import {ReferralInitialState} from './referral.types';

const initialState: ReferralInitialState = {
  referralCount: 0,
  referralLink: '',
  generateReferralLinkLoading: false,
  getReferralCountLoading: false,
};

export const referralSlice = createSlice({
  name: 'referral',
  initialState,
  reducers: {
    setReferralLink: (state, action: PayloadAction<string>) => {
      state.referralLink = action.payload;
      state.generateReferralLinkLoading = false;
    },
    changeGenerateReferralLinkLoading: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.generateReferralLinkLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserReferralCount.pending, state => {
        state.getReferralCountLoading = true;
      })
      .addCase(getUserReferralCount.fulfilled, (state, action) => {
        state.referralCount = action.payload.count;
        state.getReferralCountLoading = false;
      })
      .addCase(getUserReferralCount.rejected, state => {
        state.referralCount = 0;
        state.getReferralCountLoading = false;
      });
  },
});

export const {setReferralLink, changeGenerateReferralLinkLoading} =
  referralSlice.actions;

export default referralSlice.reducer;
