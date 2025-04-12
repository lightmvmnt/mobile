import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './TasksDepartment.styles';
import {Task} from '../../../../store/slices/tasks/tasks.types';
import {TaskCard} from '../../../tasks/components';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../../services/navigation/Base.navigation';
import t from 'services/translations/translator';

function TasksDepartment({tasks}: {tasks: Task[]}) {

  const navigation = useNavigation<NavigationProps>();

  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{t('homeScreen.missions')}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('TasksScreen')}>
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
