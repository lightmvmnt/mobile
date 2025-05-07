import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './SocialsEditForm.styles';
import SocialsButton from './SocialsButton';
import {LoginManager, Profile} from 'react-native-fbsdk-next';

const SocialsEditForm = () => {
  const onFaceBookConnect = async () => {
    const result = await LoginManager.logInWithPermissions(
      ['public_profile', 'user_link'],
      'limited',
    );

    if (result.isCancelled) {
      console.log('Facebook login cancelled');
      return;
    }

    console.log(result);

    const currentProfile = await Profile.getCurrentProfile();

    console.log(currentProfile);
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>სოციალური ქსელები</Text>
      </View>
      <View style={styles.form}>
        <SocialsButton name="ფეისბუქი" onButtonPress={onFaceBookConnect} />
        <SocialsButton name="ლინკდინი" onButtonPress={() => {}} />
        <SocialsButton name="ტიკტოკი" onButtonPress={() => {}} />
        <SocialsButton name="იუთუბი" onButtonPress={() => {}} />
      </View>
    </View>
  );
};

export default SocialsEditForm;
