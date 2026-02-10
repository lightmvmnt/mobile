/* eslint-disable react-hooks/exhaustive-deps */
import {SafeAreaBackgroundWithHeader} from '@components';
import {selectPolls} from '@store/polls/polls.selectors';
import {getAllPolls, getUserPollsVotes} from '@store/polls/polls.thunk';
import {sendReferrerId} from '@store/referral/referral.thunk';
import {useAppDispatch, useAppSelector} from '@store/store';
import {selectTasksList} from '@store/tasks/tasks.selectors';
import {getTasks} from '@store/tasks/tasks.thunk';
import {GetStorageObject} from '@utils/asyncStore.util';
import {useEffect} from 'react';
import {ScrollView} from 'react-native';

import {TasksDepartment} from '../components';
import PollsDepartment from '../components/PollsDepartment';
import UserProgressInfo from '../components/UserProgressInfo';
import {styles} from './Home.styles';

function HomeScreen() {
  const tasks = useAppSelector(selectTasksList);
  const {inProgressPolls, userPollsVotes, pollsPoints, pollPointsLoading} =
    useAppSelector(selectPolls);

  const dispatch = useAppDispatch();

  const getReffererId = async () => {
    const id = await GetStorageObject('refferer_id');

    if (id) {
      dispatch(sendReferrerId(id));
    }
  };

  useEffect(() => {
    getReffererId();
  }, []);

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getAllPolls());
    dispatch(getUserPollsVotes());
  }, [dispatch]);

  return (
    <SafeAreaBackgroundWithHeader>
      <ScrollView
        contentContainerStyle={styles.screen}
        bounces={false}
        overScrollMode={'never'}>
        <UserProgressInfo />
        <TasksDepartment tasks={tasks.slice(0, 3)} />
        <PollsDepartment
          polls_points={pollsPoints}
          poll_points_loading={pollPointsLoading}
          polls={inProgressPolls.slice(0, 3)}
          user_polls_votes={userPollsVotes}
        />
      </ScrollView>
    </SafeAreaBackgroundWithHeader>
  );
}

export default HomeScreen;
