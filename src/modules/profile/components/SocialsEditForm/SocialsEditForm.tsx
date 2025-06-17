import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './SocialsEditForm.styles';
import SocialsButton from './SocialsButton';
import FacebookButton from './FacebookButton';
import {useSocialsEditForm} from './SocialsEditForm.hooks';

const SocialsEditForm = () => {
  const {
    account,
    facebookButtonHandler,
    findSocialAccount,
    isFacebookConnected,
  } = useSocialsEditForm();

  return (
    <View style={styles.formContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>სოციალური ქსელები</Text>
      </View>
      <View style={styles.form}>
        <FacebookButton
          account={account}
          provider={isFacebookConnected()}
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
