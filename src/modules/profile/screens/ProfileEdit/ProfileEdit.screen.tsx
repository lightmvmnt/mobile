import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaBackgroundWithHeader,
  SimpleButton,
} from '../../../../globalComponents';
import ProfileEditForm from '../../components/ProfileEditForm';
import {FormValues} from './ProfileEdit.types';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../../services/navigation/Base.navigation';
import {COLORS, LAYOUT} from '../../../../constants';
import {ScrollView, View} from 'react-native';
import {styles} from './ProfileEdit.styles';
import {SocialsEditForm} from '../../components';
import {UpdateAccountPayload} from '../../../../store/thunks/profile/profile.types';
import {updateAccount} from '../../../../store/thunks/profile/profile.thunk';
import {updateRepresentativeDetails} from '../../../../store/thunks/representatives/representatives.thunk';

const ProfileEditScreen = () => {
  const {account, loading} = useAppSelector(state => state.profile);
  const {is_rep_details_updating} = useAppSelector(
    state => state.representatives,
  );

  const [editFormAccount, setEditFormAccount] = useState<FormValues>();
  const [updatedAccount, setUpdatedAccount] = useState<{
    isValid: boolean;
    values: FormValues;
  }>();

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    if (!account) {
      return;
    }

    setEditFormAccount({
      firstName: account.first_name,
      lastName: account.last_name,
      email: account.email,
      aboutMe: account.leader_details ? account.leader_details.about_me : '',
    });
  }, [account]);

  const handleFormChange = useCallback(
    (isValid: boolean, values: FormValues) => {
      setUpdatedAccount({isValid, values});
    },
    [],
  );

  const onProfileEditSubmit = () => {
    if (updatedAccount && updatedAccount.isValid) {
      const updated_account: UpdateAccountPayload = {
        first_name: updatedAccount.values.firstName,
        last_name: updatedAccount.values.lastName,
      };

      dispatch(updateAccount({navigation, updated_account}));

      if (account?.leader_details && account.leader_details.is_approved) {
        dispatch(updateRepresentativeDetails(updatedAccount.values.aboutMe));
      }
    }
  };

  return (
    <SafeAreaBackgroundWithHeader>
      <View style={styles.formsContainer}>
        <ScrollView>
          <ProfileEditForm
            account={editFormAccount}
            onChange={handleFormChange}
            isRepresentative={
              account?.leader_details
                ? account.leader_details.is_approved
                : false
            }
          />
          <SocialsEditForm />
        </ScrollView>
      </View>
      <View style={styles.saveButtonContainer}>
        <SimpleButton
          variant="contained"
          text="დამახსოვრება"
          width={LAYOUT.WIDTH - 30}
          height={45}
          buttonColor={COLORS.NEW_MAIN}
          textColor={COLORS.LIGHT}
          buttonLoading={loading || is_rep_details_updating}
          onPress={onProfileEditSubmit}
        />
      </View>
    </SafeAreaBackgroundWithHeader>
  );
};

export default ProfileEditScreen;
