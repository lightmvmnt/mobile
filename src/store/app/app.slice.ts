import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AppInitialState} from './app.types';

const initialState: AppInitialState = {
  isModalOpen: false,
  modalDescription: '',
  modalTitle: '',
  mainButtonTitle: '',
  secondaryButtonTitle: '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    hideModal: state => {
      state.isModalOpen = false;
    },
    changeModalState: (state, action: PayloadAction<AppInitialState>) => {
      state.isModalOpen = action.payload.isModalOpen;
      state.modalDescription = action.payload.modalDescription;
      state.modalTitle = action.payload.modalTitle;
      state.mainButtonTitle = action.payload.mainButtonTitle;
      state.secondaryButtonTitle = action.payload.secondaryButtonTitle;
    },
  },
});

export const {hideModal, changeModalState} = appSlice.actions;

export default appSlice.reducer;
