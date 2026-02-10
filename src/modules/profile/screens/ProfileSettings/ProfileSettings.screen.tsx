import ExitIcon from '@assets/icons/exitIcon.svg';
import TrashcanIcon from '@assets/icons/trashCanIcon.svg';
import {
  SafeAreaBackgroundWithHeader,
  ScreenHeader,
  SimpleButton,
} from '@components';
import {COLORS, LAYOUT} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '@services/navigation/Base.navigation';
import {changeModalState} from '@store/app/app.slice';
import {selectAuthLoading} from '@store/auth/auth.selectors';
import {AccountDeletion, Logout} from '@store/auth/auth.thunk';
import {setModalCallback} from '@store/modalCallback';
import {useAppDispatch, useAppSelector} from '@store/store';
import {FontSizeGenerator} from '@utils/fontSizeGenerator.util';
import React from 'react';
import {Linking, View} from 'react-native';

import {styles} from './ProfileSettings.styles';

const ProfileSettingsScreen = () => {
  const loading = useAppSelector(selectAuthLoading);

  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();

  const logoutButtonHandler = () => {
    setModalCallback(() => dispatch(Logout(navigation)));
    dispatch(
      changeModalState({
        isModalOpen: true,
        modalTitle: 'ნამდვილად გსურთ გასვლა?',
        mainButtonTitle: 'კი',
        secondaryButtonTitle: 'არა',
      }),
    );
  };

  const accountDeleteButtonHandler = () => {
    setModalCallback(() => dispatch(AccountDeletion(navigation)));
    dispatch(
      changeModalState({
        isModalOpen: true,
        modalTitle: 'დარწმუნებული ხართ ?',
        modalDescription:
          'თუ თქვენ წაშლით პროფილს, ვეღარ გექნებათ წვდომა მიმდინარე მისიებზე და მოგიწევთ ხელახლა გააკეთოთ ექაუნთი',
        mainButtonTitle: 'კი',
        secondaryButtonTitle: 'არა',
      }),
    );
  };

  const TACButtonHandler = () => {
    Linking.openURL('https://dzala.app/privacy-policy-ge.html');
  };

  return (
    <SafeAreaBackgroundWithHeader>
      <View style={styles.profileSettingsContainer}>
        <ScreenHeader title="ანგარიშის პარამეტრები" />
        <View style={styles.actionButtonContainer}>
          <View style={styles.actionButtonWrapper}>
            <SimpleButton
              buttonColor={COLORS.GRAY}
              textColor={COLORS.DARK}
              text="წესები და პირობები"
              height={40}
              width={LAYOUT.WIDTH - 30}
              onPress={TACButtonHandler}
              variant="contained"
              fontSize={FontSizeGenerator(15)}
            />
          </View>
          <View style={styles.actionButtonWrapper}>
            <SimpleButton
              buttonColor={COLORS.DARK}
              textColor={COLORS.LIGHT}
              text="ანგარიშის წაშლა"
              height={40}
              width={LAYOUT.WIDTH - 30}
              onPress={accountDeleteButtonHandler}
              variant="contained"
              Icon={TrashcanIcon}
              fontSize={FontSizeGenerator(15)}
              buttonLoading={loading}
              disabled={loading}
            />
          </View>
          <SimpleButton
            buttonColor={COLORS.MAIN}
            textColor={COLORS.LIGHT}
            text="გასვლა"
            height={40}
            width={LAYOUT.WIDTH - 30}
            onPress={logoutButtonHandler}
            variant="contained"
            Icon={ExitIcon}
            fontSize={FontSizeGenerator(15)}
            buttonLoading={loading}
            disabled={loading}
          />
        </View>
      </View>
    </SafeAreaBackgroundWithHeader>
  );
};

export default ProfileSettingsScreen;
