import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './SocialsEditForm.styles';
import SocialsButton from './SocialsButton';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';

const SocialsEditForm = () => {
  const onFaceBookConnect = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);

      if (result.isCancelled) {
        console.log('Facebook login cancelled');
        return;
      }

      console.log(result);

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        console.log('Something went wrong getting access token');
        return;
      }

      console.log(data.accessToken.toString());
    } catch (error) {
      console.error('Facebook login error', error);
    }
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
