import {View, Text, Platform} from 'react-native';
import React from 'react';
import {styles} from './SocialsEditForm.styles';
import SocialsButton from './SocialsButton';
import {
  AccessToken,
  AuthenticationToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import {useAppDispatch} from '../../../../store/store';
import {authentication} from '../../../../store/thunks/auth/auth.thunk';
import {CreateUser} from '../../../../store/thunks/auth/auth.types';
import {GetStorageObject} from '../../../../utils/asyncStore.util';

const SocialsEditForm = () => {
  const dispatch = useAppDispatch();

  const onFaceBookConnect = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'user_link',
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

      const session_token = await GetStorageObject('session_token');

      console.log(session_token);

      console.log(data);

      const infoRequest = new GraphRequest(
        '/me',
        {
          accessToken: data.accessToken.toString(),
          parameters: {
            fields: {
              string: 'email,name,first_name,middle_name,last_name,user_link',
            },
          },
        },
        async (error, res) => {
          console.log(res);
        },
      );

      new GraphRequestManager().addRequest(infoRequest).start();
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
