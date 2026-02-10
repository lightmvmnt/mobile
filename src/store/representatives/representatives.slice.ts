import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RepresentativesInitialState} from './representatives.types';
import {
  chooseRepresentative,
  getChosenRepresentativeId,
  getRepresentativeDetails,
  getRepresentatives,
  removeChosenRepresentative,
  removeRepresentativeStatus,
  sentRepresentativeRequest,
  updateChosenRepresentative,
  updateRepresentativeDetails,
} from './representatives.thunk';

const representativesInitialState: RepresentativesInitialState = {
  rep_switch_loading: false,
  is_rep_details_updating: false,
  get_representatives_loading: false,
  choose_representative_loading: false,
  get_representative_details_loading: false,
  representative_details: null,
  chosen_representative_id: 0,
  pressed_representative_id: 0,
  representatives: [],
  error: null,
};

export const representativesSlice = createSlice({
  name: 'representatives',
  initialState: representativesInitialState,
  reducers: {
    changePressedRepresentativeId: (state, action: PayloadAction<number>) => {
      state.pressed_representative_id = action.payload;
    },
  },
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
      })
      .addCase(getRepresentatives.pending, state => {
        state.get_representatives_loading = true;
      })
      .addCase(getRepresentatives.fulfilled, (state, action) => {
        state.get_representatives_loading = false;
        state.representatives = action.payload;
      })
      .addCase(getRepresentatives.rejected, state => {
        state.get_representatives_loading = false;
      })
      .addCase(chooseRepresentative.pending, state => {
        state.choose_representative_loading = true;
      })
      .addCase(chooseRepresentative.fulfilled, (state, action) => {
        state.chosen_representative_id = action.payload.leader_user_id;
        state.choose_representative_loading = false;
      })
      .addCase(chooseRepresentative.rejected, state => {
        state.choose_representative_loading = false;
      })
      .addCase(updateChosenRepresentative.pending, state => {
        state.choose_representative_loading = true;
      })
      .addCase(updateChosenRepresentative.fulfilled, (state, action) => {
        state.chosen_representative_id = action.payload.leader_user_id;
        state.choose_representative_loading = false;
      })
      .addCase(updateChosenRepresentative.rejected, state => {
        state.choose_representative_loading = false;
      })
      .addCase(getChosenRepresentativeId.pending, state => {
        state.get_representatives_loading = true;
      })
      .addCase(getChosenRepresentativeId.fulfilled, (state, action) => {
        state.chosen_representative_id = action.payload.leader_user_id;
        state.get_representatives_loading = false;
      })
      .addCase(getChosenRepresentativeId.rejected, state => {
        state.get_representatives_loading = false;
      })
      .addCase(removeChosenRepresentative.pending, state => {
        state.choose_representative_loading = true;
      })
      .addCase(removeChosenRepresentative.fulfilled, state => {
        state.chosen_representative_id = 0;
        state.choose_representative_loading = false;
      })
      .addCase(removeChosenRepresentative.rejected, state => {
        state.choose_representative_loading = false;
      })
      .addCase(getRepresentativeDetails.pending, state => {
        state.get_representative_details_loading = true;
      })
      .addCase(getRepresentativeDetails.fulfilled, (state, action) => {
        state.representative_details = action.payload;
        state.get_representative_details_loading = false;
      })
      .addCase(getRepresentativeDetails.rejected, state => {
        state.get_representative_details_loading = false;
      });
  },
});

export const {changePressedRepresentativeId} = representativesSlice.actions;

export default representativesSlice.reducer;
