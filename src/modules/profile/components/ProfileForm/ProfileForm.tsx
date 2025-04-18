import {Text, View} from 'react-native';
import {styles} from './ProfileForm.styles';
import {SimpleButton} from '../../../../globalComponents';
import {COLORS, LAYOUT} from '../../../../constants';
import TrashcanIcon from '../../../../assets/icons/trashCanIcon.svg';
import ExitIcon from '../../../../assets/icons/exitIcon.svg';
import {FontSizeGenerator} from '../../../../utils/fontSizeGenerator.util';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {changeModalState} from '../../../../store/slices/app/app.slice';
import {
  AccountDeletion,
  Logout,
} from '../../../../store/thunks/auth/auth.thunk';
import { useAppNavigation } from 'services/navigation/NavigationUtils/UseAppNavigation';

function ProfileForm() {
  const {account, loading} = useAppSelector(state => state.auth);
  const disaptch = useAppDispatch();

  const navigation = useAppNavigation();

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

  return (
    <View style={styles.formContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>დეტალები</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.input}>
          <Text style={styles.inputTitle}>სახელი</Text>
          <Text style={styles.inputValue}>{account?.first_name}</Text>
        </View>
        <View style={styles.input}>
          <Text style={styles.inputTitle}>გვარი</Text>
          <Text style={styles.inputValue}>{account?.last_name}</Text>
        </View>
        <View style={[styles.input, {marginBottom: 0}]}>
          <Text style={styles.inputTitle}>ელ. ფოსტა</Text>
          <Text style={styles.inputValue}>{account?.email}</Text>
        </View>
      </View>
      <View style={styles.actionButtonsContainer}>
        <View style={styles.actionButtonWrapper}>
          <SimpleButton
            buttonColor={COLORS.DARK}
            textColor={COLORS.LIGHT}
            text="მომხმარებლის წაშლა"
            height={40}
            width={LAYOUT.WIDTH - 50}
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
          width={LAYOUT.WIDTH - 50}
          onPress={logoutButtonHandler}
          variant="contained"
          Icon={ExitIcon}
          fontSize={FontSizeGenerator(15)}
          buttonLoading={loading}
          disabled={loading}
        />
      </View>
    </View>
  );
}

export default ProfileForm;
