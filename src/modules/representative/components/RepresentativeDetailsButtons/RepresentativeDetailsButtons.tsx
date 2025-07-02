import {View} from 'react-native';
import React from 'react';
import {Props} from './RepresentativeDetailsButtons.types';
import {styles} from './RepresentativeDetailsButtons.styles';
import {SimpleButton} from '../../../../globalComponents';
import {FontSizeGenerator} from '../../../../utils/fontSizeGenerator.util';
import {COLORS} from '../../../../constants';
import {useRepresentativeDetailsButtons} from './RepresentativeDetailsButtons.hook';
import UncheckedHeartIcon from '../../../../assets/icons/uncheckedHeart.svg';
import CheckedHeartIcon from '../../../../assets/icons/checkHeart.svg';
import UncheckedIcon from '../../../../assets/icons/unchecked.svg';

const RepresentativeDetailsButtons = ({representative}: Props) => {
  const {
    isChosen,
    pressed_representative_id,
    choose_representative_loading,
    onChooseButtonPress,
    onLikeButtonPress,
  } = useRepresentativeDetailsButtons(representative);

  return (
    <View style={styles.buttonsContainer}>
      <SimpleButton
        width={170}
        height={40}
        text="142"
        variant="contained"
        textColor={COLORS.DARK}
        buttonColor={COLORS.SECONDARY_BG_COLOR}
        onPress={onLikeButtonPress}
        fontSize={FontSizeGenerator(14)}
        Icon={UncheckedHeartIcon}
      />
      <SimpleButton
        width={170}
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
