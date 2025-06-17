import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './RepresentativeDetailsCard.styles';
import {CountIndicator, SimpleIndicator} from '../../../../globalComponents';
import FilledHeartIcon from '../../../../assets/icons/filledHeart.svg';
import {RepresentativeDetails} from '../../../../store/slices/representatives/representatives.types';

const RepresentativeDetailsCard = ({
  representative,
}: {
  representative: RepresentativeDetails | null;
}) => {
  console.log(representative);
  return (
    <View style={styles.detailsCard}>
      <View style={styles.detailsCardInfoContainer}>
        <Image
          style={styles.detailsCardImg}
          source={require('../../../../assets/icons/zviad.png')}
        />
        <View style={styles.detailsCardInfo}>
          <Text style={styles.DetailsCardInfoText}></Text>
          <View style={styles.detailsCardIndicatorsContainer}>
            <CountIndicator count={142} loading={false} />
            <View style={styles.detailsCardIndicatorWrapper}>
              <SimpleIndicator text="142" Icon={FilledHeartIcon} />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.aboutMeContainer}>
        <Text style={styles.aboutMeTitle}>About Me</Text>
        <Text style={styles.aboutMeText}>
          მიმდინარე ივენთი დაგეგმილია ამ წლის 31 დეკემბერს, დააფიქსირეთ თვქენი
          ხმა.
        </Text>
      </View>

      <View style={styles.socialAccountsContainerWrapper}>
        {/* <SocialAccountsContainer /> */}
      </View>
    </View>
  );
};

export default RepresentativeDetailsCard;
