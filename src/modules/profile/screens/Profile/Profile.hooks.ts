import {selectAuth} from '@store/auth/auth.selectors';
import {
  GetAccountData,
  getConnectedProviders,
} from '@store/profile/profile.thunk';
import {selectReferral} from '@store/referral/referral.selectors';
import {
  changeGenerateReferralLinkLoading,
  setReferralLink,
} from '@store/referral/referral.slice';
import {getUserReferralCount} from '@store/referral/referral.thunk';
import {useAppDispatch, useAppSelector} from '@store/store';
import {selectTasks} from '@store/tasks/tasks.selectors';
import {useEffect} from 'react';
import appsFlyer from 'react-native-appsflyer';

export const useProfile = () => {
  const {user, userTotalPoints, userTotalPointsLoading} =
    useAppSelector(selectAuth);
  const {
    referralLink,
    generateReferralLinkLoading,
    referralCount,
    getReferralCountLoading,
  } = useAppSelector(selectReferral);

  const {completedTasksCount, completedTasksCountLoading} =
    useAppSelector(selectTasks);

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
      () => {},
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
