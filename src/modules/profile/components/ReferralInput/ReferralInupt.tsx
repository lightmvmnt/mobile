import React from 'react';
import {Platform, Text, View} from 'react-native';
import {styles} from './ReferralInput.styles';
import {SimpleButton} from '../../../../globalComponents';
import {FontSizeGenerator} from '../../../../utils/fontSizeGenerator.util';
import {COLORS, LAYOUT} from '../../../../constants';

const ReferalInupt = ({
  link,
  generateReferralLink,
}: {
  link: string;
  generateReferralLink: () => void;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.input} selectable numberOfLines={1}>
          {link ? link : 'ბმული'}
        </Text>
      </View>
      <SimpleButton
        text="რეფერალი"
        width={LAYOUT.WIDTH - 270}
        height={40}
        onPress={generateReferralLink}
        variant="contained"
        fontSize={FontSizeGenerator(Platform.OS === 'android' ? 13 : 12)}
        buttonColor={COLORS.NEW_MAIN}
        textColor={COLORS.LIGHT}
      />
    </View>
  );
};

export default ReferalInupt;
