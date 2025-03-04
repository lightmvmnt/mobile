import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import PollCard from '../../../polls/components/PollCard';
import {Props} from './PollsDepartment.types';
import {styles} from './PollsDepartment.styles';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../../services/navigation/Base.navigation';

const PollsDepartment = ({polls, user_polls_votes}: Props) => {
  const navigation = useNavigation<NavigationProps>();

  const isPollVoted = (id: number) => {
    const poll_votes = user_polls_votes.find(votes => votes.poll_id === id);

    if (poll_votes && poll_votes.votes.length) {
      return true;
    }

    return false;
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>გამოკითხვები</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Polls')}>
          <Text style={styles.headerButton}>ყველა</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tasksContainer}>
        {polls.map((poll, i) => (
          <PollCard isPollVoted={isPollVoted} key={+i} poll={poll} />
        ))}
      </View>
    </View>
  );
};

export default PollsDepartment;
