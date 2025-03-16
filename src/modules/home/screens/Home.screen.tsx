/* eslint-disable react-hooks/exhaustive-deps */
import {ScrollView} from 'react-native';
import {SafeAreaBackgroundWithHeader} from '../../../globalComponents';
import {styles} from './Home.styles';
import {TasksDepartment} from '../components';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import PollsDepartment from '../components/PollsDepartment';
import {useEffect} from 'react';
import {getTasks} from '../../../store/thunks/tasks/tasks.thunk';
import {
  getAllPolls,
  getUserPollsVotes,
} from '../../../store/thunks/polls/polls.thunk';
import {GetStorageObject} from '../../../utils/asyncStore.util';
import {sendReferrerId} from '../../../store/thunks/user/user.thunk';

function HomeScreen() {
  const {tasks} = useAppSelector(state => state.tasks);
  const {in_progress_polls, user_polls_votes} = useAppSelector(
    state => state.polls,
  );

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
        {/* <UserProgressInfo /> */}
        {/* <TaskSuggestionCard /> */}
        <TasksDepartment tasks={tasks.slice(0, 3)} />
        <PollsDepartment
          polls={in_progress_polls.slice(0, 3)}
          user_polls_votes={user_polls_votes}
        />
      </ScrollView>
    </SafeAreaBackgroundWithHeader>
  );
}

export default HomeScreen;
