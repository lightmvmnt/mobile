import React, {useEffect, useState} from 'react';
import {Linking, ScrollView, Text, View} from 'react-native';
import SupportLogo from '../../../../assets/icons/supportLogo.svg';
import DefuseLogo from '../../../../assets/icons/defuseLogo.svg';
import MobilizationLogo from '../../../../assets/icons/mobilizationLogo.svg';
import {CountIndicator, SimpleButton} from '../../../../globalComponents';
import {COLORS} from '../../../../constants';
import UrlIcon from '../../../../assets/icons/LinkIcon.svg';
import CompletedIcon from '../../../../assets/icons/CompletedIcon.svg';
import {useAppDispatch} from '../../../../store/store';
import {updateTask} from '../../../../store/thunks/tasks/tasks.thunk';
import {getTaskComplitionCount} from '../../../../services/tasks/getTaskComplitionCount';
import {Props} from '../TaskDetailCard/TaskDetailCard.types';
import {styles} from './TaskDetailCard.styles';
import {UpdatedTask} from '../../../../store/slices/tasks/tasks.types';
import {changeModalState} from '../../../../store/slices/app/app.slice';

function TaskDetailCard({task, task_loading}: Props) {
  const [completedCount, setCompletedCount] = useState(0);
  const [countLoading, setCountLoading] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setCountLoading(true);
    const getCount = async () => {
      const {count} = await getTaskComplitionCount(task ? task.mission.id : 0);

      setCountLoading(false);
      setCompletedCount(count);
    };

    getCount();
  }, [task]);

  const onTaskUpdate = (updatedTask: UpdatedTask) => {
    if (task) {
      dispatch(updateTask({task_id: task.id, updated_task: updatedTask}));
    }
  };

  const onLinkButtonPress = () => {
    if (!task) {
      return;
    }

    onTaskUpdate({is_completed: true});
    Linking.openURL(task.mission.target_url);
  };

  const onDoneButtonPress = () => {
    if (!task) {
      return;
    }

    if (task.is_completed) {
      onTaskUpdate({is_completed: false});
    } else {
      dispatch(
        changeModalState({
          isModalOpen: true,
          modalDescription:
            'მისიის შესასრულებლად გადადი მოცემულ ბმულზე და შეასრულე დავალება',
          modalButtonHandler: () => {},
          secondaryButtonTitle: 'გასაგებია',
        }),
      );
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardTopSide}>
        {task?.mission.category === 1 && <SupportLogo width={50} height={50} />}
        {task?.mission.category === 2 && (
          <MobilizationLogo width={50} height={50} />
        )}
        {task?.mission.category === 3 && <DefuseLogo width={50} height={50} />}
        <View style={styles.cardTopSideTextContainer}>
          <Text style={styles.taskTitle}>{task?.mission.title}</Text>
        </View>
      </View>

      <View style={styles.cardDescriptionContainer}>
        <ScrollView contentContainerStyle={styles.cardDescriptionScrollView}>
          <Text style={styles.cardDescriptionText} selectable={true}>
            {task?.mission.description}
          </Text>
        </ScrollView>
      </View>

      <View style={styles.completedButtonContainer}>
        <SimpleButton
          variant="contained"
          text={'ლინკზე გადასვლა'}
          Icon={UrlIcon}
          onPress={() => onLinkButtonPress()}
          width={320}
          height={40}
          buttonColor={COLORS.MAIN}
          textColor={COLORS.LIGHT}
        />
      </View>

      <View style={styles.cardBottomSide}>
        <CountIndicator loading={countLoading} count={completedCount} />

        <SimpleButton
          variant="contained"
          buttonColor={task?.is_completed ? COLORS.GRAY : COLORS.MAIN}
          textColor={task?.is_completed ? COLORS.DARK : COLORS.LIGHT}
          onPress={() => onDoneButtonPress()}
          text={
            task_loading === false && task?.is_completed
              ? 'შესრულებულია'
              : 'შევასრულე'
          }
          Icon={task?.is_completed ? CompletedIcon : undefined}
          width={250}
          height={40}
          buttonLoading={task_loading}
        />
      </View>
    </View>
  );
}

export default TaskDetailCard;
