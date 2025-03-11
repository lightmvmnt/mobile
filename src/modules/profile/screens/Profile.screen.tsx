import {ScrollView, View} from 'react-native';
import {SafeAreaBackgroundWithHeader} from '../../../globalComponents';
import {styles} from './Profile.styles';
import {ScreenHeader} from '../../../globalComponents';
import {ProfileForm} from '../components';
import ReferalInupt from '../components/ReferralInput';
import {useProfile} from './Profile.hooks';

function ProfileScreen() {
  const {referralLink, generateReferralLink} = useProfile();

  return (
    <SafeAreaBackgroundWithHeader>
      <View style={styles.screen}>
        <ScreenHeader title="პროფილი" />
        <View style={styles.profileContainer}>
          <View style={styles.referralContainer}>
            <ReferalInupt
              link={referralLink ? referralLink : ''}
              generateReferralLink={generateReferralLink}
            />
          </View>
          <ScrollView contentContainerStyle={styles.profileScrollView}>
            <ProfileForm />
          </ScrollView>
        </View>
      </View>
    </SafeAreaBackgroundWithHeader>
  );
}

export default ProfileScreen;
