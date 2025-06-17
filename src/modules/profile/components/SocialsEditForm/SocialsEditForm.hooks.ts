import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {AuthenticationToken, LoginManager} from 'react-native-fbsdk-next';
import {
  connectFacebookProfile,
  removeConnectedProvider,
} from '../../../../store/thunks/profile/profile.thunk';
import {NavigationProps} from '../../../../services/navigation/Base.navigation';
import {ConnectedProvider} from '../../../../store/slices/profile/profile.types';
import {changeModalState} from '../../../../store/slices/app/app.slice';

export const useSocialsEditForm = () => {
  const {socialAccounts, account, connectedProviders} = useAppSelector(
    state => state.profile,
  );

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();

  const onFaceBookConnect = async () => {
    const result = await LoginManager.logInWithPermissions(
      ['public_profile'],
      'limited',
    );

    if (result.isCancelled) {
      console.log('Facebook login cancelled');
      return;
    }

    const accessTokenObj =
      await AuthenticationToken.getAuthenticationTokenIOS();

    if (accessTokenObj) {
      dispatch(
        connectFacebookProfile({
          id_token: accessTokenObj.authenticationToken,
          navigation,
        }),
      );
    }
  };

  const onFacebookDisconnect = (provider: ConnectedProvider) => {
    const removeConnectedProviderPayload = {
      provider: 'facebook',
      account: provider.uid,
    };

    dispatch(
      changeModalState({
        isModalOpen: true,
        modalDescription: 'ნამდვილად გსურთ ფეისბუქ ანგარიშს მოხსნა?',
        modalButtonHandler: () => {
          dispatch(
            removeConnectedProvider({
              provider: removeConnectedProviderPayload,
              navigation,
            }),
          );
        },
        mainButtonTitle: 'კი',
        secondaryButtonTitle: 'არა',
      }),
    );
  };

  const isFacebookConnected = () => {
    return connectedProviders.find(
      provider => provider.provider.id === 'facebook',
    );
  };

  const facebookButtonHandler = () => {
    const facebookProvider = isFacebookConnected();

    if (facebookProvider) {
      onFacebookDisconnect(facebookProvider);
    } else {
      onFaceBookConnect();
    }
  };

  const findSocialAccount = (id: number) => {
    const socialAccount = socialAccounts.find(social => social.type_id === id);

    return socialAccount;
  };

  return {
    account,
    findSocialAccount,
    facebookButtonHandler,
    isFacebookConnected,
  };
};
