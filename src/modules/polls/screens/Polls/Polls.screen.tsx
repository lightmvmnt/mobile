import {FlatList, View} from 'react-native';
import {styles} from './Polls.styles';
import {SafeAreaBackgroundWithHeader} from '../../../../globalComponents';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {useEffect, useState} from 'react';
import {
  getAllPolls,
  getUserPollsVotes,
} from '../../../../store/thunks/polls/polls.thunk';
import PollCard from '../../components/PollCard';
import PollsTabButton from '../../components/PollsTabButton';
import { PollsScreenParams } from 'services/navigation/BottomTabStack/BottomTabStackNavigator';

const PollsScreen: React.FC<PollsScreenParams> = ({}) => {
  const {
    inProgressPolls,
    completedPolls,
    userPollsVotes,
    pollsPoints,
    pollPointsLoading,
    loading,
    userPollsVotesLoading,
  } = useAppSelector(state => state.polls);

  const [activeTab, setActiveTab] = useState<'IN_PROGRESS' | 'COMPLETED'>(
    'IN_PROGRESS',
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPolls());
    dispatch(getUserPollsVotes());
  }, [dispatch]);

  useEffect(() => {}, []);

  const handleTabButtons = (chosenTab: 'IN_PROGRESS' | 'COMPLETED') => {
    dispatch(getAllPolls());
    dispatch(getUserPollsVotes());
    setActiveTab(chosenTab);
  };

  const handleRefresh = () => {
    dispatch(getAllPolls());
    dispatch(getUserPollsVotes());
  };

  const isPollVoted = (id: number) => {
    const poll_votes = userPollsVotes.find(votes => votes.poll_id === id);

    if (poll_votes && poll_votes.votes.length) {
      return true;
    }

    return false;
  };

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
