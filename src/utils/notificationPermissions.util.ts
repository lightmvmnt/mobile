import {
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';

export const requestNotificationsPermission = async () => {
  const checkPermission = await checkNotifications();

  if (checkPermission.status !== 'granted') {
    await requestNotifications(['alert', 'badge', 'sound']).then(({status}) => {
      if (status !== 'granted') {
      }
    });
  }
};
