import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './ProfileForm.styles';
import {SimpleButton} from '../../../../globalComponents';
import {COLORS, LAYOUT} from '../../../../constants';
import TrashcanIcon from '../../../../assets/icons/trashCanIcon.svg';
import ExitIcon from '../../../../assets/icons/exitIcon.svg';
import {FontSizeGenerator} from '../../../../utils/fontSizeGenerator.util';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../../services/navigation/Base.navigation';
import {changeModalState} from '../../../../store/slices/app/app.slice';
import {
  AccountDeletion,
  Logout,
} from '../../../../store/thunks/auth/auth.thunk';
import EditIcon from '../../../../assets/icons/editIcon.svg';
import FormInput from './FormInput';

function ProfileForm() {
  const {account, loading} = useAppSelector(state => state.auth);
  const disaptch = useAppDispatch();

  const navigation = useNavigation<NavigationProps>();

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

  const profileEditButtonHandler = () => {
    navigation.navigate('ProfileEdit');
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>დეტალები</Text>
        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.7}
          onPress={profileEditButtonHandler}>
          <EditIcon width={16} height={16} />
          <Text style={styles.editButtonText}>შეცვლა</Text>
        </TouchableOpacity>
      </View>

      <FormInput name="სახელი" value={account ? account?.first_name : ''} />
      <FormInput name="გვარი" value={account ? account?.last_name : ''} />
      <FormInput name="ელ-ფოსტა" value={account ? account?.email : ''} />

      <View style={styles.actionButtonsContainer}>
        <View style={styles.actionButtonWrapper}>
          <SimpleButton
            buttonColor={COLORS.DARK}
            textColor={COLORS.LIGHT}
            text="მომხმარებლის წაშლა"
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
  );
}

export default ProfileForm;
