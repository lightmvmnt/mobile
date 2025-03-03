import messaging from '@react-native-firebase/messaging';
import {GetStorageObject, SetStorageObjectValue} from './asyncStore.util';
import {getTasks} from '../store/thunks/tasks/tasks.thunk';
import {AppDispatch} from '../store/store';

export const getFcmToken = async () => {
  let checkToken = await GetStorageObject('FcmToken');

  if (!checkToken) {
    try {
      const FcmToken = await messaging().getToken();

      if (FcmToken) {
        checkToken = FcmToken;
        SetStorageObjectValue('FcmToken', FcmToken);
      }
    } catch (error) {}
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
    } catch (error) {}
  }

  return checkToken;
};

export const notificationHandler = (dispatch: AppDispatch) => {
  messaging().onNotificationOpenedApp(async remoteMessage => {
    dispatch(getTasks());

    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Quiet and Background State -> Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(async remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    })
    .catch(error => console.log('failed', error));

  // Foreground State
  messaging().onMessage(async remoteMessage => {
    dispatch(getTasks());

    console.log('foreground', remoteMessage);
  });
};
