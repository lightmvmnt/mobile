import React from 'react';
import {Modal} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {hideModal} from '../../store/slices/app/app.slice';
import {styles} from './SimpleModal.styles';
import {Text, View} from 'react-native';
import SimpleButton from '../SimpleButton';
import {COLORS} from '../../constants';

function SimpleModal() {
  const {
    isModalOpen,
    modalButtonHandler,
    modalDescription,
    modalTitle,
    mainButtonTitle,
    secondaryButtonTitle,
  } = useAppSelector(state => state.app);

  const dispatch = useAppDispatch();

  return (
    <Modal
      visible={isModalOpen}
      onDismiss={() => dispatch(hideModal())}
      contentContainerStyle={styles.containerStyle}
      style={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.modalTextContainer}>
        {modalTitle !== '' ? (
          <Text style={styles.modalTitle}>{modalTitle}</Text>
        ) : null}
        <Text numberOfLines={3} style={styles.modalText}>
          {modalDescription}
        </Text>
      </View>

      <View
        style={[
          styles.buttonContainer,
          {
            justifyContent:
              !mainButtonTitle || !secondaryButtonTitle
                ? 'center'
                : 'space-between',
          },
        ]}>
        {mainButtonTitle ? (
          <SimpleButton
            variant="contained"
            buttonColor={COLORS.MAIN}
            textColor={COLORS.LIGHT}
            text={mainButtonTitle}
            width={100}
            height={40}
            onPress={() => {
              modalButtonHandler();
              dispatch(hideModal());
            }}
          />
        ) : null}

        {secondaryButtonTitle ? (
          <SimpleButton
            variant="contained"
            buttonColor={COLORS.DARK}
            textColor={COLORS.LIGHT}
            text={secondaryButtonTitle}
            width={177}
            height={40}
            onPress={() => dispatch(hideModal())}
          />
        ) : null}
      </View>
    </Modal>
  );
}

export default SimpleModal;
