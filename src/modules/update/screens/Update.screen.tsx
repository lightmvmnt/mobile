import {Linking, Platform, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './Update.styles';
import CircleLogo from '../../../assets/icons/circleLogo.svg';
import {SimpleButton} from '../../../globalComponents';
import {COLORS} from '../../../constants';
import {FontSizeGenerator} from '../../../utils/fontSizeGenerator.util';

const UpdateScreen = () => {
  const updateButtonHandler = () => {
    const appUrl =
      Platform.OS === 'android'
        ? 'https://play.google.com/store/apps/details?id=com.dzala&pcampaignid=web_share'
        : 'https://apps.apple.com/ge/app/dzala/id6742493689';

    Linking.openURL(appUrl);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <CircleLogo width={70} height={70} />
        <Text style={styles.title}>აპლიკაცია საჭიროებს განახლებას</Text>
      </View>

      <SimpleButton
        text="განახლება"
        variant="contained"
        buttonColor={COLORS.MAIN}
        textColor={COLORS.LIGHT}
        onPress={updateButtonHandler}
        width={340}
        height={40}
        fontSize={FontSizeGenerator(15)}
      />
    </SafeAreaView>
  );
};

export default UpdateScreen;
