import {RootState} from '../store';

export const selectRepresentatives = (state: RootState) =>
  state.representatives;
