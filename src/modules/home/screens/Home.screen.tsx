/* eslint-disable react-hooks/exhaustive-deps */
import {ScrollView} from 'react-native';
import {SafeAreaBackgroundWithHeader} from '../../../globalComponents';
import {styles} from './Home.styles';
import {TasksDepartment} from '../components';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {selectTasksList} from '@store/tasks/tasks.selectors';
import {selectPolls} from '@store/polls/polls.selectors';
import PollsDepartment from '../components/PollsDepartment';
import {useEffect} from 'react';
import {getTasks} from '@store/tasks/tasks.thunk';
import {getAllPolls, getUserPollsVotes} from '@store/polls/polls.thunk';
import {GetStorageObject} from '../../../utils/asyncStore.util';
import {sendReferrerId} from '@store/referral/referral.thunk';
import UserProgressInfo from '../components/UserProgressInfo';

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
