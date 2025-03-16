import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './ReferralInput.styles';
import {CountIndicator} from '../../../../globalComponents';
import ReferralIcon from '../../../../assets/icons/referralIcon.svg';
import CopyIcon from '../../../../assets/icons/copyIcon.svg';
import {COLORS} from '../../../../constants';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';

const ReferalInupt = ({
  link,
  generateLinkLoading,
  getCountLoading,
  count,
  generateReferralLink,
}: {
  link: string;
  generateLinkLoading: boolean;
  getCountLoading: boolean;
  count: number;
  generateReferralLink: () => void;
}) => {
  const referralLinkInputHandler = () => {
    if (!link) {
      generateReferralLink();
    }
  };

  const copyReferralLinkHandler = () => {
    Clipboard.setString(link);

    Toast.show({
      type: 'success',
      text2: 'მოსაწვევი ლინკი წარმატებით დაკოპირდა',
      visibilityTime: 1500,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>მოიწვიე მეგობარი</Text>
        <CountIndicator loading={getCountLoading} count={count} />
      </View>

      <View style={styles.inputContainer}>
        {!link ? (
          <TouchableOpacity
            style={styles.inputPressable}
            onPress={referralLinkInputHandler}>
            <ReferralIcon />
            <Text style={styles.input} numberOfLines={1}>
              {generateLinkLoading ? (
                <ActivityIndicator color={COLORS.NEW_MAIN} size={18} />
              ) : (
                'დააჭირეთ მეგობრის მოსაწვევად'
              )}
            </Text>
          </TouchableOpacity>
        ) : (
          <>
            <View style={styles.inputPressable}>
              <ReferralIcon />
              <Text style={styles.input} numberOfLines={1}>
                {link}
              </Text>
            </View>

            <TouchableOpacity onPress={copyReferralLinkHandler}>
              <CopyIcon />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default ReferalInupt;
