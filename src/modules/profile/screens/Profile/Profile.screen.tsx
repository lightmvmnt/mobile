import {View} from 'react-native';
import {
  InfoContainer,
  SafeAreaBackgroundWithHeader,
} from '../../../../globalComponents';
import {styles} from './Profile.styles';
import {ProfileForm} from '../../components';
import ReferalInupt from '../../components/ReferralInput';
import {useProfile} from './Profile.hooks';
import CompletedMissions from '../../../../assets/icons/completedMissions.svg';
import Scores from '../../../../assets/icons/scores.svg';
import {COLORS} from '../../../../constants';
import { ProfileScreenParams } from 'services/navigation/BottomTabStack/BottomTabStackNavigator';

const ProfileScreen: React.FC<ProfileScreenParams> = () => {
  const {
    referralLink,
    generateReferralLinkLoading,
    getReferralCountLoading,
    referralCount,
    userTotalPoints,
    userTotalPointsLoading,
    completedTasksCount,
    completedTasksCountLoading,
    generateReferralLink,
  } = useProfile();

  return (
    <SafeAreaBackgroundWithHeader>
      <View style={styles.screen}>
        <View style={styles.profileContainer}>
          <View style={styles.userInfoContainer}>
            <InfoContainer
              title="შესრულებული მისიები"
              count={completedTasksCount}
              counterBgColor={COLORS.NEW_MAIN}
              counterColor={COLORS.LIGHT}
              Icon={CompletedMissions}
              loading={completedTasksCountLoading}
            />
            <InfoContainer
              title="დაგროვებული ქულა"
              count={userTotalPoints}
              counterBgColor={COLORS.SECONDARY}
              counterColor={COLORS.DARK}
              Icon={Scores}
              loading={userTotalPointsLoading}
            />
          </View>
          <ReferalInupt
            generateLinkLoading={generateReferralLinkLoading}
            count={referralCount}
            getCountLoading={getReferralCountLoading}
            link={referralLink ? referralLink : ''}
            generateReferralLink={generateReferralLink}
          />
          <ProfileForm />
        </View>
      </View>
    </SafeAreaBackgroundWithHeader>
  );
}

export default ProfileScreen;
