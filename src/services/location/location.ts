import {Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';

export const checkLocationPermission = async () => {
  let checkStatus: PermissionStatus | undefined;

  await check(
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  ).then(status => {
    checkStatus = status;
  });

  return {checkStatus};
};

export const requestLocationPermission = async () => {
  let permissionsStatus: PermissionStatus | undefined;

  await request(
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  ).then(status => {
    permissionsStatus = status;
  });

  return {permissionsStatus};
};
