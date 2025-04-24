import React, {useEffect, useState} from 'react';
import {Props} from './PollCard.types';
import {Text, View} from 'react-native';
import {styles} from './PollCard.styles';
import PollStatusIndicator from '../PollStatusIndicator';
import {
  PointIndicator,
  SimpleButton,
  SimpleIndicator,
} from '../../../../globalComponents';
import {COLORS} from '../../../../constants';
import {TimeCalculator} from '../../../../utils/timeCalculator.util';
import {useAppDispatch} from '../../../../store/store';
import {
  getPoll,
  getPollResults,
  getPollVote,
} from '../../../../store/thunks/polls/polls.thunk';
import TimeIcon from '../../../../assets/icons/timeIcon.svg';
import CompletedIcon from '../../../../assets/icons/CompletedIcon.svg';
import WarningIcon from '../../../../assets/icons/warningIcon.svg';
import InfoTooltip from '../../../../globalComponents/InfoTooltip';
import { useAppNavigation } from 'services/navigation/NavigationUtils/UseAppNavigation';

const PollCard = ({poll, polls_points, points_loading, isPollVoted}: Props) => {
  const [points, setPoints] = useState<number | null>(null);

  const {difference} = TimeCalculator(poll.due_date);

  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  useEffect(() => {
    if (!poll || !polls_points) {
      return;
    }

    const poll_points = polls_points.find(polls => polls.poll_id === poll.id);

    if (poll_points) {
      setPoints(poll_points.points);
    }
  }, [poll, polls_points]);

  const handlePollDetailsButton = () => {
    dispatch(getPoll(poll.id));
    dispatch(getPollVote(poll.id));
    if (!poll.is_active) {
      dispatch(getPollResults(poll.id));
    }
    navigation.navigate('GlobalStack', {screen: 'PollDetails'});
  };

  return (
    <View style={styles.card}>
      <View style={styles.indicatorsContainer}>
        <PollStatusIndicator pollStatus={poll.is_active} />

        <View style={styles.secondaryIndicatorsContainer}>
          {difference && poll.is_active ? (
            <SimpleIndicator Icon={TimeIcon} text={difference} />
          ) : null}

          {points && poll?.is_active ? (
            <View style={styles.indicatorWrapper}>
              <PointIndicator loading={points_loading} point={points} />
            </View>
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
