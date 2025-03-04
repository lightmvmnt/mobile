import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {styles} from './PollDetailsCard.styles';
import PollStatusIndicator from '../PollStatusIndicator';
import {SimpleIndicator} from '../../../../globalComponents';
import TimeIcon from '../../../../assets/icons/timeIcon.svg';
import {Props} from './PollDetailsCard.types';
import {TimeCalculator} from '../../../../utils/timeCalculator.util';
import PollVoteButton from '../PollVoteButton';
import PollVotesSelector from '../PollVotesSelector';
import PollResult from '../PollResult';
import InfoTooltip from '../../../../globalComponents/InfoTooltip';
import WarningIcon from '../../../../assets/icons/warningIcon.svg';

const PollDetailsCard = ({
  poll,
  votes,
  results,
  votes_loading,
  results_loading,
  isOptionSelected,
  handleVoteSelect,
}: Props) => {
  const {difference} = TimeCalculator(poll?.due_date);

  return (
    <View style={styles.card}>
      <View style={styles.indicatorsContainer}>
        <PollStatusIndicator pollStatus={poll ? poll.is_active : false} />

        <View style={styles.secondaryIndicatorsContainer}>
          {difference && poll?.is_active ? (
            <SimpleIndicator Icon={TimeIcon} text={difference} />
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

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>{poll?.title}</Text>
        <ScrollView contentContainerStyle={styles.infoDescScrollView}>
          <Text style={styles.infoDesc} selectable={true}>
            {poll?.full_description}
          </Text>
        </ScrollView>
      </View>

      <View style={styles.actionButtonContainer}>
        {poll?.is_active && poll?.type === 'multi' ? (
          <PollVotesSelector
            options={poll.options}
            isOptionSelected={isOptionSelected}
            handleVoteSelect={handleVoteSelect}
            loading={votes_loading}
          />
        ) : null}

        {poll?.is_active && poll.type === 'single' ? (
          <ScrollView>
            {poll?.options.map((option, index) => (
              <PollVoteButton
                key={index}
                poll_id={poll.id}
                option={option}
                votes={votes}
                loading={votes_loading}
              />
            ))}
          </ScrollView>
        ) : null}

        {!poll?.is_active && results ? (
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
        ) : null}
      </View>
    </View>
  );
};

export default PollDetailsCard;
