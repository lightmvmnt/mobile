import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '@services/navigation/Base.navigation';
import {selectProfile} from '@store/profile/profile.selectors';
import {useAppSelector} from '@store/store';
import {socialAccountType} from '@utils/socialAccounts.util';
import {useEffect, useState} from 'react';

import {ConnectedSocialAccount} from './ProfileForm.types';

export const useProfileForm = () => {
  const {socialAccounts, account} = useAppSelector(selectProfile);

  const [connectedSocialAccounts, setConnectedSocialAccounts] = useState<
    ConnectedSocialAccount[]
  >([]);

  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    if (!socialAccounts.length) {
      setConnectedSocialAccounts([]);
      return;
    }

    const updated = socialAccounts.map(socialAccount => ({
      type: socialAccountType(socialAccount.type_id),
      link: socialAccount.social_account,
    }));

    setConnectedSocialAccounts(updated);
  }, [socialAccounts]);

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
