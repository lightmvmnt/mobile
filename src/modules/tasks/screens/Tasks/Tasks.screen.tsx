import {SafeAreaBackgroundWithHeader} from '@components';
import {useAppDispatch, useAppSelector} from '@store/store';
import {selectTasks} from '@store/tasks/tasks.selectors';
import {getTasks} from '@store/tasks/tasks.thunk';
import {Task} from '@store/tasks/tasks.types';
import React, {useCallback, useEffect} from 'react';
import {FlatList, ListRenderItem, View} from 'react-native';

import {TaskCard} from '../../components';
import {styles} from './Tasks.styles';

function TasksScreen() {
  const {tasks, loading} = useAppSelector(selectTasks);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const renderItem: ListRenderItem<Task> = useCallback(
    ({item}) => <TaskCard task={item} />,
    [],
  );

  const keyExtractor = useCallback((item: Task) => item.id.toString(), []);

  return (
    <SafeAreaBackgroundWithHeader>
      <View style={styles.screen}>
        <View style={styles.tasksContainer}>
          <FlatList
            refreshing={loading}
            onRefresh={() => dispatch(getTasks())}
            scrollEnabled
            contentContainerStyle={styles.list}
            data={tasks}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        </View>
      </View>
    </SafeAreaBackgroundWithHeader>
  );
}

export default TasksScreen;
