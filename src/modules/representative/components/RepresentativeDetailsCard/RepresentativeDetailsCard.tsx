import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './RepresentativeDetailsCard.styles';
import {
  CountIndicator,
  SocialAccountsContainer,
} from '../../../../globalComponents';
// import FilledHeartIcon from '../../../../assets/icons/filledHeart.svg';
import {useRepresentativeDetailsCard} from './RepresentativeDetailsCard.hook';
import {Props} from './RepresentativeDetailsCard.types';

const RepresentativeDetailsCard = ({representative}: Props) => {
  const {connectedSocialAccounts} =
    useRepresentativeDetailsCard(representative);

  return (
    <View style={styles.detailsCard}>
      <View style={styles.detailsCardInfoContainer}>
        <Image
          style={styles.detailsCardImg}
          source={
            representative?.leader_details.facebook_profile.photo
              ? {uri: representative?.leader_details.facebook_profile.photo}
              : require('../../../../assets/icons/zviad.png')
          }
        />
        <View style={styles.detailsCardInfo}>
          <Text style={styles.DetailsCardInfoText}>
            {representative?.first_name} {representative?.last_name}
          </Text>
          <View style={styles.detailsCardIndicatorsContainer}>
            <CountIndicator
              count={
                representative ? representative.leader_details.votes_count : 0
              }
              loading={false}
            />
            {/* <View style={styles.detailsCardIndicatorWrapper}>
              <SimpleIndicator text="142" Icon={FilledHeartIcon} />
            </View> */}
          </View>
        </View>
      </View>

      <View style={styles.aboutMeContainer}>
        <Text style={styles.aboutMeTitle}>ჩემს შესახებ</Text>
        <Text style={styles.aboutMeText}>
          {representative?.leader_details.about_me}
        </Text>
      </View>

      {connectedSocialAccounts.length ? (
        <View style={styles.socialAccountsContainerWrapper}>
          <SocialAccountsContainer socialAccounts={connectedSocialAccounts} />
        </View>
      ) : null}
    </View>
  );
};

export default RepresentativeDetailsCard;
