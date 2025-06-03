import {View, Text, Linking, Platform} from 'react-native';
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
    const facebookAccount = socialAccounts.find(
      socialAccount => socialAccount.type_id === 1,
    );

    if (facebookAccount) {
      Linking.openURL(facebookAccount.social_account);
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
        <SocialsButton
          socialAccount={findSocialAccount(1)}
          account={account}
          name="ფეისბუქი"
          onButtonPress={facebookButtonHandler}
        />
        <SocialsButton
          account={account}
          name="ლინკდინი"
          onButtonPress={() => {}}
        />
        <SocialsButton
          account={account}
          name="ტიკტოკი"
          onButtonPress={() => {}}
        />
        <SocialsButton
          account={account}
          name="იუთუბი"
          onButtonPress={() => {}}
        />
      </View>
    </View>
  );
};

export default SocialsEditForm;
