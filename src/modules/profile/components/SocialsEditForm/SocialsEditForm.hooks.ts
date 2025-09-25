import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {removeUserSocial} from '../../../../store/thunks/profile/profile.thunk';
import {changeModalState} from '../../../../store/slices/app/app.slice';
import {changeSocialAddModalVisibility} from '../../../../store/slices/profile/profile.slice';

export const useSocialsEditForm = () => {
  const {socialAccounts, account, removeSocialAccountLoading} = useAppSelector(
    state => state.profile,
  );

  const dispatch = useAppDispatch();

  const findSocialAccount = (id: number) => {
    const socialAccount = socialAccounts.find(social => social.type_id === id);

    return socialAccount;
  };

  const onSocialButtonPress = (id: number) => {
    const socialAccount = socialAccounts.find(social => social.type_id === id);

    if (socialAccount) {
      dispatch(
        changeModalState({
          isModalOpen: true,
          modalDescription: 'ნამდვილად გსურთ ანგარიშს მოხსნა?',
          modalButtonHandler: () => {
            dispatch(removeUserSocial(socialAccount.id));
          },
          mainButtonTitle: 'კი',
          secondaryButtonTitle: 'არა',
        }),
      );
    } else {
      dispatch(changeSocialAddModalVisibility({visible: true, type_id: id}));
    }
  };

  return {
    account,
    removeSocialAccountLoading,
    findSocialAccount,
    onSocialButtonPress,
  };
};

// const onFaceBookConnect = async () => {
//   const result = await LoginManager.logInWithPermissions(
//     ['public_profile'],
//     'limited',
//   );

//   if (result.isCancelled) {
//     console.log('Facebook login cancelled');
//     return;
//   }

//   if (Platform.OS === 'ios') {
//     const idTokenObj = await AuthenticationToken.getAuthenticationTokenIOS();

//     if (idTokenObj) {
//       dispatch(
//         connectFacebookProfile({
//           id_token: idTokenObj.authenticationToken,
//           navigation,
//         }),
//       );
//     }
//   } else if (Platform.OS === 'android') {
//     const accessTokenObj = await AccessToken.getCurrentAccessToken();

//     if (accessTokenObj) {
//       dispatch(
//         connectFacebookProfile({
//           access_token: accessTokenObj.accessToken,
//           navigation,
//         }),
//       );
//     }
//   }
// };

// const onFacebookDisconnect = (provider: ConnectedProvider) => {
//   const removeConnectedProviderPayload = {
//     provider: 'facebook',
//     account: provider.uid,
//   };

//   dispatch(
//     changeModalState({
//       isModalOpen: true,
//       modalDescription: 'ნამდვილად გსურთ ფეისბუქ ანგარიშს მოხსნა?',
//       modalButtonHandler: () => {
//         dispatch(
//           removeConnectedProvider({
//             provider: removeConnectedProviderPayload,
//             navigation,
//           }),
//         );
//       },
//       mainButtonTitle: 'კი',
//       secondaryButtonTitle: 'არა',
//     }),
//   );
// };

// const isFacebookConnected = () => {
//   return connectedProviders.find(
//     provider => provider.provider.id === 'facebook',
//   );
// };

// const facebookButtonHandler = () => {
//   const facebookProvider = isFacebookConnected();

//   if (facebookProvider) {
//     onFacebookDisconnect(facebookProvider);
//   } else {
//     onFaceBookConnect();
//   }
// };
