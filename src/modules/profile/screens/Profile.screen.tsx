import {ScrollView, View} from 'react-native';
import {SafeAreaBackgroundWithHeader} from '../../../globalComponents';
import {styles} from './Profile.styles';
import {ProfileForm} from '../components';
import ReferalInupt from '../components/ReferralInput';
import {useProfile} from './Profile.hooks';

function ProfileScreen() {
  const {
    referralLink,
    generateReferralLinkLoading,
    getReferralCountLoading,
    referralCount,
    generateReferralLink,
  } = useProfile();

  return (
    <SafeAreaBackgroundWithHeader>
      <View style={styles.screen}>
        <View style={styles.profileContainer}>
          <ReferalInupt
            generateLinkLoading={generateReferralLinkLoading}
            count={referralCount}
            getCountLoading={getReferralCountLoading}
            link={referralLink ? referralLink : ''}
            generateReferralLink={generateReferralLink}
          />
          <ScrollView contentContainerStyle={styles.profileScrollView}>
            <ProfileForm />
          </ScrollView>
        </View>
      </View>
    </SafeAreaBackgroundWithHeader>
  );
}

export default ProfileScreen;
