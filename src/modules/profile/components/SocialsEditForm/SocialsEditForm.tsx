import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './SocialsEditForm.styles';
import SocialsButton from './SocialsButton';
import {useSocialsEditForm} from './SocialsEditForm.hooks';

const SocialsEditForm = () => {
  const {
    account,
    removeSocialAccountLoading,
    findSocialAccount,
    onSocialButtonPress,
  } = useSocialsEditForm();

  return (
    <View style={styles.formContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>სოციალური ქსელები</Text>
      </View>
      <View style={styles.form}>
        {/* <FacebookButton
          account={account}
          provider={isFacebookConnected()}
          onButtonPress={facebookButtonHandler}
        /> */}
        <SocialsButton
          socialAccount={findSocialAccount(1)}
          account={account}
          removalLoading={removeSocialAccountLoading}
          socialAccountType="FB"
          onButtonPress={() => onSocialButtonPress(1)}
        />
        <SocialsButton
          socialAccount={findSocialAccount(2)}
          account={account}
          removalLoading={removeSocialAccountLoading}
          socialAccountType="LDIN"
          onButtonPress={() => onSocialButtonPress(2)}
        />
        <SocialsButton
          socialAccount={findSocialAccount(3)}
          account={account}
          removalLoading={removeSocialAccountLoading}
          socialAccountType="TT"
          onButtonPress={() => onSocialButtonPress(3)}
        />
        <SocialsButton
          socialAccount={findSocialAccount(4)}
          account={account}
          removalLoading={removeSocialAccountLoading}
          socialAccountType="YT"
          onButtonPress={() => onSocialButtonPress(4)}
        />
      </View>
    </View>
  );
};

export default SocialsEditForm;
