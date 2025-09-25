import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HelperText, Modal, TextInput} from 'react-native-paper';
import {SimpleButton} from '../../../../globalComponents';
import {COLORS} from '../../../../constants';
import {styles} from './SocialAddModal.styles';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {changeSocialAddModalVisibility} from '../../../../store/slices/profile/profile.slice';
import {connectUserSocial} from '../../../../store/thunks/profile/profile.thunk';

const SocialAddModal = () => {
  const [socialLink, setSocialLink] = useState('');
  const [error, setError] = useState<{visible: boolean; message: string}>({
    visible: false,
    message: '',
  });
  const [socialMedia, setSocialMedia] = useState<{
    mediaName: string;
    mediaLinkType: string;
  }>({
    mediaName: '',
    mediaLinkType: '',
  });

  const {socialAddModalProps, loading} = useAppSelector(state => state.profile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    switch (socialAddModalProps.typeId) {
      case 1:
        setSocialMedia({
          mediaName: 'facebook',
          mediaLinkType: 'https://www.facebook.com/',
        });
        break;
      case 2:
        setSocialMedia({
          mediaName: 'linkdin',
          mediaLinkType: 'https://www.linkdin.com/',
        });
        break;
      case 3:
        setSocialMedia({
          mediaName: 'tiktok',
          mediaLinkType: 'https://www.tiktok.com/',
        });
        break;
      case 4:
        setSocialMedia({
          mediaName: 'youtube',
          mediaLinkType: 'https://www.youtube.com/',
        });
        break;
    }
  }, [socialAddModalProps]);

  const modalDismissHandler = () => {
    dispatch(changeSocialAddModalVisibility({visible: false, type_id: 0}));
    setSocialLink('');
    setError({visible: false, message: ''});
    setSocialMedia({mediaLinkType: '', mediaName: ''});
  };

  const inputHandler = (val: string) => {
    setSocialLink(val);

    if (val.length) {
      setError({visible: false, message: ''});
    }
  };

  const sendSuggestionLinkButtonHandler = () => {
    if (!socialLink.length) {
      setError({visible: true, message: 'მიუთითეთ ბმული'});
    }

    if (socialLink.length && !socialLink.includes(socialMedia.mediaLinkType)) {
      setError({
        visible: true,
        message: `დაშვებულია მხოლოდ ${socialMedia.mediaName}-ის ბმული`,
      });
    }

    if (socialLink.length && socialLink.includes(socialMedia.mediaLinkType)) {
      dispatch(
        connectUserSocial({
          account_url: socialLink,
          social_type: socialAddModalProps.typeId,
        }),
      );
    }
  };
  return (
    <Modal
      visible={socialAddModalProps.visible}
      onDismiss={modalDismissHandler}
      contentContainerStyle={styles.containerStyle}
      style={styles.modal}>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          value={socialLink}
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
        text="დაკავშირება"
        onPress={sendSuggestionLinkButtonHandler}
        height={40}
        width={300}
        buttonColor={COLORS.NEW_MAIN}
        textColor={COLORS.LIGHT}
        buttonLoading={loading}
        disabled={loading}
      />
    </Modal>
  );
};

export default SocialAddModal;
