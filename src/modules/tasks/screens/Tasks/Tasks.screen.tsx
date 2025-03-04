import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {styles} from './Tasks.styles';
import {TaskCard} from '../../components';
import {getTasks} from '../../../../store/thunks/tasks/tasks.thunk';
import {
  ScreenHeader,
  SafeAreaBackgroundWithHeader,
} from '../../../../globalComponents';

function TasksScreen() {
  const {tasks, loading} = useAppSelector(state => state.tasks);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <SafeAreaBackgroundWithHeader>
      <View style={styles.screen}>
        <ScreenHeader title="მისიები" />
        <View style={styles.tasksContainer}>
          <FlatList
            refreshing={loading}
            onRefresh={() => dispatch(getTasks())}
            scrollEnabled
            contentContainerStyle={styles.list}
            data={tasks}
            renderItem={({item, index}) => <TaskCard key={index} task={item} />}
          />
        </View>
      </View>
    </SafeAreaBackgroundWithHeader>
  );
}

export default TasksScreen;
