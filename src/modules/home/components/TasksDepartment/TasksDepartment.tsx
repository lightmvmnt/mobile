import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './TasksDepartment.styles';
import {Task} from '@store/tasks/tasks.types';
import {TaskCard} from '../../../tasks/components';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../../services/navigation/Base.navigation';

function TasksDepartment({tasks}: {tasks: Task[]}) {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>მისია</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Tasks')}>
          <Text style={styles.headerButton}>ყველა</Text>
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
