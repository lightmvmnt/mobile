import messaging from '@react-native-firebase/messaging';
import {
  GetStorageObject,
  SetStorageObjectValue,
} from '../../utils/asyncStore.util';
import {getTasks} from '@store/tasks/tasks.thunk';
import {AppDispatch} from '../../store/store';

export const getFcmToken = async () => {
  let checkToken = await GetStorageObject('FcmToken');

  if (!checkToken) {
    try {
      const FcmToken = await messaging().getToken();

      if (FcmToken) {
        checkToken = FcmToken;
        SetStorageObjectValue('FcmToken', FcmToken);
      }
    } catch (error) {
      console.error('Failed to get FCM token:', error);
    }
  }

  return checkToken;
};

export const getApnsToken = async () => {
  let checkToken = await GetStorageObject('ApnsToken');

  if (!checkToken) {
    try {
      const ApnsToken = await messaging().getAPNSToken();

      if (ApnsToken) {
        checkToken = ApnsToken;
        SetStorageObjectValue('ApnsToken', ApnsToken);
      }
    } catch (error) {
      console.error('Failed to get APNS token:', error);
    }
  }

  return checkToken;
};

export const notificationHandler = (dispatch: AppDispatch) => {
  messaging().onNotificationOpenedApp(async () => {
    dispatch(getTasks());
  });

  // Quiet and Background State -> Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        dispatch(getTasks());
      }
    })
    .catch(() => {});

  // Foreground State
  messaging().onMessage(async () => {
    dispatch(getTasks());
  });
};
