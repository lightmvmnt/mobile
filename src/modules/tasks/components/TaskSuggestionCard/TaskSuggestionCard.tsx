import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './TaskSuggestionCard.styles';
import {SimpleButton} from '../../../../globalComponents';
import {COLORS} from '../../../../constants';
import {FontSizeGenerator} from '../../../../utils/fontSizeGenerator.util';
import {useAppDispatch} from '../../../../store/store';
import {changeTaskSuggestionModalVisibility} from '@store/tasks/tasks.slice';

const TaskSuggestionCard = () => {
  const dispatch = useAppDispatch();

  const taskSuggestionModalHandler = () => {
    dispatch(changeTaskSuggestionModalVisibility(true));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>გინდა შენი ხმა უკეთესად ისმოდეს ?</Text>
      <SimpleButton
        text="შემოგვთავაზე მისია"
        width={320}
        height={40}
        textColor={COLORS.NEW_MAIN}
        buttonColor={COLORS.LIGHT}
        fontSize={FontSizeGenerator(14)}
        onPress={taskSuggestionModalHandler}
        variant="contained"
      />
    </View>
  );
};

export default TaskSuggestionCard;
