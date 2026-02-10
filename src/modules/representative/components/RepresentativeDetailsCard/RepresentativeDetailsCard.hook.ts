import {useEffect, useState} from 'react';
import {ConnectedSocialAccount} from './RepresentativeDetailsCard.types';
import {RepresentativeDetails} from '@store/representatives/representatives.types';
import {socialAccountType} from '../../../../utils/socialAccounts.util';

export const useRepresentativeDetailsCard = (
  representative: RepresentativeDetails | null,
) => {
  const [connectedSocialAccounts, setConnectedSocialAccounts] = useState<
    ConnectedSocialAccount[]
  >([]);

  useEffect(() => {
    let connectedSocialAccount: ConnectedSocialAccount;

    if (!representative) {
      return;
    }

    const socialAccounts = representative.leader_details.social_accounts;

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

  }, [representative]);

  return {
    connectedSocialAccounts,
  };
};
