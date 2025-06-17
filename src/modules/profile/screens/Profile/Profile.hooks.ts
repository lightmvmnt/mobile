import appsFlyer from 'react-native-appsflyer';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {
  changeGenerateReferralLinkLoading,
  setReferralLink,
} from '../../../../store/slices/referral/referral.slice';
import {getUserReferralCount} from '../../../../store/thunks/referral/referral.thunk';
import {useEffect} from 'react';
import {
  GetAccountData,
  getConnectedProviders,
} from '../../../../store/thunks/profile/profile.thunk';

export const useProfile = () => {
  const {user, userTotalPoints, userTotalPointsLoading} = useAppSelector(
    state => state.auth,
  );
  const {
    referralLink,
    generateReferralLinkLoading,
    referralCount,
    getReferralCountLoading,
  } = useAppSelector(state => state.referral);

  const {completedTasksCount, completedTasksCountLoading} = useAppSelector(
    state => state.tasks,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetAccountData());
    dispatch(getUserReferralCount());
    dispatch(getConnectedProviders());
  }, [dispatch]);

  const generateReferralLink = () => {
    dispatch(changeGenerateReferralLinkLoading(true));

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
          dispatch(setReferralLink(link));
        }
      },
      err => console.log(err),
    );
  };

  return {
    referralLink,
    generateReferralLinkLoading,
    referralCount,
    getReferralCountLoading,
    userTotalPoints,
    userTotalPointsLoading,
    completedTasksCount,
    completedTasksCountLoading,
    generateReferralLink,
  };
};
