import {createSlice} from '@reduxjs/toolkit';
import {RepresentativesInitialState} from './representatives.types';
import {
  removeRepresentativeStatus,
  sentRepresentativeRequest,
  updateRepresentativeDetails,
} from '../../thunks/representatives/representatives.thunk';

const representativesInitialState: RepresentativesInitialState = {
  rep_switch_loading: false,
  is_rep_details_updating: false,
};

export const representativesSlice = createSlice({
  name: 'representatives',
  initialState: representativesInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(sentRepresentativeRequest.pending, state => {
        state.rep_switch_loading = true;
      })
      .addCase(sentRepresentativeRequest.fulfilled, state => {
        state.rep_switch_loading = false;
      })
      .addCase(sentRepresentativeRequest.rejected, state => {
        state.rep_switch_loading = false;
      })
      .addCase(removeRepresentativeStatus.pending, state => {
        state.rep_switch_loading = true;
      })
      .addCase(removeRepresentativeStatus.fulfilled, state => {
        state.rep_switch_loading = false;
      })
      .addCase(removeRepresentativeStatus.rejected, state => {
        state.rep_switch_loading = false;
      })
      .addCase(updateRepresentativeDetails.pending, state => {
        state.is_rep_details_updating = true;
      })
      .addCase(updateRepresentativeDetails.fulfilled, state => {
        state.is_rep_details_updating = false;
      })
      .addCase(updateRepresentativeDetails.rejected, state => {
        state.is_rep_details_updating = false;
      });
  },
});

export default representativesSlice.reducer;
