import {useEffect, useState} from 'react';
import {useAppSelector} from '../../../../store/store';
import {ConnectedSocialAccount} from './ProfileForm.types';
import {NavigationProps} from '../../../../services/navigation/Base.navigation';
import {useNavigation} from '@react-navigation/native';
import {socialAccountType} from '../../../../utils/socialAccounts.util';

export const useProfileForm = () => {
  const {socialAccounts, account} = useAppSelector(state => state.profile);

  const [connectedSocialAccounts, setConnectedSocialAccounts] = useState<
    ConnectedSocialAccount[]
  >([]);

  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    let connectedSocialAccount: ConnectedSocialAccount;

    if (socialAccounts.length) {
      socialAccounts.map(socialAccount => {
        connectedSocialAccount = {
          type: socialAccountType(socialAccount.type_id),
          link: socialAccount.social_account,
        };

        setConnectedSocialAccounts(prev =>
          prev.filter(social => social.link !== socialAccount.social_account),
        );

        setConnectedSocialAccounts(prev => [...prev, connectedSocialAccount]);
      });
    }

    // if (
    //   account?.leader_details &&
    //   account.leader_details.facebook_profile.link
    // ) {
    //   connectedSocialAccount = {
    //     type: 'FB',
    //     link: account.leader_details.facebook_profile.link,
    //   };

    //   setConnectedSocialAccounts(prev =>
    //     prev.filter(socialAccount => socialAccount.type !== 'FB'),
    //   );

    //   setConnectedSocialAccounts(prev => [...prev, connectedSocialAccount]);
    // } else {
    //   setConnectedSocialAccounts(prev =>
    //     prev.filter(socialAccount => socialAccount.type !== 'FB'),
    //   );
    // }
  }, [socialAccounts, account]);

  const profileEditButtonHandler = () => {
    navigation.navigate('ProfileEdit');
  };

  const profileSettingsButtonHandler = () => {
    navigation.navigate('ProfileSettings');
  };

  return {
    account,
    connectedSocialAccounts,
    profileEditButtonHandler,
    profileSettingsButtonHandler,
  };
};
