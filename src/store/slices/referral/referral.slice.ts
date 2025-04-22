import {createSlice} from '@reduxjs/toolkit';
import {InitialState} from './referral.types';
import {getUserReferralCount} from '../../thunks/referral/referral.thunk';

const initialState: InitialState = {
  referralCount: 0,
  referralLink: '',
  generateReferralLinkLoading: false,
  getReferralCountLoading: false,
};

export const referralSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setReferralLink: (state, action: {payload: string}) => {
      state.referralLink = action.payload;
      state.generateReferralLinkLoading = false;
    },
    changeGenerateReferralLinkLoading: (state, action: {payload: boolean}) => {
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
