import {useEffect, useState} from 'react';
import {useAppSelector} from '../../../../store/store';
import {ConnectedSocialAccount} from './ProfileForm.types';
import {NavigationProps} from '../../../../services/navigation/Base.navigation';
import {useNavigation} from '@react-navigation/native';

export const useProfileForm = () => {
  const {socialAccounts, account} = useAppSelector(state => state.profile);

  const [connectedSocialAccounts, setConnectedSocialAccounts] = useState<
    ConnectedSocialAccount[]
  >([]);

  const navigation = useNavigation<NavigationProps>();

  const socialAccountType = (type_id: number) => {
    let type: 'FB' | 'TT' | 'YT' | 'LDIN' = 'FB';

    switch (type_id) {
      case 1:
        type = 'FB';
        break;
      case 2:
        type = 'LDIN';
        break;
      case 3:
        type = 'TT';
        break;
      case 4:
        type = 'YT';
        break;
      default:
        break;
    }

    return type;
  };

  useEffect(() => {
    let connectedSocialAccount: ConnectedSocialAccount;

    console.log(account);

    if (socialAccounts.length) {
      socialAccounts.map(socialAccount => {
        connectedSocialAccount = {
          type: socialAccountType(socialAccount.type_id),
          link: socialAccount.social_account,
        };

        setConnectedSocialAccounts(prev => [...prev, connectedSocialAccount]);
      });
    }

    if (
      account?.leader_details &&
      account.leader_details.facebook_profile.link
    ) {
      connectedSocialAccount = {
        type: 'FB',
        link: account.leader_details.facebook_profile.link,
      };

      setConnectedSocialAccounts(prev => [...prev, connectedSocialAccount]);
    } else {
      setConnectedSocialAccounts(prev =>
        prev.filter(socialAccount => socialAccount.type !== 'FB'),
      );
    }
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
