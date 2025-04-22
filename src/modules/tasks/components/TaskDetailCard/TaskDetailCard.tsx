import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import SupportLogo from '../../../../assets/icons/supportLogo.svg';
import DefuseLogo from '../../../../assets/icons/defuseLogo.svg';
import MobilizationLogo from '../../../../assets/icons/mobilizationLogo.svg';
import {
  CountIndicator,
  PointIndicator,
  SimpleButton,
} from '../../../../globalComponents';
import {COLORS} from '../../../../constants';
import UrlIcon from '../../../../assets/icons/LinkIcon.svg';
import CompletedIcon from '../../../../assets/icons/CompletedIcon.svg';
import {Props} from '../TaskDetailCard/TaskDetailCard.types';
import {styles} from './TaskDetailCard.styles';
import {useTaskDetail} from './TaskDetailCard.hook';

function TaskDetailCard({task, task_loading}: Props) {
  const {
    completedCount,
    countLoading,
    taskPoint,
    tasksPointsLoading,
    onDoneButtonPress,
    onLinkButtonPress,
    onLocationButtonPress,
    onMobilizationComingButtonPress,
    handleTaskDescriptionHeight,
  } = useTaskDetail(task);

  return (
    <View style={styles.card}>
      <View style={styles.taskInfoContainer}>
        <CountIndicator loading={countLoading} count={completedCount} />
        {taskPoint !== null ? (
          <View style={styles.taskInfoWrapper}>
            <PointIndicator loading={tasksPointsLoading} point={taskPoint} />
          </View>
        ) : null}
      </View>

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

      <View
        style={[
          styles.cardDescriptionContainer,
          {
            height: handleTaskDescriptionHeight(),
          },
        ]}>
        <ScrollView contentContainerStyle={styles.cardDescriptionScrollView}>
          <Text style={styles.cardDescriptionText} selectable={true}>
            {task?.mission.description}
          </Text>
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        <SimpleButton
          variant="contained"
          text={'ლინკზე გადასვლა'}
          Icon={UrlIcon}
          onPress={onLinkButtonPress}
          width={320}
          height={40}
          buttonColor={COLORS.MAIN}
          textColor={COLORS.LIGHT}
        />
      </View>

      {task?.mission.category === 2 ? (
        <View style={styles.buttonContainer}>
          <SimpleButton
            variant="contained"
            text={'ვუერთდები'}
            onPress={onMobilizationComingButtonPress}
            width={155}
            height={40}
            buttonColor={COLORS.GRAY}
            textColor={COLORS.DARK}
          />

          <View style={styles.buttonWrapper}>
            <SimpleButton
              variant="contained"
              text={'ლოკაცია'}
              onPress={onLocationButtonPress}
              width={155}
              height={40}
              buttonColor={COLORS.GRAY}
              textColor={COLORS.DARK}
            />
          </View>
        </View>
      ) : null}

      <View style={styles.cardBottomSide}>
        <SimpleButton
          variant="contained"
          buttonColor={task?.is_completed ? COLORS.GRAY : COLORS.MAIN}
          textColor={task?.is_completed ? COLORS.DARK : COLORS.LIGHT}
          onPress={onDoneButtonPress}
          text={
            task_loading === false && task?.is_completed
              ? 'შესრულებულია'
              : 'შევასრულე'
          }
          Icon={task?.is_completed ? CompletedIcon : undefined}
          width={320}
          height={40}
          buttonLoading={task_loading}
        />
      </View>
    </View>
  );
}

export default TaskDetailCard;
