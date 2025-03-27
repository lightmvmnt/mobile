import {Linking, View} from 'react-native';
import React from 'react';
import {
  SafeAreaBackgroundWithHeader,
  SimpleButton,
} from '../../../../globalComponents';
import {styles} from './ProfileSettings.styles';
import {COLORS, LAYOUT} from '../../../../constants';
import {FontSizeGenerator} from '../../../../utils/fontSizeGenerator.util';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {changeModalState} from '../../../../store/slices/app/app.slice';
import {
  AccountDeletion,
  Logout,
} from '../../../../store/thunks/auth/auth.thunk';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../../services/navigation/Base.navigation';
import TrashcanIcon from '../../../../assets/icons/trashCanIcon.svg';
import ExitIcon from '../../../../assets/icons/exitIcon.svg';

const ProfileSettingsScreen = () => {
  const {loading} = useAppSelector(state => state.auth);

  const navigation = useNavigation<NavigationProps>();
  const disaptch = useAppDispatch();

  const logoutButtonHandler = () => {
    disaptch(
      changeModalState({
        isModalOpen: true,
        modalTitle: 'ნამდვილად გსურთ გასვლა?',
        modalButtonHandler: () => disaptch(Logout(navigation)),
        mainButtonTitle: 'კი',
        secondaryButtonTitle: 'არა',
      }),
    );
  };

  const accountDeleteButtonHandler = () => {
    disaptch(
      changeModalState({
        isModalOpen: true,
        modalTitle: 'დარწმუნებული ხართ ?',
        modalDescription:
          'თუ თქვენ წაშლით პროფილს, ვეღარ გექნებათ წვდომა მიმდინარე მისიებზე და მოგიწევთ ხელახლა გააკეთოთ ექაუნთი',
        modalButtonHandler: () => disaptch(AccountDeletion(navigation)),
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
      <View style={styles.actionButtonsContainer}>
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
    </SafeAreaBackgroundWithHeader>
  );
};

export default ProfileSettingsScreen;
