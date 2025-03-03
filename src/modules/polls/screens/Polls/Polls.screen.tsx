import {FlatList, View} from 'react-native';
import {SafeAreaBackgroundWithHeader} from '../../../../core/components';
import {styles} from './Polls.styles';
import {ScreenHeader} from '../../../../globalComponents';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {useEffect, useState} from 'react';
import {
  getAllPolls,
  getUserPollsVotes,
} from '../../../../store/thunks/polls/polls.thunk';
import PollCard from '../../components/PollCard';
import PollsTabButton from '../../components/PollsTabButton';

function PollsScreen() {
  const {
    in_progress_polls,
    completed_polls,
    loading,
    user_polls_votes,
    user_polls_votes_loading,
  } = useAppSelector(state => state.polls);

  const [activeTab, setActiveTab] = useState<'IN_PROGRESS' | 'COMPLETED'>(
    'IN_PROGRESS',
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPolls());
    dispatch(getUserPollsVotes());
  }, [dispatch]);

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
    const poll_votes = user_polls_votes.find(votes => votes.poll_id === id);

    if (poll_votes && poll_votes.votes.length) {
      return true;
    }

    return false;
  };

  return (
    <SafeAreaBackgroundWithHeader>
      <View style={styles.screen}>
        <ScreenHeader title="გამოკითხვები" />
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
            refreshing={loading && user_polls_votes_loading}
            onRefresh={handleRefresh}
            scrollEnabled
            contentContainerStyle={styles.list}
            data={
              activeTab === 'IN_PROGRESS' ? in_progress_polls : completed_polls
            }
            renderItem={({item, index}) => (
              <PollCard key={index} isPollVoted={isPollVoted} poll={item} />
            )}
          />
        </View>
      </View>
    </SafeAreaBackgroundWithHeader>
  );
}

export default PollsScreen;
