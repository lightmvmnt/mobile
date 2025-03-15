import {ScrollView, View} from 'react-native';
import {SafeAreaBackgroundWithHeader} from '../../../globalComponents';
import {styles} from './Profile.styles';
import {ScreenHeader} from '../../../globalComponents';
import {ProfileForm} from '../components';
import ReferalInupt from '../components/ReferralInput';
import {useProfile} from './Profile.hooks';

function ProfileScreen() {
  const {referralLink, generateReferralLinkLoading, generateReferralLink} =
    useProfile();

  return (
    <SafeAreaBackgroundWithHeader>
      <View style={styles.screen}>
        <ScreenHeader title="პროფილი" />
        <View style={styles.profileContainer}>
          <ReferalInupt
            loading={
              generateReferralLinkLoading ? generateReferralLinkLoading : false
            }
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
