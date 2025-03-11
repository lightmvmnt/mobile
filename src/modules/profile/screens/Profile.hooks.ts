import appsFlyer from 'react-native-appsflyer';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {changeReferralLink} from '../../../store/slices/app/app.slice';

export const useProfile = () => {
  const {user} = useAppSelector(state => state.auth);
  const {referralLink} = useAppSelector(state => state.app);

  const dispatch = useAppDispatch();

  const generateReferralLink = () => {
    appsFlyer.generateInviteLink(
      {
        channel: 'referral',
        campaign: 'user-invite',
        customerID: String(user?.id),
        userParams: {
          referrer_id: String(user?.id),
        },
      },
      result => {
        if (result) {
          const link = String(result);
          dispatch(changeReferralLink(link));
        }
      },
      err => console.log(err),
    );
  };

  return {
    referralLink,
    generateReferralLink,
  };
};
