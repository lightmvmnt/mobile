import React, {useEffect, useCallback} from 'react';
import {FlatList, View, ListRenderItem} from 'react-native';
import {useAppDispatch, useAppSelector} from '@store/store';
import {selectTasks} from '@store/tasks/tasks.selectors';
import {styles} from './Tasks.styles';
import {TaskCard} from '../../components';
import {getTasks} from '@store/tasks/tasks.thunk';
import {SafeAreaBackgroundWithHeader} from '../../../../globalComponents';
import {Task} from '@store/tasks/tasks.types';

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
