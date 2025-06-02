import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './RepresentativeCard.styles';
import {CountIndicator, SimpleButton} from '../../../../globalComponents';
import OpenIcon from '../../../../assets/icons/open.svg';
import {COLORS} from '../../../../constants';
import UncheckedHeartIcon from '../../../../assets/icons/uncheckedHeart.svg';
import UncheckedIcon from '../../../../assets/icons/unchecked.svg';
import {FontSizeGenerator} from '../../../../utils/fontSizeGenerator.util';

const RepresentativeCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.cardInfoContainer}>
          <Image
            style={styles.cardImg}
            source={require('../../../../assets/icons/zviad.png')}
          />
          <View style={styles.cardInfo}>
            <Text style={styles.cardInfoText}>ზვიად გამსახურდია</Text>
            <CountIndicator count={142} loading={false} />
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.4}>
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
          onPress={() => {}}
          fontSize={FontSizeGenerator(14)}
          Icon={UncheckedHeartIcon}
        />
        <SimpleButton
          width={230}
          height={40}
          text="არჩევა"
          variant="contained"
          textColor={COLORS.DARK}
          buttonColor={COLORS.SECONDARY_BG_COLOR}
          onPress={() => {}}
          fontSize={FontSizeGenerator(14)}
          Icon={UncheckedIcon}
        />
      </View>
    </View>
  );
};

export default RepresentativeCard;
