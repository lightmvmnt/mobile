import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './ProfileForm.styles';
import {useAppSelector} from '../../../../store/store';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../../services/navigation/Base.navigation';
import EditIcon from '../../../../assets/icons/editIcon.svg';
import GoBackIcon from '../../../../assets/icons/goBackBtn.svg';
import FormInput from './FormInput';
import {SocialAccountsContainer} from '../../../../globalComponents';
import {useEffect, useState} from 'react';
import {ConnectedSocialAccount} from './ProfileForm.types';

function ProfileForm() {
  const {socialAccounts, account} = useAppSelector(state => state.profile);

  const [connectedSocialAccounts, setConnectedSocialAccounts] = useState<
    ConnectedSocialAccount[]
  >([]);

  const navigation = useNavigation<NavigationProps>();

  const socialAccountType = (type_id: number) => {
    let type: 'FB' | 'TT' | 'YT' | 'LDIN' = 'FB';

    switch (type_id) {
      case 1:
        type = 'FB';
        break;
      case 2:
        type = 'LDIN';
        break;
      case 3:
        type = 'TT';
        break;
      case 4:
        type = 'YT';
        break;
      default:
        break;
    }

    return type;
  };

  useEffect(() => {
    let connectedSocialAccount: ConnectedSocialAccount;

    if (socialAccounts.length) {
      socialAccounts.map(socialAccount => {
        connectedSocialAccount = {
          type: socialAccountType(socialAccount.type_id),
          link: socialAccount.social_account,
        };

        setConnectedSocialAccounts(prev => [...prev, connectedSocialAccount]);
      });
    }

    if (account?.leader_details) {
      connectedSocialAccount = {
        type: 'FB',
        link: account.leader_details.facebook_profile.link,
      };

      setConnectedSocialAccounts(prev => [...prev, connectedSocialAccount]);
    }
  }, [socialAccounts, account]);

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

      <ScrollView>
        <FormInput name="სახელი" value={account ? account?.first_name : ''} />
        <FormInput name="გვარი" value={account ? account?.last_name : ''} />
        <FormInput name="ელ-ფოსტა" value={account ? account?.email : ''} />

        {connectedSocialAccounts ? (
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
      </ScrollView>
    </View>
  );
}

export default ProfileForm;
