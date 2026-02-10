import {RootState} from '../store';

export const selectProfile = (state: RootState) => state.profile;
export const selectAccount = (state: RootState) => state.profile.account;
