import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProfileInitialState} from './profile.types';
import {
  connectUserSocial,
  GetAccountData,
  getConnectedProviders,
  getUserSocials,
  removeUserSocial,
  updateAccount,
} from './profile.thunk';

const initialState: ProfileInitialState = {
  socialAccounts: [],
  connectedProviders: [],
  loading: false,
  getConnectedProvidersLoading: false,
  account: null,
  removeSocialAccountLoading: false,
  socialAddModalProps: {
    visible: false,
    typeId: 0,
  },
  error: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    changeSocialAddModalVisibility: (
      state,
      action: PayloadAction<{visible: boolean; type_id: number}>,
    ) => {
      state.socialAddModalProps = {
        visible: action.payload.visible,
        typeId: action.payload.type_id,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(GetAccountData.rejected, state => {
        state.account = null;
      })
      .addCase(GetAccountData.fulfilled, (state, action) => {
        state.account = action.payload;
      })
      .addCase(getUserSocials.rejected, state => {
        state.socialAccounts = [];
      })
      .addCase(getUserSocials.fulfilled, (state, action) => {
        state.socialAccounts = action.payload;
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
        state.socialAddModalProps = {
          visible: false,
          typeId: 0,
        };
      })
      .addCase(removeUserSocial.pending, state => {
        state.removeSocialAccountLoading = true;
      })
      .addCase(removeUserSocial.rejected, state => {
        state.removeSocialAccountLoading = false;
      })
      .addCase(removeUserSocial.fulfilled, (state, action) => {
        state.socialAccounts = state.socialAccounts.filter(
          socialAccount => socialAccount.id !== action.meta.arg,
        );
        state.removeSocialAccountLoading = false;
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

export const {changeSocialAddModalVisibility} = profileSlice.actions;

export default profileSlice.reducer;
