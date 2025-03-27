import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './ProfileForm.styles';
import {useAppSelector} from '../../../../store/store';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../../services/navigation/Base.navigation';
import EditIcon from '../../../../assets/icons/editIcon.svg';
import GoBackIcon from '../../../../assets/icons/goBackBtn.svg';
import FormInput from './FormInput';

function ProfileForm() {
  const {account} = useAppSelector(state => state.auth);

  const navigation = useNavigation<NavigationProps>();

  const profileEditButtonHandler = () => {
    navigation.navigate('ProfileEdit');
  };

  const profileSettingsButtonHandler = () => {
    navigation.navigate('ProfileSettings');
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>დეტალები</Text>
        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.7}
          onPress={profileEditButtonHandler}>
          <EditIcon width={16} height={16} />
          <Text style={styles.editButtonText}>შეცვლა</Text>
        </TouchableOpacity>
      </View>

      <FormInput name="სახელი" value={account ? account?.first_name : ''} />
      <FormInput name="გვარი" value={account ? account?.last_name : ''} />
      <FormInput name="ელ-ფოსტა" value={account ? account?.email : ''} />

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.settingsButton}
        onPress={profileSettingsButtonHandler}>
        <Text style={styles.settingsButtonTitle}>ანგარიშის პარამეტრები</Text>
        <GoBackIcon style={{transform: [{rotateZ: '180deg'}]}} />
      </TouchableOpacity>
    </View>
  );
}

export default ProfileForm;
