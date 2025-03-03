import React from 'react';
import {SvgProps} from 'react-native-svg';

export interface Props {
  variant: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  text: string;
  textColor?: string;
  buttonColor?: string;
  width: number;
  height: number;
  fontSize?: number;
  Icon?: React.FC<SvgProps>;
  onPress: () => void;
  buttonLoading?: boolean;
  disabled?: boolean;
}
