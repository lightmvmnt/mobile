import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './ProfileForm.styles';
import EditIcon from '../../../../assets/icons/editIcon.svg';
import GoBackIcon from '../../../../assets/icons/goBackBtn.svg';
import FormInput from './FormInput';
import {SocialAccountsContainer} from '../../../../globalComponents';
import {useProfileForm} from './ProfileForm.hooks';

function ProfileForm() {
  const {
    account,
    connectedSocialAccounts,
    profileEditButtonHandler,
    profileSettingsButtonHandler,
  } = useProfileForm();

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

      {connectedSocialAccounts.length ? (
        <View style={{marginBottom: 15}}>
          <SocialAccountsContainer socialAccounts={connectedSocialAccounts} />
        </View>
      ) : null}

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
