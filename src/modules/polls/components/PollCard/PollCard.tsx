import React from 'react';
import {Props} from './PollCard.types';
import {Text, View} from 'react-native';
import {styles} from './PollCard.styles';
import PollStatusIndicator from '../PollStatusIndicator';
import {SimpleButton, SimpleIndicator} from '../../../../globalComponents';
import {COLORS} from '../../../../constants';
import {TimeCalculator} from '../../../../utils/timeCalculator.util';
import {useAppDispatch} from '../../../../store/store';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../../services/navigation/Base.navigation';
import {
  getPoll,
  getPollResults,
  getPollVote,
} from '../../../../store/thunks/polls/polls.thunk';
import TimeIcon from '../../../../assets/icons/timeIcon.svg';
import CompletedIcon from '../../../../assets/icons/CompletedIcon.svg';
import WarningIcon from '../../../../assets/icons/warningIcon.svg';
import InfoTooltip from '../../../../globalComponents/InfoTooltip';

const PollCard = ({poll, isPollVoted}: Props) => {
  const {difference} = TimeCalculator(poll.due_date);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps>();

  const handlePollDetailsButton = () => {
    dispatch(getPoll(poll.id));
    dispatch(getPollVote(poll.id));
    if (!poll.is_active) {
      dispatch(getPollResults(poll.id));
    }
    navigation.navigate('PollDetails');
  };

  return (
    <View style={styles.card}>
      <View style={styles.indicatorsContainer}>
        <PollStatusIndicator pollStatus={poll.is_active} />

        <View style={styles.secondaryIndicatorsContainer}>
          {difference && poll.is_active ? (
            <SimpleIndicator Icon={TimeIcon} text={difference} />
          ) : null}

          {poll.is_active ? (
            <View style={styles.indicatorWrapper}>
              <InfoTooltip
                infoButtonIcon={WarningIcon}
                infoText="შედეგები გამოქვეყნდება გამოკითხვის დასრულების შემდეგ"
              />
            </View>
          ) : null}
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>{poll.title}</Text>
        <Text style={styles.infoDesc}>{poll.short_description}</Text>
      </View>

      <View style={styles.actionButtonContainer}>
        <SimpleButton
          text={
            poll.is_active
              ? isPollVoted(poll.id)
                ? 'დაფიქსირებული'
                : 'დეტალურად'
              : 'შედეგები'
          }
          buttonColor={
            poll.is_active
              ? isPollVoted(poll.id)
                ? COLORS.GRAY
                : COLORS.MAIN
              : COLORS.MAIN
          }
          textColor={
            poll.is_active
              ? isPollVoted(poll.id)
                ? COLORS.DARK
                : COLORS.LIGHT
              : COLORS.LIGHT
          }
          Icon={
            poll.is_active && isPollVoted(poll.id) ? CompletedIcon : undefined
          }
          onPress={handlePollDetailsButton}
          width={320}
          height={40}
          variant="contained"
        />
      </View>
    </View>
  );
};

export default PollCard;
