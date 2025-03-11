import {createSlice} from '@reduxjs/toolkit';
import {AppInitialState} from './app.types';

const initialState: AppInitialState = {
  isModalOpen: false,
  modalDescription: '',
  modalButtonHandler: () => {},
  modalTitle: '',
  mainButtonTitle: '',
  secondaryButtonTitle: '',
  referralLink: '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    hideModal: state => {
      state.isModalOpen = false;
    },
    openModal: state => {
      state.isModalOpen = true;
    },
    changeModalState: (state, action: {payload: AppInitialState}) => {
      state.isModalOpen = action.payload.isModalOpen;
      state.modalDescription = action.payload.modalDescription;
      state.modalButtonHandler = action.payload.modalButtonHandler;
      state.modalTitle = action.payload.modalTitle;
      state.mainButtonTitle = action.payload.mainButtonTitle;
      state.secondaryButtonTitle = action.payload.secondaryButtonTitle;
    },
    changeReferralLink: (state, action: {payload: string}) => {
      state.referralLink = action.payload;
    },
  },
});

export const {hideModal, openModal, changeModalState, changeReferralLink} =
  appSlice.actions;

export default appSlice.reducer;
