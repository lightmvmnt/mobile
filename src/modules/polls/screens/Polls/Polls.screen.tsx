import {SafeAreaBackgroundWithHeader} from '@components';
import {selectPolls} from '@store/polls/polls.selectors';
import {getAllPolls, getUserPollsVotes} from '@store/polls/polls.thunk';
import {useAppDispatch, useAppSelector} from '@store/store';
import {useCallback, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';

import PollCard from '../../components/PollCard';
import PollsTabButton from '../../components/PollsTabButton';
import {styles} from './Polls.styles';

function PollsScreen() {
  const {
    inProgressPolls,
    completedPolls,
    userPollsVotes,
    pollsPoints,
    pollPointsLoading,
    loading,
    userPollsVotesLoading,
  } = useAppSelector(selectPolls);

  const [activeTab, setActiveTab] = useState<'IN_PROGRESS' | 'COMPLETED'>(
    'IN_PROGRESS',
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPolls());
    dispatch(getUserPollsVotes());
  }, [dispatch]);

  const handleTabButtons = useCallback(
    (chosenTab: 'IN_PROGRESS' | 'COMPLETED') => {
      dispatch(getAllPolls());
      dispatch(getUserPollsVotes());
      setActiveTab(chosenTab);
    },
    [dispatch],
  );

  const handleRefresh = useCallback(() => {
    dispatch(getAllPolls());
    dispatch(getUserPollsVotes());
  }, [dispatch]);

  const isPollVoted = useCallback(
    (id: number) => {
      const poll_votes = userPollsVotes.find(votes => votes.poll_id === id);
      return !!(poll_votes && poll_votes.votes.length);
    },
    [userPollsVotes],
  );

  return (
    <SafeAreaBackgroundWithHeader>
      <View style={styles.screen}>
        <View style={styles.pollsContainer}>
          <View style={styles.tabButtonsContainer}>
            <PollsTabButton
              isActive={activeTab === 'IN_PROGRESS'}
              title="მიმდინარე"
              onPress={() => handleTabButtons('IN_PROGRESS')}
            />
            <PollsTabButton
              isActive={activeTab === 'COMPLETED'}
              title="დასრულებული"
              onPress={() => handleTabButtons('COMPLETED')}
            />
          </View>
          <FlatList
            refreshing={loading && userPollsVotesLoading}
            onRefresh={handleRefresh}
            scrollEnabled
            contentContainerStyle={styles.list}
            data={
              activeTab === 'IN_PROGRESS' ? inProgressPolls : completedPolls
            }
            renderItem={({item, index}) => (
              <PollCard
                key={index}
                poll={item}
                polls_points={pollsPoints}
                points_loading={pollPointsLoading}
                isPollVoted={isPollVoted}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaBackgroundWithHeader>
  );
}

export default PollsScreen;
