import {ScrollView, View} from 'react-native';
import {SafeAreaBackgroundWithHeader} from '../../../core/components';
import {styles} from './Profile.styles';
import {ScreenHeader} from '../../../globalComponents';
import {ProfileForm} from '../components';

function ProfileScreen() {
  return (
    <SafeAreaBackgroundWithHeader>
      <View style={styles.screen}>
        <ScreenHeader title="პროფილი" />
        <View style={styles.profileContainer}>
          <ScrollView contentContainerStyle={styles.profileScrollView}>
            <ProfileForm />
          </ScrollView>
        </View>
      </View>
    </SafeAreaBackgroundWithHeader>
  );
}

export default ProfileScreen;
