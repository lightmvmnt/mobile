import {View, Text, Linking} from 'react-native';
import React from 'react';
import {styles} from './SocialsEditForm.styles';
import SocialsButton from './SocialsButton';
import {LoginManager, Profile} from 'react-native-fbsdk-next';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {connectUserSocial} from '../../../../store/thunks/profile/profile.thunk';

const SocialsEditForm = () => {
  const {socialAccounts, account} = useAppSelector(state => state.profile);

  const dispatch = useAppDispatch();

  const onFaceBookConnect = async () => {
    const result = await LoginManager.logInWithPermissions(
      ['public_profile', 'user_link'],
      'limited',
    );

    if (result.isCancelled) {
      console.log('Facebook login cancelled');
      return;
    }

    const currentProfile = await Profile.getCurrentProfile();

    dispatch(
      connectUserSocial({
        account_url: currentProfile?.linkURL ? currentProfile.linkURL : '',
        social_type: 1,
      }),
    );
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
