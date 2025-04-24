import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useAppNavigation } from 'services/navigation/NavigationUtils/UseAppNavigation';

import {Props} from './PollsDepartment.types';
import {styles} from './PollsDepartment.styles';

import PollCard from '../../../polls/components/PollCard';


const PollsDepartment = ({
  polls,
  polls_points,
  user_polls_votes,
  poll_points_loading,
}: Props) => {
  
  const navigation = useAppNavigation();

  const navToPollsScreen = () => navigation.navigate('BottomTabsStack', {screen: 'PollsScreen'})

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
        <Text style={styles.headerText}>არჩევანი</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={navToPollsScreen}>
          <Text style={styles.headerButton}>ყველა</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tasksContainer}>
        {polls.map((poll, i) => (
          <PollCard
            polls_points={polls_points}
            points_loading={poll_points_loading}
            isPollVoted={isPollVoted}
            key={+i}
            poll={poll}
          />
        ))}
      </View>
    </View>
  );
};

export default PollsDepartment;
