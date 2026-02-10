import CheckedHeartIcon from '@assets/icons/checkHeart.svg';
import UncheckedIcon from '@assets/icons/unchecked.svg';
import {SimpleButton} from '@components';
import {COLORS} from '@constants';
import {FontSizeGenerator} from '@utils/fontSizeGenerator.util';
import React from 'react';
import {View} from 'react-native';

import {useRepresentativeDetailsButtons} from './RepresentativeDetailsButtons.hook';
import {styles} from './RepresentativeDetailsButtons.styles';
import {Props} from './RepresentativeDetailsButtons.types';
const RepresentativeDetailsButtons = ({representative}: Props) => {
  const {
    isChosen,
    pressed_representative_id,
    choose_representative_loading,
    onChooseButtonPress,
  } = useRepresentativeDetailsButtons(representative);

  return (
    <View style={styles.buttonsContainer}>
      <SimpleButton
        width={350}
        height={40}
        text={isChosen ? 'არჩეული' : 'არჩევა'}
        variant="contained"
        textColor={isChosen ? COLORS.LIGHT : COLORS.DARK}
        buttonColor={isChosen ? COLORS.DARK : COLORS.SECONDARY_BG_COLOR}
        onPress={onChooseButtonPress}
        fontSize={FontSizeGenerator(14)}
        Icon={isChosen ? CheckedHeartIcon : UncheckedIcon}
        disabled={
          pressed_representative_id !== representative?.leader_details.id &&
          choose_representative_loading
        }
        buttonLoading={
          pressed_representative_id === representative?.leader_details.id &&
          choose_representative_loading
        }
      />
    </View>
  );
};

export default RepresentativeDetailsButtons;
