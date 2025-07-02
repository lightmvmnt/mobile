import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './RepresentativeCard.styles';
import {CountIndicator, SimpleButton} from '../../../../globalComponents';
import OpenIcon from '../../../../assets/icons/open.svg';
import {COLORS} from '../../../../constants';
import UncheckedHeartIcon from '../../../../assets/icons/uncheckedHeart.svg';
import CheckedHeartIcon from '../../../../assets/icons/checkHeart.svg';
import UncheckedIcon from '../../../../assets/icons/unchecked.svg';
import {FontSizeGenerator} from '../../../../utils/fontSizeGenerator.util';
import {Representative} from '../../../../store/slices/representatives/representatives.types';
import {useRepresentativeCard} from './RepresentativeCard.hook';

const RepresentativeCard = ({
  representative,
  loading,
}: {
  representative: Representative;
  loading: boolean;
}) => {
  const {
    isChosen,
    pressed_representative_id,
    choose_representative_loading,
    onChooseButtonPress,
    onLikeButtonPress,
    handleRepresentativeDetailsButton,
  } = useRepresentativeCard(representative);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleRepresentativeDetailsButton}
      style={[
        styles.card,
        {borderColor: isChosen ? COLORS.DARK : COLORS.BORDER},
      ]}>
      <View style={styles.cardTop}>
        <View style={styles.cardInfoContainer}>
          <Image
            style={styles.cardImg}
            source={
              representative?.leader_details.facebook_profile.photo
                ? representative?.leader_details.facebook_profile.photo
                : require('../../../../assets/icons/zviad.png')
            }
          />
          <View style={styles.cardInfo}>
            <Text style={styles.cardInfoText}>
              {representative.first_name} {representative.last_name}
            </Text>
            <CountIndicator
              count={representative.leader_details.votes_count}
              loading={loading}
            />
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={handleRepresentativeDetailsButton}>
          <OpenIcon width={15} height={15} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardBottom}>
        <SimpleButton
          width={80}
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
          width={230}
          height={40}
          text={isChosen ? 'არჩეული' : 'არჩევა'}
          variant="contained"
          textColor={isChosen ? COLORS.LIGHT : COLORS.DARK}
          buttonColor={isChosen ? COLORS.DARK : COLORS.SECONDARY_BG_COLOR}
          onPress={onChooseButtonPress}
          fontSize={FontSizeGenerator(14)}
          Icon={isChosen ? CheckedHeartIcon : UncheckedIcon}
          disabled={
            pressed_representative_id !== representative.leader_details.id &&
            choose_representative_loading
          }
          buttonLoading={
            pressed_representative_id === representative.leader_details.id &&
            choose_representative_loading
          }
        />
      </View>
    </TouchableOpacity>
  );
};

export default RepresentativeCard;
