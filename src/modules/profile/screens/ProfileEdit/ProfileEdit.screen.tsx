import React, {useEffect, useState} from 'react';
import {SafeAreaBackgroundWithHeader} from '../../../../globalComponents';
import ProfileEditForm from '../../components/ProfileEditForm';
import {FormValues} from './ProfileEdit.types';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {UpdateUserPayload} from '../../../../store/thunks/auth/auth.types';
import {updateUser} from '../../../../store/thunks/auth/auth.thunk';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../../services/navigation/Base.navigation';

const ProfileEditScreen = () => {
  const {account, loading} = useAppSelector(state => state.auth);

  const [editFormAccount, setEditFormAccount] = useState<FormValues>();

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
    });
  }, [account]);

  const onFormSubmit = (values: FormValues) => {
    const updatedUser: UpdateUserPayload = {
      first_name: values.firstName,
      last_name: values.lastName,
    };

    if (
      account?.first_name === updatedUser.first_name &&
      account.last_name === updatedUser.last_name
    ) {
      return;
    }

    dispatch(updateUser({navigation, updated_user: updatedUser}));
  };

  return (
    <SafeAreaBackgroundWithHeader>
      <ProfileEditForm
        formSubmitLoading={loading}
        account={editFormAccount}
        onFormSubmit={onFormSubmit}
      />
    </SafeAreaBackgroundWithHeader>
  );
};

export default ProfileEditScreen;
