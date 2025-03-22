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

function HomeScreen() {
  const {tasks} = useAppSelector(state => state.tasks);
  const {in_progress_polls, user_polls_votes} = useAppSelector(
    state => state.polls,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getAllPolls());
    dispatch(getUserPollsVotes());
  }, [dispatch]);

 
  return (
    <SafeAreaBackgroundWithHeader>
      <ScrollView contentContainerStyle={styles.screen}>
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
