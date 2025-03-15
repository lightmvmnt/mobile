import React, {useState} from 'react';
import {HelperText, Modal, TextInput} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {changeTaskSuggestionModalVisibility} from '../../../../store/slices/tasks/tasks.slice';
import {styles} from './TaskSuggestionModal.styles';
import {COLORS} from '../../../../constants';
import {SimpleButton} from '../../../../globalComponents';
import {View} from 'react-native';

const TaskSuggestionModal = () => {
  const [suggestedLink, setSuggestedLink] = useState('');
  const [error, setError] = useState<{visible: boolean; message: string}>({
    visible: false,
    message: '',
  });

  const {is_task_suggestion_modal_visible} = useAppSelector(
    state => state.tasks,
  );

  const dispatch = useAppDispatch();

  const modalDismissHandler = () => {
    dispatch(changeTaskSuggestionModalVisibility(false));
  };

  const inputHandler = (val: string) => {
    setSuggestedLink(val);

    if (val.length) {
      setError({visible: false, message: ''});
    }
  };

  const sendSuggestionLinkButtonHandler = () => {
    if (!suggestedLink.length) {
      setError({visible: true, message: 'მიუთითეთ ბმული'});
    }

    if (
      suggestedLink.length &&
      !suggestedLink.includes('https://www.facebook.com/')
    ) {
      setError({visible: true, message: 'დაშვებულია მხოლოდ facebook-ის ბმული'});
    }

    if (
      suggestedLink.length &&
      suggestedLink.includes('https://www.facebook.com/')
    ) {
      console.log(suggestedLink);
    }
  };

  return (
    <Modal
      visible={is_task_suggestion_modal_visible}
      onDismiss={modalDismissHandler}
      contentContainerStyle={styles.containerStyle}
      style={styles.modal}>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          value={suggestedLink}
          style={styles.input}
          activeOutlineColor={COLORS.NEW_MAIN}
          textColor={COLORS.DARK}
          label="ბმული"
          error={error.visible}
          outlineStyle={styles.inputOutline}
          onChangeText={text => inputHandler(text)}
        />
        <HelperText type="error" visible={error.visible}>
          {error.message}
        </HelperText>
      </View>

      <SimpleButton
        variant="contained"
        text="შემოგვთავაზე მისია"
        onPress={sendSuggestionLinkButtonHandler}
        height={40}
        width={300}
        buttonColor={COLORS.NEW_MAIN}
        textColor={COLORS.LIGHT}
      />
    </Modal>
  );
};

export default TaskSuggestionModal;
