import {COLORS} from '@constants';
import {FormikErrors, FormikHandlers} from 'formik';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';

import {styles} from './ProfileEditForm.styles';
import {ProfileEditFormInitialValues} from './ProfileEditForm.types';

interface Props {
  value: string;
  error: string | undefined;
  label: string;
  name: string;
  touched: boolean | undefined;
  handleChange: FormikHandlers['handleChange'];
  setFieldTouched: (
    field: string,
    touched?: boolean,
    shouldValidate?: boolean,
  ) => Promise<void> | Promise<FormikErrors<ProfileEditFormInitialValues>>;
  disabled?: boolean;
}

const EditFormInput = ({
  value,
  error,
  touched,
  label,
  disabled,
  name,
  handleChange,
  setFieldTouched,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const onInputFocus = () => {
    setIsFocused(true);
    setFieldTouched(name, true);
  };

  return (
    <View style={[styles.inputContainer, {marginBottom: error ? 40 : 25}]}>
      <TextInput
        style={styles.input}
        mode="outlined"
        textColor={disabled ? COLORS.DEACTIVE : COLORS.DARK}
        cursorColor={COLORS.DARK}
        value={value}
        disabled={disabled}
        onChangeText={handleChange(name)}
        onFocus={onInputFocus}
        onBlur={() => setIsFocused(false)}
        outlineStyle={[
          styles.inputOutline,
          {borderColor: isFocused ? COLORS.DARK : COLORS.BORDER},
        ]}
        label={
          <Text
            style={disabled ? styles.disabledInputLabel : styles.inputLabel}>
            {label}
          </Text>
        }
      />
      <HelperText
        style={styles.error}
        type="error"
        visible={error && touched ? true : false}>
        {error}
      </HelperText>
    </View>
  );
};

export default EditFormInput;
