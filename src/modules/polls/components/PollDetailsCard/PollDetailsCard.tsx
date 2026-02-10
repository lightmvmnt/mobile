import TimeIcon from '@assets/icons/timeIcon.svg';
import WarningIcon from '@assets/icons/warningIcon.svg';
import {PointIndicator, SimpleIndicator} from '@components';
import InfoTooltip from '@components/InfoTooltip';
import {TimeCalculator} from '@utils/timeCalculator.util';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';

import PollResult from '../PollResult';
import PollStatusIndicator from '../PollStatusIndicator';
import PollVoteButton from '../PollVoteButton';
import PollVotesSelector from '../PollVotesSelector';
import {styles} from './PollDetailsCard.styles';
import {Props} from './PollDetailsCard.types';

const PollDetailsCard = ({
  poll,
  votes,
  results,
  points,
  votes_loading,
  results_loading,
  points_loading,
  isOptionSelected,
  handleVoteSelect,
}: Props) => {
  const {difference} = TimeCalculator(poll?.due_date);

  return (
    <View
      style={[
        styles.card,
        {marginBottom: poll?.is_active && poll?.type === 'multi' ? 60 : 16},
      ]}>
      <View style={styles.indicatorsContainer}>
        <PollStatusIndicator pollStatus={poll ? poll.is_active : false} />

        <View style={styles.secondaryIndicatorsContainer}>
          {difference && poll?.is_active ? (
            <SimpleIndicator Icon={TimeIcon} text={difference} />
          ) : null}

          {points && poll?.is_active ? (
            <View style={styles.indicatorWrapper}>
              <PointIndicator loading={points_loading} point={points} />
            </View>
          ) : null}

          {poll?.is_active ? (
            <View style={styles.indicatorWrapper}>
              <InfoTooltip
                infoButtonIcon={WarningIcon}
                infoText="შედეგები გამოქვეყნდება გამოკითხვის დასრულების შემდეგ"
              />
            </View>
          ) : null}
        </View>
      </View>

      <View
        style={[
          styles.infoContainer,
          {
            maxHeight: poll?.is_active
              ? null
              : poll?.type === 'multi'
              ? 230
              : 280,
          },
        ]}>
        <Text style={styles.infoTitle}>{poll?.title}</Text>
        {poll?.is_active ? (
          <>
            <Text
              style={[styles.infoDesc, {marginBottom: 15}]}
              selectable={true}>
              {poll?.full_description}
            </Text>

            {poll?.type === 'single' ? (
              <>
                {poll?.options.map((option, index) => (
                  <PollVoteButton
                    key={index}
                    poll_id={poll.id}
                    option={option}
                    votes={votes}
                    loading={votes_loading}
                  />
                ))}
              </>
            ) : null}

            {poll?.type === 'multi' ? (
              <PollVotesSelector
                options={poll.options}
                isOptionSelected={isOptionSelected}
                handleVoteSelect={handleVoteSelect}
                loading={votes_loading}
              />
            ) : null}
          </>
        ) : (
          <ScrollView contentContainerStyle={styles.infoDescScrollView}>
            <Text style={styles.infoDesc} selectable={true}>
              {poll?.full_description}
            </Text>
          </ScrollView>
        )}
      </View>

      {!poll?.is_active && results ? (
        <View style={styles.actionButtonContainer}>
          <ScrollView>
            {poll?.options.map((option, i) => (
              <PollResult
                key={i}
                option={option}
                totalVotesCount={results.total_vote_count}
                result={results.results.find(
                  result => result.option_id === option.id,
                )}
                loading={results_loading}
              />
            ))}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
};

export default PollDetailsCard;
