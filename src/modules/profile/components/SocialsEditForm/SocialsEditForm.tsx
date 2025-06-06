import {View, Text, Platform} from 'react-native';
import React from 'react';
import {styles} from './SocialsEditForm.styles';
import SocialsButton from './SocialsButton';
import {
  AccessToken,
  AuthenticationToken,
  LoginManager,
} from 'react-native-fbsdk-next';
import {useAppSelector} from '../../../../store/store';
import {GetStorageObject} from '../../../../utils/asyncStore.util';
import FacebookButton from './FacebookButton';

const SocialsEditForm = () => {
  const {socialAccounts, account} = useAppSelector(state => state.profile);

  const onFaceBookConnect = async () => {
    const result = await LoginManager.logInWithPermissions(['public_profile']);

    if (result.isCancelled) {
      console.log('Facebook login cancelled');
      return;
    }

    const accessTokenObj =
      Platform.OS === 'ios'
        ? await AuthenticationToken.getAuthenticationTokenIOS()
        : await AccessToken.getCurrentAccessToken();

    console.log(await GetStorageObject('session_token'));
    console.log(accessTokenObj);

    // if (accessTokenObj) {
    //   dispatch(connectFacebookProfile(accessTokenObj.authenticationToken));
    // }
  };

  const facebookButtonHandler = () => {
    if (account?.leader_details) {
      console.log('is connected');
    } else {
      onFaceBookConnect();
    }
  };

  const findSocialAccount = (id: number) => {
    const socialAccount = socialAccounts.find(social => social.type_id === id);

    return socialAccount;
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>სოციალური ქსელები</Text>
      </View>
      <View style={styles.form}>
        <FacebookButton
          account={account}
          onButtonPress={facebookButtonHandler}
        />
        <SocialsButton
          socialAccount={findSocialAccount(2)}
          account={account}
          socialAccountType="LDIN"
          onButtonPress={() => {}}
        />
        <SocialsButton
          socialAccount={findSocialAccount(3)}
          account={account}
          socialAccountType="TT"
          onButtonPress={() => {}}
        />
        <SocialsButton
          socialAccount={findSocialAccount(4)}
          account={account}
          socialAccountType="YT"
          onButtonPress={() => {}}
        />
      </View>
    </View>
  );
};

export default SocialsEditForm;
