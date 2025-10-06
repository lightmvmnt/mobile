import {useEffect, useState} from 'react';
import {ConnectedSocialAccount} from './RepresentativeDetailsCard.types';
import {RepresentativeDetails} from '../../../../store/slices/representatives/representatives.types';
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
    // const facebookProfile = representative.leader_details.facebook_profile;

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

    // if (facebookProfile.link) {
    //   connectedSocialAccount = {
    //     type: 'FB',
    //     link: facebookProfile.link,
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
  }, [representative]);

  return {
    connectedSocialAccounts,
  };
};
