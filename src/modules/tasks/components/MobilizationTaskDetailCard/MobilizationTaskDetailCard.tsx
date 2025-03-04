import React from 'react';
import {Props} from './MobilizationTaskDetailCard.types';
import {ScrollView, Text, View} from 'react-native';
import {styles} from './MobilizationTaskDetailCard.styles';
import SupportLogo from '../../../../assets/icons/supportLogo.svg';
import DefuseLogo from '../../../../assets/icons/defuseLogo.svg';
import MobilizationLogo from '../../../../assets/icons/mobilizationLogo.svg';
import {SimpleButton} from '../../../../globalComponents';
import {COLORS} from '../../../../constants';
import UserIcon from '../../../../assets/icons/userIcon.svg';
import UrlIcon from '../../../../assets/icons/LinkIcon.svg';
import CompletedIcon from '../../../../assets/icons/CompletedIcon.svg';
import {ActivityIndicator} from 'react-native-paper';
import {useMobilizationTaskDetailCard} from './MobilizationTaskDetailCard.hook';

const MobilizationTaskDetailCard = ({task, task_loading}: Props) => {
  const {completedCount, countLoading, onDoneButtonPress, onLinkButtonPress} =
    useMobilizationTaskDetailCard(task);

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
        <View style={styles.viewerIndicator}>
          {countLoading ? (
            <ActivityIndicator size={20} color={COLORS.MAIN} />
          ) : (
            <>
              <UserIcon width={15} height={15} />
              <Text style={styles.viewerIndicatorText}>{completedCount}</Text>
            </>
          )}
        </View>

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
};

export default MobilizationTaskDetailCard;
