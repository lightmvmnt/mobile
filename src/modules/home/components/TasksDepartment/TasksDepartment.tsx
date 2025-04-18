import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import t from 'services/translations/translator';

import { useAppNavigation } from 'services/navigation/NavigationUtils/UseAppNavigation';

import {Task} from '../../../../store/slices/tasks/tasks.types';
import {styles} from './TasksDepartment.styles';

import {TaskCard} from '../../../tasks/components';

function TasksDepartment({tasks}: {tasks: Task[]}) {

  const navigation = useAppNavigation();

  const navToTasksScreen = () => navigation.navigate('BottomTabsStack', {screen: 'TasksScreen'})

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{t('homeScreen.missions')}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={navToTasksScreen}>
          <Text style={styles.headerButton}>{t('homeScreen.all')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tasksContainer}>
        {tasks.map((task, i) => (
          <TaskCard key={+i} task={task} />
        ))}
      </View>
    </View>
  );
}

export default TasksDepartment;
