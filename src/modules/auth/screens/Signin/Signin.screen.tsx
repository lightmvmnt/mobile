import React from 'react';
import {
  LogoWithTitle,
  SimpleButton,
  SafeAreaBackground,
} from '../../../../globalComponents';
import {Linking, Platform, Text, View} from 'react-native';
import {styles} from './Signin.styles';
import {COLORS} from '../../../../constants';
import GoogleIcon from '../../../../assets/icons/googleSign.svg';
import AppleIcon from '../../../../assets/icons/AppleLogo.svg';
import {useSignin} from './Signin.hook';
import TACBottomSheet from '../../components/TACBottomSheet';
import { SigninScreenParams } from 'services/navigation/AuthStack/AuthStackNavigator';

const SigninScreen: React.FC<SigninScreenParams> = () => {
  const {
    loading,
    snapPoints,
    sheetRef,
    handleSheetChange,
    acceptenceButtonHandler,
    signinButtonHandler,
  } = useSignin();

  return (
    <SafeAreaBackground>
      <View style={styles.wrapper}>
        <LogoWithTitle slideIndex={2} />
      </View>

      <View style={styles.signinContianer}>
        <View style={styles.buttonContainer}>
          <Text style={styles.TACText}>
            შემდეგ გვერდზე გადასვლით, ვადასტურებ რომ ვეთანხმები{' '}
            <Text
              onPress={() => Linking.openURL('https://dzala.app/')}
              style={styles.TACLink}>
              წესებს და პირობებს
            </Text>
          </Text>

          {Platform.OS === 'ios' ? (
            <View style={styles.buttonWrapper}>
              <SimpleButton
                variant="contained"
                text="შესვლა Apple-ით"
                buttonColor={COLORS.GRAY}
                width={328}
                height={48}
                textColor={COLORS.DARK}
                disabled={loading}
                buttonLoading={loading}
                onPress={() => signinButtonHandler('IOS')}
                Icon={AppleIcon}
              />
            </View>
          ) : null}
          <SimpleButton
            variant="contained"
            text="შესვლა Google-ით"
            buttonColor={COLORS.GRAY}
            width={328}
            height={48}
            textColor={COLORS.DARK}
            disabled={loading}
            buttonLoading={loading}
            onPress={() => signinButtonHandler('ANDROID')}
            Icon={GoogleIcon}
          />
        </View>
      </View>
      <TACBottomSheet
        sheetRef={sheetRef}
        snapPoints={snapPoints}
        acceptenceButtonHandler={acceptenceButtonHandler}
        handleSheetChange={handleSheetChange}
      />
    </SafeAreaBackground>
  );
}

export default SigninScreen;
