import React from 'react';
import {Tooltip} from 'react-native-paper';
import SimpleIndicator from '../SimpleIndicator';
import {COLORS} from '../../constants';
import {Props} from './InfoTooltip.types';

const InfoTooltip = ({infoText, infoButtonIcon}: Props) => {
  return (
    <Tooltip
      title={infoText}
      enterTouchDelay={0}
      theme={{
        colors: {
          onSurface: COLORS.INFO_BG_COLOR,
          surface: COLORS.INFO_TEXT_COLOR,
        },
        roundness: 8,
      }}>
      <SimpleIndicator Icon={infoButtonIcon} />
    </Tooltip>
  );
};

export default InfoTooltip;
