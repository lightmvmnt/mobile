import React, {useEffect, useState} from 'react';
import {SafeAreaBackgroundWithHeader} from '../../../../globalComponents';
import ProfileEditForm from '../../components/ProfileEditForm';
import {FormValues} from './ProfileEdit.types';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {UpdateUserPayload} from '../../../../store/thunks/auth/auth.types';
import {updateUser} from '../../../../store/thunks/auth/auth.thunk';

const ProfileEditScreen = () => {
  const {account, loading} = useAppSelector(state => state.auth);

  const [editFormAccount, setEditFormAccount] = useState<FormValues>();

  const dispatch = useAppDispatch();

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

    dispatch(updateUser(updatedUser));
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
