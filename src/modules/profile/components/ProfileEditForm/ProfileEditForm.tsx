import {Text, TextInput, View} from 'react-native';
import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import {
  profileEditFormInitialValues,
  profileEditFormValidationSchema,
} from './ProfileEditForm.utils';
import {ProfileEditFormInitialValues} from './ProfileEditForm.types';
import EditFormInput from './EditFormInput';
import {styles} from './ProfileEditForm.styles';
import {COLORS} from '../../../../constants';

const ProfileEditForm = ({
  account,
  onChange,
  isRepresentative,
}: {
  account: ProfileEditFormInitialValues | undefined;
  onChange: (isValid: boolean, values: ProfileEditFormInitialValues) => void;
  isRepresentative: boolean;
}) => {
  const {
    values,
    dirty,
    errors,
    touched,
    handleChange,
    setValues,
    setFieldTouched,
  } = useFormik({
    initialValues: profileEditFormInitialValues,
    validationSchema: profileEditFormValidationSchema,
    onSubmit: () => {},
  });
  const isValid = dirty && !Object.keys(errors).length;

  useEffect(() => {
    if (!account) {
      return;
    }

    setValues(account);
  }, [account, setValues]);

  useEffect(() => {
    onChange(isValid, values);
  }, [isValid, values, onChange]);

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
          disabled={isRepresentative}
          setFieldTouched={setFieldTouched}
          handleChange={handleChange}
        />

        <EditFormInput
          label="გვარი"
          value={values.lastName}
          error={errors.lastName}
          touched={touched.lastName}
          disabled={isRepresentative}
          name="lastName"
          setFieldTouched={setFieldTouched}
          handleChange={handleChange}
        />

        <EditFormInput
          label="ელ-ფოსტა"
          value={values.email}
          error={errors.email}
          touched={touched.email}
          name="email"
          disabled={true}
          setFieldTouched={setFieldTouched}
          handleChange={handleChange}
        />

        {isRepresentative ? (
          <TextInput
            placeholder="ჩემს შესახებ"
            placeholderTextColor={COLORS.DARK}
            multiline
            textAlignVertical="top"
            style={styles.textFieldInput}
            value={values.aboutMe}
            onChangeText={handleChange('aboutMe')}
          />
        ) : null}
      </View>
    </View>
  );
};

export default ProfileEditForm;
