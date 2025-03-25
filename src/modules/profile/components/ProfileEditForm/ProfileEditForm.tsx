import {Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import {
  profileEditFormInitialValues,
  profileEditFormValidationSchema,
} from './ProfileEditForm.utils';
import {ProfileEditFormInitialValues} from './ProfileEditForm.types';
import {SimpleButton} from '../../../../globalComponents';
import {COLORS, LAYOUT} from '../../../../constants';
import EditFormInput from './EditFormInput';
import {styles} from './ProfileEditForm.styles';

const ProfileEditForm = ({
  account,
  onFormSubmit,
  formSubmitLoading,
}: {
  account: ProfileEditFormInitialValues | undefined;
  onFormSubmit: (values: ProfileEditFormInitialValues) => void;
  formSubmitLoading: boolean;
}) => {
  const {values, errors, touched, handleSubmit, handleChange, setValues} =
    useFormik({
      initialValues: profileEditFormInitialValues,
      validationSchema: profileEditFormValidationSchema,
      onSubmit: onFormSubmit,
    });

  useEffect(() => {
    if (!account) {
      return;
    }

    setValues(account);
  }, [account, setValues]);

  return (
    <View style={styles.formContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>პირადი დეტალები</Text>
      </View>
      <View style={styles.form}>
        <EditFormInput
          label="სახელი"
          value={values.firstName}
          error={errors.firstName}
          touched={touched.firstName}
          name="firstName"
          handleChange={handleChange}
        />

        <EditFormInput
          label="გვარი"
          value={values.lastName}
          error={errors.lastName}
          touched={touched.lastName}
          name="lastName"
          handleChange={handleChange}
        />

        <EditFormInput
          label="ელ-ფოსტა"
          value={values.email}
          error={errors.email}
          touched={touched.email}
          name="email"
          disabled={true}
          handleChange={handleChange}
        />
      </View>

      <View style={styles.saveButtonContainer}>
        <SimpleButton
          variant="contained"
          text="დამახსოვრება"
          width={LAYOUT.WIDTH - 30}
          height={40}
          buttonColor={COLORS.NEW_MAIN}
          textColor={COLORS.LIGHT}
          buttonLoading={formSubmitLoading}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default ProfileEditForm;
