import {Text, View} from 'react-native';
import React, {ChangeEvent, useState} from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import {styles} from './ProfileEditForm.styles';
import {COLORS} from '../../../../constants';

interface Props {
  value: string;
  error: string | undefined;
  label: string;
  name: string;
  touched: boolean | undefined;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1,
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
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
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{marginBottom: error ? 15 : 0}}>
      <TextInput
        style={styles.input}
        mode="outlined"
        textColor={disabled ? COLORS.BORDER : COLORS.DARK}
        cursorColor={COLORS.DARK}
        value={value}
        disabled={disabled}
        onChangeText={handleChange(name)}
        onFocus={() => setIsFocused(true)}
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
        padding="none"
        type="error"
        visible={error && touched ? true : false}>
        {error}
      </HelperText>
    </View>
  );
};

export default EditFormInput;
